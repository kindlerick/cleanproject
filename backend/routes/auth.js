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

    req.session.adminId = admin.id;

    res.json({
        message: "Login successful"
    });
});

router.get("/me", (req, res) => {
    if (!req.session.adminId) {
        return res.status(401).json({
            message: "Not logged in"
        });
    }

    res.json({
        message: "You are logged in",
        adminId: req.session.adminId
    });
});

router.post("/logout", (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.error(error);
            return res.status(500).json({
                message: "Failed to log out"
            });
        }

        res.json({
            message: "Logout successful"
        });
    });
});

module.exports = router;


