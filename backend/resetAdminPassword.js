const readline = require("node:readline/promises");
const { stdin, stdout } = require("node:process");
const bcrypt = require("bcrypt");
const db = require("./database/database");

async function main() {
    const rl = readline.createInterface({
        input: stdin,
        output: stdout
    });

    const password = await rl.question("Enter your new admin password: ");
    rl.close();

    if (password.length < 12) {
        console.log("Use a password of at least 12 characters.");
        db.close();
        return;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const result = db.prepare(`
        UPDATE admins
        SET password_hash = ?
        WHERE username = ?
    `).run(passwordHash, "admin");

    if (result.changes === 0) {
        console.log("Admin account not found.");
    } else {
        console.log("Admin password updated successfully.");
    }

    db.close();
}

main().catch((error) => {
    console.error("Password reset failed:", error.message);
    db.close();
});