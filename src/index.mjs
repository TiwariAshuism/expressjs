import bodyParser from "body-parser";
import express from "express";
import routes from "./routes/index.mjs"


const app = express();
app.use(routes)
app.use(bodyParser.json());



const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
});