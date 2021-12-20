const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Error: Email is invalid');
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.length < 4) {
          throw new Error(
            'Error: Password length must be at least 6 charachters'
          );
        }
      },
    },
    name: {
      type: String,
      required: true,
    },
    job: {
      type: String,
      enum: ['teacher', 'student'],
      required: true,
    },
    /*tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],*/
  },
  {
    timestamp: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
      },
    },
  }
);

userSchema.virtual('Quiz', {
  ref: 'Quiz',
  localField: '_id',
  foreignField: 'owner',
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;

  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
  //user.tokens = user.tokens.concat({ token });
  //await user.save();
  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({
    email,
  });
  if (!user) {
    throw new Error('Error: no user found with this email');
  }

  const matched = await bcrypt.compare(password, user.password);

  if (!matched) {
    throw new Error('Error: password is invalid');
  }
  return user;
};

userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model('User', userSchema);

//export { User };
module.exports = User;
