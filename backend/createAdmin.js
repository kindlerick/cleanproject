const bcrypt = require("bcrypt");
const db = require("./database/database");

const username = "admin";
const password = "Wackenww33";

const passwordHash = bcrypt.hashSync(password, 10);

db.prepare(`
    INSERT INTO admins (username, password_hash)
    VALUES (?, ?)
`).run(username, passwordHash);

console.log("Admin created successfully.");

db.close();