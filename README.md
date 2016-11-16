# API Documentation

## 1. Users
### 1.1 List all users: [GET] `/v1/users/`
#### Description
Gets all the users. Only accepts admin tokens.
- Authentication: `[Admin, User]`
    - `token`: User token must be the one assigned to the target user or an admin token.

#### Request:
- Header: `{'Authorization': 'Bearer TOKEN'}`
- Body: `{}`

#### Response:
```javascript
{
    users: [
        {
            "id": [INTEGER],
            "first_name": [STRING],
            "last_name": [STRING],
            "email": [STRING],
            "username": [STRING],
            "token": [STRING],
            "updatedAt": [STRING],
            "createdAt": [STRING]
        },
    ]
}
```
#### Response Status Codes:
- Success Code: `{200: 'Success'}`
- Error Code: `{401: 'Unauthorized'}`

### 1.2 View a user: [GET] `/v1/user/login`
#### Description
Get the user associated with the token.
- Authentication: `[User]`
    - `token`: User token must be the one assigned to the target user or an admin token.

#### Request:
- Header: `{'Authorization': 'Bearer TOKEN'}`
- Body: `{}`

#### Response:
```javascript
{
    "id": [INTEGER],
    "first_name": [STRING],
    "last_name": [STRING],
    "email": [STRING],
    "username": [STRING],
    "token": [STRING],
    "updatedAt": [STRING],
    "createdAt": [STRING]
}
```
#### Response Status Codes:
- Success Code: `{200: 'Success'}`
- Error Code: `{401: 'Unauthorized'}`

### 1.3 View a user: [POST] `/v1/user/create`
#### Description
Creates a new user.
- Authentication: `[]`

#### Request:
- Body:
```javascript
{
    "first_name": [STRING],
    "last_name": [STRING],
    "email": [STRING],
    "username": [STRING],
    "password": [STRING]
}
```

#### Response:
```javascript
{
    "id": [INTEGER],
    "first_name": [STRING],
    "last_name": [STRING],
    "email": [STRING],
    "username": [STRING],
    "token": [STRING],
    "updatedAt": [STRING],
    "createdAt": [STRING]
}
```
#### Response Status Codes:
- Success Code: `{201: 'Created'}`
- Error Code: `{404: 'NotFoundError', 409: 'ConflictError'}`

### 1.4 View a user: [DEL] `/v1/user/delete/:id`
#### Description
Deletes the user with the given `id`.
- Authentication: `[Admin, User]`

#### Request:
- Header: `{'Authorization': 'Bearer TOKEN'}`
- Body: `{}`

#### Response:
- body: `{}`
#### Response Status Codes:
- Success Code: `{204: 'NoContent'}`
- Error Code: `{403: 'Forbidden', 404: 'NotFoundError'}`

## 2. Lists
### 2.1 List all lists for a given user: [GET] `/v1/lists/`
#### Description
Get all the lists for a given user.
- Authentication: `[Admin, User]`

#### Request:
- Header: `{'Authorization': 'Bearer TOKEN'}`
- Body: `{}`

#### Response:
```javascript
{
    list: [
        {
            "id": [INTEGER],
            "userId": [INTEGER],
            "name": [STRING],
            "description": [STRING],
            "updatedAt": [STRING],
            "createdAt": [STRING]
        }
    ]
}
```
#### Response Status Codes:
- Success Code: `{200: 'Success'}`
- Error Code: `{403: 'Forbidden'}`

### 2.2 View a user: [GET] `/v1/list/:listId`
#### Description
Get specified list for a user.
- Authentication: `[Admin, User]`
    - `token`: User token must be the one assigned to the target user or an admin token.

#### Request:
- Header: `{'Authorization': 'Bearer TOKEN'}`
- Body: `{}`

#### Response:
```javascript
{
    "id": [INTEGER],
    "userId": [INTEGER],
    "description": [STRING],
    "name": [STRING],
    "description": [STRING],
    "items": [
        {
            "id": [INTEGER],
            "name": [STRING]
        }
    ]
}
```
#### Response Status Codes:
- Success Code: `{200: 'Success'}`
- Error Code: `{403: 'Forbidden', 404: 'NotFoundError'}`

### 2.3 [OFFLINE] Create a list: [POST] `/v1/user/:userId/list/create`
#### Description
Creates a new user.
- Authentication: `[Admin]`

#### Request:
- Header: `{'Authorization': 'Bearer TOKEN'}`
- Body:
```javascript
{
    "name": [STRING],
    "description": [STRING]
}
```

#### Response:
```javascript
{
    "id": [INTEGER],
    "name": [STRING],
    "description": [STRING],
    "updatedAt": [STRING],
    "createdAt": [STRING]
}
```
#### Response Status Codes:
- Success Code: `{201: 'Created'}`
- Error Code: `{403: 'Forbidden', 409: 'ConflictError'}`

### 2.4 View a user: [DEL] `/v1/user/:userId/list/:listId`
#### Description
Deletes the list with the given `id`.
- Authentication: `[Admin, User]`

#### Request:
- Header: `{'Authorization': 'Bearer TOKEN'}`
- Params: `id` of the user to be deleted.
- Body: `{}`

#### Response:
- body: `{}`
#### Response Status Codes:
- Success Code: `{204: 'NoContent'}`
- Error Code: `{403: 'Forbidden', 404: 'NotFoundError'}`
