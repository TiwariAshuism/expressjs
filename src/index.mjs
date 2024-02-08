import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;
export const mockUsers = [
  { id: 1, username: "anson", displayName: "Anson", password: "hello123" },
  { id: 2, username: "jack", displayName: "Jack", password: "hello124" },
  { id: 3, username: "adam", displayName: "Adam", password: "hellohello" },
  { id: 4, username: "tina", displayName: "Tina", password: "test123" },
  { id: 5, username: "jason", displayName: "Jason", password: "hello123" },
  { id: 6, username: "henry", displayName: "Henry", password: "hello123" },
  { id: 7, username: "marilyn", displayName: "Marilyn", password: "hello123" },
];
app.get("/", (request, response) => {
  response.status(201).send({
    name: "ashu",
  });
});

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

app.get("/api/carts/:id", (request, response) => {
  const id = parseInt(request.params.id);
  if (isNaN(id)) return response.status(401).send({ msg: "Invalid id " });

  const findusr = mockUsers.find((user) => user.id == id);
  console.log(findusr);
  if (!findusr) return response.sendStatus(401);
});
app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
