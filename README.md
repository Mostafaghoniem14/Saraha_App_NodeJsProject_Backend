# Saraha App Backend

Backend of the **Saraha App**, a platform for sending and receiving anonymous messages. Built with **Node.js**, **Express**, and **MongoDB**, this backend handles user authentication, message management, and file uploads.

## Features

* User registration and login with **JWT authentication**
* Sending and receiving **anonymous messages**
* CRUD operations for messages
* **Profile picture** uploads using Multer
* Password encryption with **bcryptjs**
* Input validation and structured error handling
* Pagination and filtering support for messages

## Tech Stack

| Layer          | Technology         |
| -------------- | ------------------ |
| Runtime        | Node.js            |
| Framework      | Express.js         |
| Database       | MongoDB + Mongoose |
| Authentication | JWT                |
| File Uploads   | Multer             |
| Environment    | dotenv             |
| Security       | bcryptjs           |

## Getting Started

### Prerequisites

* Node.js >= 16.x
* MongoDB database
* npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Mostafaghoniem14/Saraha_App_NodeJsProject_Backend.git

# Navigate to the project folder
cd Saraha_App_NodeJsProject_Backend

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Running the Server

```bash
# For development with auto-reload
npm run dev

# For production
npm start
```

Server runs on: `http://localhost:3000`

## API Documentation

### User Endpoints

| Method | Endpoint            | Description         | Body Parameters             |
| ------ | ------------------- | ------------------- | --------------------------- |
| POST   | /api/users/register | Register a new user | `name`, `email`, `password` |
| POST   | /api/users/login    | Login user          | `email`, `password`         |

### Message Endpoints

| Method | Endpoint          | Description               | Body Parameters                       |
| ------ | ----------------- | ------------------------- | ------------------------------------- |
| POST   | /api/messages     | Send an anonymous message | `receiverId`, `message`, `attachment` |
| GET    | /api/messages     | Get messages for a user   | Query params: `page`, `limit`         |
| DELETE | /api/messages/:id | Delete a message          | —                                     |


## Project Structure

```
Saraha_App_NodeJsProject_Backend/
├── src/
│   ├── controllers/     # Request handlers
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── middleware/      # Auth, error handlers
│   └── utils/           # Helper functions
├── uploads/             # File uploads
├── index.js             # Entry point
├── package.json
├── .env
└── README.md
```

## Authentication

* JWT-based authentication
* Tokens must be included in `Authorization` header:

```
Authorization: Bearer <token>
```

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## License

MIT License — open-source and free to use.
