# User & Animal App

User Animal App is a web application for managing users and animals. The application allows adding, editing, validating and viewing users and animals in table.

## Technologies Used

- **React**: A library for building user interfaces.
- **TypeScript**: A superset of JavaScript that adds static typing.
- **Axios**: A library for making HTTP requests.
- **React Hook Form**: A library for managing forms in React.
- **Zod**: A library for data validation and parsing.
- **React Router**: A library for managing routing in React applications.
- **Tailwind CSS**: A utility-first CSS framework for rapid and efficient styling.
- **TanStack Table**: A library for building flexible and powerful tables in React.

## API

Base URL: `https://inqool-interview-api.vercel.app/api`

The API is a simple REST API with the following endpoints:

### Person

- **GET /users**: Retrieve a list of users.
- **GET /users/:id**: Retrieve a specific user by ID.
- **POST /users**: Create a new user.
- **PATCH /users/:id**: Update a specific user by ID.
- **DELETE /users/:id**: Delete a specific user by ID.

### Animal

- **GET /animals**: Retrieve a list of animals.
- **GET /animals/:id**: Retrieve a specific animal by ID.
- **POST /animals**: Create a new animal.
- **PATCH /animals/:id**: Update a specific animal by ID.
- **DELETE /animals/:id**: Delete a specific animal by ID.

### Seed

- **POST /seed**: Seed the database with initial data.