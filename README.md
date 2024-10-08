# Social Network API

## Description

This project is a RESTful API for a social networking platform where users can share their thoughts, react to friends' thoughts, and create a friend list. The application uses **Node.js**, **Express.js**, **MongoDB**, and **Mongoose** to build a backend API that interacts with a NoSQL database. It demonstrates various CRUD operations and relational interactions between users, thoughts, reactions, and friends.

### Features

- Create, update, delete, and retrieve users.
- Add and remove friends from a user's friend list.
- Create, update, delete, and retrieve thoughts.
- Add and remove reactions (replies) to thoughts.
- Timestamps for thoughts and reactions.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Walkthrough Video](#walkthrough-video)
- [Technologies Used](#technologies-used)
- [License](#license)

## Installation

1. Clone the repository from GitHub:
   ```bash
   git clone https://github.com/JimiL555/Social-Network-API-Pro18.git 

2.	Navigate to the project directory:
    ```bash
    cd SOCIAL_NETWORK_API_PRO18

3.	Install the required dependencies:
    ```bash
    npm install

4.	Set up your environment variables:
	•	Create a .env file in the root directory and add your MongoDB connection string:
        MONGODB_URI=mongodb://localhost:27017/socialnetwork

5.	Start the server:
    ```bash
    npm start

## USAGE

Once the server is running, you can interact with the API using Insomnia or Postman.
The following base URL should be used for all API requests:
    http://localhost:3001/api

Example Requests

	•	GET all users:
GET /users
	•	GET a single user:
GET /users/:id
	•	POST a new user:
POST /users

json {
  "username": "testuser",
  "email": "testuser@example.com"
}

	•	DELETE a user:
DELETE /users/:id
	•	POST a new thought:
POST /thoughts

json {
  "thoughtText": "Here's a cool thought!",
  "username": "testuser",
  "userId": "USER_ID"
}

	•	POST a new reaction to a thought:
POST /thoughts/:thoughtId/reactions

json {
  "reactionBody": "This is awesome!",
  "username": "anotherUser"
}

## API Endpoints

User Routes

	•	GET /api/users - Get all users
	•	GET /api/users/:id - Get a single user by ID
	•	POST /api/users - Create a new user
	•	PUT /api/users/:id - Update a user by ID
	•	DELETE /api/users/:id - Delete a user by ID

## Friend Routes

	•	POST /api/users/:userId/friends/:friendId - Add a friend to a user
	•	DELETE /api/users/:userId/friends/:friendId - Remove a friend from a user

## Thought Routes

	•	GET /api/thoughts - Get all thoughts
	•	GET /api/thoughts/:id - Get a single thought by ID
	•	POST /api/thoughts - Create a new thought
	•	PUT /api/thoughts/:id - Update a thought by ID
	•	DELETE /api/thoughts/:id - Delete a thought by ID

## Reaction Routes

	•	POST /api/thoughts/:thoughtId/reactions - Add a reaction to a thought
	•	DELETE /api/thoughts/:thoughtId/reactions/:reactionId - Remove a reaction from a thought

## Walkthrough Video

Click here to watch the walkthrough video!

    https://youtu.be/8Kp-B164WQo

The walkthrough video demonstrates:

	•	How to start the server
	•	API routes being tested with GET, POST, PUT, and DELETE methods
	•	Adding and removing friends
	•	Creating thoughts and reactions

## Technologies Used

	•	Node.js
	•	Express.js
	•	MongoDB with Mongoose
	•	JavaScript
	•	Insomnia for API testing
	•	Dotenv for environment variables

## License

This project is licensed under the MIT License. See the LICENSE file for details.
