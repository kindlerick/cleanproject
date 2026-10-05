const express = require("express");
const bcrypt = require("bcrypt");

const router = express.Router();
const db = require("../database/database");

router.post("/login", (req, res) => {
    const { username, password } = req.body;

    const admin = db
        .prepare("SELECT * FROM admins WHERE username = ?")
        .get(username);

    if (!admin) {
        return res.status(401).json({
            message: "Invalid username or password"
        });
    }

    const passwordMatches = bcrypt.compareSync(
        password,
        admin.password_hash
    );

    if (!passwordMatches) {
        return res.status(401).json({
            message: "Invalid username or password"
        });
    }

    res.json({
        message: "Login successful"
    });
});

module.exports = router;