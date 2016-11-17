# API Documentation
- [API Documentation](#api-documentation)
  * [1. Users](#1-users)
    + [1.1 List all users: [GET] `/v1/users/`](#11-list-all-users-get-v1users)
    + [1.2 View a user: [GET] `/v1/user/login`](#12-view-a-user-get-v1userlogin)
    + [1.3 View a user: [POST] `/v1/user/create`](#13-view-a-user-post-v1usercreate)
    + [1.4 View a user: [DEL] `/v1/user/delete/:id`](#14-view-a-user-del-v1userdeleteid)
  * [2. Lists](#2-lists)
    + [2.1 List all lists for a given user: [GET] `/v1/lists/`](#21-list-all-lists-for-a-given-user-get-v1lists)
    + [2.2 View a user: [GET] `/v1/list/:listId`](#22-view-a-user-get-v1listlistid)
    + [2.3 [OFFLINE] Create a list: [POST] `/v1/user/:userId/list/create`](#23-offline-create-a-list-post-v1useruseridlistcreate)
    + [2.4 View a user: [DEL] `/v1/user/:userId/list/:listId`](#24-view-a-user-del-v1useruseridlistlistid)
  * [3. Items](#3-items)
    + [3.1 Add item to list: [POST] `/v1/list/:listId/item/add`](#31-add-item-to-list-post-v1listlistiditemadd)
    + [3.2 Check off grocery item: [POST] `/v1/list/:listId/item/:itemId/done`](#32-check-off-grocery-item-post-v1listlistiditemitemiddone)
    + [3.3 Delete item from list: [POST] `/v1/list/:listId/item/:itemId/`](#33-delete-item-from-list-post-v1listlistiditemitemid)
    + [3.4 Update expiration: [POST] `/v1/list/:listId/item/:itemId/update`](#34-update-expiration-post-v1listlistiditemitemidupdate)
  * [4. Recipes](#4-recipes)
      + [4.1 Get all the recipes in the system: [POST] `/v1/recipe/`](#41-get-all-the-recipes-in-the-system-post-v1recipes)

## 1. Users
### 1.1 List all users: [GET] `/v1/users/`
#### Description
Gets all the users. Only accepts admin tokens.
- Authentication: `[Admin, User]`
    - `token`: User token must be the one assigned to the target user or an admin token.

#### Request:
- Header: `{'Authorization': 'Bearer TOKEN'}`

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
            "name": [STRING],
            "quantity": [INTEGER],
            "price": [INTEGER],
            "expiration": [STRING],
            "createdAt": [STRING],
            "updatedAt": [STRING],
            "listId": [INTEGER]
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

#### Response:
- body: `{}`
#### Response Status Codes:
- Success Code: `{204: 'NoContent'}`
- Error Code: `{403: 'Forbidden', 404: 'NotFoundError'}`

## 3. Items
### 3.1 Add item to list: [POST] `/v1/list/:listId/item/add`
#### Description
Add an item to the given list
- Authentication: `[User]`

#### Request:
- Header: `{'Authorization': 'Bearer TOKEN'}`

#### Response:
```javascript
{
    "list": {
        "id": [INTEGER],
        "name": [STRING],
        "description": [STRING],
        "createdAt": [STRING],
        "updatedAt": [STRING],
        "userId": [INTEGER],
        "items": [
            {
                "id": [INTEGER],
                "name": [STRING],
                "quantity": [INTEGER],
                "price": [INTEGER],
                "expiration": [STRING],
                "createdAt": [STRING],
                "updatedAt": [STRING],
                "listId": [INTEGER]
            },
        ]
    }
}
```
#### Response Status Codes:
- Success Code: `{200: 'Success'}`
- Error Code: `{403: 'Forbidden'}`

### 3.2 Check off grocery item: [POST] `/v1/list/:listId/item/:itemId/done`
#### Description
Move item from the grocery list to the fridge list
- Authentication: `[User]`

#### Request:
- Header: `{'Authorization': 'Bearer TOKEN'}`

#### Response:
```javascript
{
    "list": {
        "id": [INTEGER],
        "name": [STRING],
        "description": [STRING],
        "createdAt": [STRING],
        "updatedAt": [STRING],
        "userId": [INTEGER],
        "items": [
            {
                "id": [INTEGER],
                "name": [STRING],
                "quantity": [INTEGER],
                "price": [INTEGER],
                "expiration": [STRING],
                "createdAt": [STRING],
                "updatedAt": [STRING],
                "listId": [INTEGER]
            },
        ]
    }
}

```
#### Response Status Codes:
- Success Code: `{200: 'Success'}`
- Error Code: `{403: 'Forbidden'}`

### 3.3 Delete item from list: [DELETE] `/v1/list/:listId/item/:itemId/`
#### Description
Delete an item from a given list
- Authentication: `[User]`

#### Request:
- Header: `{'Authorization': 'Bearer TOKEN'}`

#### Response:
```javascript
{
    "list": {
        "id": [INTEGER],
        "name": [STRING],
        "description": [STRING],
        "createdAt": [STRING],
        "updatedAt": [STRING],
        "userId": [INTEGER],
        "items": [
            {
                "id": [INTEGER],
                "name": [STRING],
                "quantity": [INTEGER],
                "price": [INTEGER],
                "expiration": [STRING],
                "createdAt": [STRING],
                "updatedAt": [STRING],
                "listId": [INTEGER]
            },
        ]
    }
}
```
#### Response Status Codes:
- Success Code: `{200: 'Success'}`
- Error Code: `{403: 'Forbidden'}`

### 3.4 Update expiration: [POST] `/v1/list/:listId/item/:itemId/update`
#### Description
Update an expiration date
- Authentication: `[User]`

#### Request:
- Header: `{'Authorization': 'Bearer TOKEN'}`
- Body:
```javascript
{
    "expiration": [STRING YYYY-MM-DD]
}
```

#### Response:
```javascript
{
    "list": {
        "id": [INTEGER],
        "name": [STRING],
        "description": [STRING],
        "createdAt": [STRING],
        "updatedAt": [STRING],
        "userId": [INTEGER],
        "items": [
            {
                "id": [INTEGER],
                "name": [STRING],
                "quantity": [INTEGER],
                "price": [INTEGER],
                "expiration": [STRING],
                "createdAt": [STRING],
                "updatedAt": [STRING],
                "listId": [INTEGER]
            },
        ]
    }
}
```
#### Response Status Codes:
- Success Code: `{200: 'Success'}`
- Error Code: `{403: 'Forbidden'}`

## 4. Recipes
### 4.1 Get all the recipes in the system: [POST] `/v1/recipe/`
#### Description
- Authentication: `[User]`

#### Request:
- Header: `{'Authorization': 'Bearer TOKEN'}`

#### Response:
```javascript
{
    "recipes": [
        {
            "id": [INTEGER],
            "sourceUrl": [STRING],
            "cheap": [BOOLEAN],
            "vegan": [BOOLEAN],
            "cookingMinutes": [INTEGER],
            "title": [STRING],
            "dairyFree": [BOOLEAN],
            "preparationMinutes": [INTEGER],
            "extendedIngredients": [STRING],
            "vegetarian": [BOOLEAN],
            "createdAt": [STRING],
            "updatedAt": [STRING]
        },
    ]
}
```
#### Response Status Codes:
- Success Code: `{200: 'Success'}`
- Error Code: `{403: 'Forbidden'}`
