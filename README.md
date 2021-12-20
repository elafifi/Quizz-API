# Quizz REST API

This Quizz API simulates exam environment where teacher makes quizz with its correct answer and student add answer to quizz then got his grade instantaneously

## How to use ?

to use this api you should to multiple steps:

- First: Get api link
- Second: Choose correct URL
- Third: Choose correct HTTP Method
- Fourth: Send attached body if needed
- Fifth: Get response

#### First: API Link

I published this Api to heroku

```
Link:
   https://elafifi-quizz-api.herokuapp.com/
```

#### Second & Third: Choose correct URL && HTTP Method

there is a table of HTTP Methods with attached Routers:

| HTTP METHOD                   | POST                               | GET              | DELETE                     |
| ----------------------------- | ---------------------------------- | ---------------- | -------------------------- |
| /sginup                       | create new user teacher or student | -                | -                          |
| /signin                       | user sign in                       | -                | -                          |
| /signout                      | user sign out                      | -                | -                          |
| /quizzes                      | -                                  | List all Quizzes | -                          |
| /quizzes/create               | Create new quizz                   | -                | -                          |
| /quizzes/:quizzId             | add question to quizz              | show quizz       | remove quizz               |
| /quizzes/:quizzId/:questionId | -                                  | -                | remove question from quizz |
| /quizzes/:quizzId/answer      | -                                  | List all Quizzes | -                          |

#### Fourth & Fifth: Send attached body if needed and get Response

we will discuss each route with attached request body:

- /signup

  Request Body:

  ```
  {
  "email": "test@gmail.com",    // "email": is required, unique and valide email style
  "name": "Ahmed",              // "name": attribute is required - may be sequence of charachters
  "password": "123456",         // "password": attribute is required - password min length is 4
  "job": "student"              // "job": attribute is required - may be student or teacher
  }
  ```

  Response Body:

  ```
  { // password is encrypted and not returned in response for security perposes
  "user": {
      "email": "test@gmail.com",
      "name": "Ahmed",
      "job": "student",
      "_id": "61c08b6e93aa8aecb4ebcab7",
      "__v": 0
  }
  }
  ```

- /signin

  Request Body:

  ```
  {
  "email": "test@gmail.com",    // "email": attribute is required
  "password": "123456",         // "password": attribute is required - password min length is 4
  }
  ```

  Response Body:

  ```
  { // password is encrypted and not returned in response for security perposes
  "user": {
      "email": "test@gmail.com",
      "name": "Ahmed",
      "job": "student",
      "_id": "61c08b6e93aa8aecb4ebcab7",
      "__v": 0
  }
  }
  ```

- /signout

  No Request Body:
  but should be signed to be authenticated to access this
  Response Body:

  ```
  {
  "message": "Bye Bye.."
  }
  ```

- /quizzes

  No Request Body
  but should be signed to be authenticated to access this
  Response Body:

  ```
  { // password is encrypted and not returned in response for security perposes
  "user": {
      "email": "test@gmail.com",
      "name": "Ahmed",
      "job": "student",
      "_id": "61c08b6e93aa8aecb4ebcab7",
      "__v": 0
  }
  }
  ```

- /quizzes/create

  Request Body:

  ```
    {
  "title": "science_quizz",
  "questions": [
    {
      "title": "Q1: Choose correct Answer",
      "question": "qs1",
      "answers": {"multipleChoice": ["a", "b", "c", "b"]}, // "multipleChoice" or "shortAnswer"
      "answerType": "single", // answer type is required may be one of those                   // ['shortText', 'single', 'multi', 'number']
      "correctAnswer": {
        "single": "b"            // correctAnswer should match answer type
      }
    },
    {
      "title": "Q2: ",
      "question": "What is ...",
      "answers": {"shortAnswer": "---"},
      "answerType": "shortText",
      "correctAnswer": {
        "shortText": "egypt"
      }
    },
    {
      "title": "Q3:state result ",
      "question": "3+4=",
      "answers": {"shortAnswer":"---"},
      "answerType": "number",
      "correctAnswer": {
        "number": 5
      }
    },
    {
      "title": "Q4:  ",
      "question": "what is the correct sentences",
      "answers": {"multipleChoice":["a", "b", "c", "d"]},
      "answerType": "multi",
      "correctAnswer": {
        "multi": ["b", "c"]
      }
    }
  ]
  }
  ```

  Response Body:

  ```
  {
  "title": "science_quizz",
  "questions": [
      {
          "title": "Q1: Choose correct Answer",
          "question": "qs1",
          "answers": {
              "multipleChoice": [
                  "a",
                  "b",
                  "c",
                  "b"
              ]
          },
          "answerType": "single",
          "correctAnswer": {
              "single": "b"
          },
          "_id": "61c08f5b93aa8aecb4ebcac1"
      },
      {
          "title": "Q2: ",
          "question": "What is ...",
          "answers": {
              "multipleChoice": [],
              "shortAnswer": "---"
          },
          "answerType": "single",
          "correctAnswer": {
              "single": "egypt"
          },
          "_id": "61c08f5b93aa8aecb4ebcac2"
      },
      {
          "title": "Q3:state result ",
          "question": "3+4=",
          "answers": {
              "shortAnswer": "---"
          },
          "answerType": "number",
          "correctAnswer": {
              "number": 5
          },
          "_id": "61c08f5b93aa8aecb4ebcac3"
      },
      {
          "title": "Q4:  ",
          "question": "what is the correct sentences",
          "answers": {
              "multipleChoice": [
                  "a",
                  "b",
                  "c",
                  "d"
              ]
          },
          "answerType": "multi",
          "correctAnswer": {
              "multi": [
                  "b",
                  "c"
              ]
          },
          "_id": "61c08f5b93aa8aecb4ebcac4"
      }
  ],
  "_id": "61c08f5b93aa8aecb4ebcac0",
  "owner": "61c08efe93aa8aecb4ebcabd", // teacher who created quizz
  "__v": 0
   }
  ```
