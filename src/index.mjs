import bodyParser from "body-parser";
import express from "express";
import routes from "./routes/index.mjs"
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser("helloworld"))
app.use(routes)
app.use(bodyParser.json());



const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
});