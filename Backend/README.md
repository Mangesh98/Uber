# User Registration Endpoint

## POST /users/register

### Description

This endpoint is used to register a new user. It validates the user input, hashes the password, creates a new user in the database, and returns an authentication token.

### Request Body

The request body must be a JSON object with the following properties:

- `fullName`: An object containing:
  - `firstName`: A string with at least 3 characters.
  - `lastName`: A string with at least 3 characters.
- `email`: A valid email address.
- `password`: A string with at least 6 characters.

Example:

```json
{
	"fullName": {
		"firstName": "John",
		"lastName": "Doe"
	},
	"email": "john.doe@example.com",
	"password": "password123"
}
```

### Responses

#### Success

- **Status Code**: 201 Created
- **Body**:
  ```json
  {
  	"user": {
  		"_id": "user_id",
  		"fullName": {
  			"firstName": "John",
  			"lastName": "Doe"
  		},
  		"email": "john.doe@example.com",
  		"socketId": null
  	},
  	"token": "auth_token"
  }
  ```

#### Validation Errors

- **Status Code**: 400 Bad Request
- **Body**:
  ```json
  {
  	"errors": [
  		{
  			"msg": "First Name must be at least 3 characters long",
  			"param": "fullName.firstName",
  			"location": "body"
  		},
  		{
  			"msg": "Last Name must be at least 3 characters long",
  			"param": "fullName.lastName",
  			"location": "body"
  		},
  		{
  			"msg": "Invalid email",
  			"param": "email",
  			"location": "body"
  		},
  		{
  			"msg": "Password must be at least 6 characters long",
  			"param": "password",
  			"location": "body"
  		}
  	]
  }
  ```

#### Server Error

- **Status Code**: 500 Internal Server Error
- **Body**:
  ```json
  {
  	"message": "Internal Server Error"
  }
  ```
