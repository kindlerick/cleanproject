const express = require("express");
const cors = require("cors");
const session = require("express-session");

const db = require("./database/database");
const postsRouter = require("./routes/posts");
const authRouter = require("./routes/auth");

const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use(session({
    secret: "replace-this-with-a-real-secret",
    resave: false,
    saveUninitialized: false
}));

app.get("/", (req, res) => {
    res.json({ message: "Backend is running" });
});

app.use("/api/posts", postsRouter);
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});