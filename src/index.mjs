import express, { response } from "express";
import bodyParser from "body-parser";
import { request } from "http";
const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
const mockUsers = [
    { id: 1, username: "anson", displayName: "Anson", password: "hello123" },
    { id: 2, username: "jack", displayName: "Jack", password: "hello124" },
    { id: 3, username: "adam", displayName: "Adam", password: "hellohello" },
    { id: 4, username: "tina", displayName: "Tina", password: "test123" },
    { id: 5, username: "jason", displayName: "Jason", password: "hello123" },
    { id: 6, username: "henry", displayName: "Henry", password: "hello123" },
    { id: 7, username: "marilyn", displayName: "Marilyn", password: "hello123" },
];


//middleware

const resolveIndexByUserId = (request, response, next) => {
    const { body, params: { id } } = request;
    const paramsId = parseInt(id);
    if (isNaN(paramsId)) return response.sendStatus(400);

    const findUserIndex = mockUsers.findIndex((user) => user.id === paramsId);
    if (findUserIndex === -1) return response.sendStatus(404);
    request.findUserIndex = findUserIndex;
    next();

};

app.get("/", (request, response) => {
    response.status(201).send({
        name: "ashu",

    });
});

// Get all users or filter users by a specific property and value
app.get("/api/user", (request, response) => {
    const {
        query: { filter, value },
    } = request;

    if (filter && value)
        return response.send(
            mockUsers.filter((user) => user[filter].includes(value))
        );

    response.send(mockUsers);
});

// Create a new user
app.post("/api/user", (request, response) => {
    const { body } = request;
    const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...body };

    mockUsers.push(newUser);
    response.status(201).send(mockUsers);
});

// Get user by ID
app.get("/api/user/:id", resolveIndexByUserId,(request, response) => {
   const {findUserIndex}=request;
   const findusr = mockUsers[findUserIndex];
    if (!findusr) return response.sendStatus(404);
    response.send({ findusr });
});

// Update user by ID using PUT method
app.put("/api/user/:id", resolveIndexByUserId, (request, response) => {
    const {
        body
        , findUserIndex
    } = request;

    mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };
    return response.sendStatus(200);
});

// Update user by ID using PATCH method
app.patch("/api/user/:id", (request, response) => {
    const {
        body,
        findUserIndex
    } = request;

    mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
    return response.sendStatus(200);
});

// Delete user by ID
app.delete("/api/user/:id", (request, response) => {
    const {
        findUserIndex
    } = request;

    mockUsers.splice(findUserIndex, 1);
    return response.sendStatus(200);
});

// Start the server
app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
});