const db = require("./database/database");
const postsRouter = require("./routes/posts");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Backend is running" });
});

app.use("/api/posts", postsRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});