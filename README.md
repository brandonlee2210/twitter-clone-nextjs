his is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.


# REST API DOCUMENTATION 


The REST API to the twitter app is described below.

## Get list of users

### Request

`GET /api/users`

    curl -i -H 'Accept: application/json' http://localhost:3000/api/users

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

## Sign up new user 

### Request

`POST /api/register`

    curl -X POST http://localhost:3000/api/register -H "Content-Type: application/json" -d '{"email":"testuser@gmail.com","name":"Foo","username":"testuser","password":"Password"}'  

    curl -i -H 'Accept: application/json' -d '{email=test@gmail.com&name=Foo&username=Test&password=Password}' http://localhost:3000/api/register

### Response

    HTTP/1.1 201 Created
    Date: Thu, 24 Feb 2023 12:36:30 GMT
    Status: 201 Created
    Connection: close
    Content-Type: application/json

    {
      "id": 1,
      "name": "test",
      "username": "test",
      "bio": null,
      "email": "tetst",
      "emailVerified": null,
      "image": null,
      "coverImage": null,
      "profileImage": null,
      "hashedPassword": "$2b$12$R4N5vKoG/uCU535cFkvz0en6k0eoxFXeabYxPrl7FF4uHJ0GM.yZm",
      "createdAt": "2023-05-18T07:25:36.438Z",
      "updatedAt": "2023-05-18T07:25:36.438Z",
      "hasNotification": null
    }     

## Get a specific user

### Request

`GET /api/users/username`

    curl -i -H 'Accept: application/json' http://localhost:3000/api/users/1

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2023 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json

    {
      "id": 1,
      "name": "test",
      "username": "test",
      "bio": null,
      "email": "tetst",
      "emailVerified": null,
      "image": null,
      "coverImage": null,
      "profileImage": null,
      "hashedPassword": "$2b$12$R4N5vKoG/uCU535cFkvz0en6k0eoxFXeabYxPrl7FF4uHJ0GM.yZm",
      "createdAt": "2023-05-18T07:25:36.438Z",
      "updatedAt": "2023-05-18T07:25:36.438Z",
      "hasNotification": null
    }

## Get current user

### Request

`GET /api/current`

    curl -i -H 'Accept: application/json' http://localhost:3000/api/current

## Get all posts

### Request

`GET /api/posts`

    curl -i -H 'Accept: application/json' http://localhost:3000/api/posts

### Response

    [
      {
        "id": 7,
        "body": "What is re-render in React?",
        "createdAt": "2023-05-25T11:30:25.408Z",
        "updatedAt": "2023-05-25T11:30:25.408Z",
        "userId": 3,
        "user": {
          "id": 3,
          "name": "Nhat Anh",
          "username": "AnhNhatTran",
          "bio": null,
          "email": "test1@gmail.com",
          "emailVerified": null,
          "image": null,
          "coverImage": null,
          "profileImage": null,
          "hashedPassword": "$2b$12$rENkq0qqA0BEWNmRqSIO6.cqI2J8IkHzuVahHF/HV1R8uz6dmeOKm",
          "createdAt": "2023-05-24T02:49:32.044Z",
          "updatedAt": "2023-05-25T12:17:22.351Z",
          "hasNotification": true
        },
      }
    ] 

## Get post by Id

### Request

`GET /api/posts/1`

    curl -i -H 'Accept: application/json'  http://localhost:3000/api/posts/1

### Response
    {
      "id": 7,
      "body": "What is re-render in React?",
      "createdAt": "2023-05-25T11:30:25.408Z",
      "updatedAt": "2023-05-25T11:30:25.408Z",
      "userId": 3,
      "user": {
        "id": 3,
        "name": "Nhat Anh",
        "username": "AnhNhatTran",
        "bio": null,
        "email": "test1@gmail.com",
        "emailVerified": null,
        "image": null,
        "coverImage": null,
        "profileImage": null,
        "hashedPassword": "$2b$12$rENkq0qqA0BEWNmRqSIO6.cqI2J8IkHzuVahHF/HV1R8uz6dmeOKm",
        "createdAt": "2023-05-24T02:49:32.044Z",
        "updatedAt": "2023-05-25T12:17:22.351Z",
        "hasNotification": true
      },
      "comment": [],
      "like": [
        {
          "username": "Sesbastian",
          "postId": 7
        }
      ]
    }
   

## Get all notifications by username 

### Request

`GET /api/notifications/username`

    curl -i -H 'Accept: application/json' http://localhost:3000/api/notifications/sesbastian

### Response
    [
      {
        "id": 29,
        "body": "Someone liked your tweet",
        "username": "Sesbastian",
        "createdAt": "2023-05-26T06:20:55.011Z"
      },
      {
        "id": 21,
        "body": "Someone liked your tweet",
        "username": "Sesbastian",
        "createdAt": "2023-05-25T12:17:07.244Z"
      }
    ]
    

##  

