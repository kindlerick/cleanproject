const express = require("express");
const router = express.Router();

const db = require("../database/database");

router.get("/", (req, res) => {
    const posts = db
        .prepare("SELECT * FROM posts ORDER BY created_at DESC")
        .all();

    res.json(posts);
});

router.get("/:slug", (req, res) => {
    const { slug } = req.params;

    const post = db
        .prepare("SELECT * FROM posts WHERE slug = ?")
        .get(slug);

    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
});

router.post("/", (req, res) => {
    const { title, slug, category, content } = req.body;

    const result = db.prepare(`
        INSERT INTO posts (title, slug, category, content)
        VALUES (?, ?, ?, ?)
    `).run(title, slug, category, content);

    const newPost = db
        .prepare("SELECT * FROM posts WHERE id = ?")
        .get(result.lastInsertRowid);

    res.status(201).json(newPost);
});

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { title, slug, category, content } = req.body;

    const result = db.prepare(`
        UPDATE posts
        SET title = ?, slug = ?, category = ?, content = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
    `).run(title, slug, category, content, id);

    if (result.changes === 0) {
        return res.status(404).json({ message: "Post not found" });
    }

    const updatedPost = db
        .prepare("SELECT * FROM posts WHERE id = ?")
        .get(id);

    res.json(updatedPost);
}); 

router.delete("/:id", (req, res) => {
    const { id } = req.params;

    const result = db
        .prepare("DELETE FROM posts WHERE id = ?")
        .run(id);

    if (result.changes === 0) {
        return res.status(404).json({ message: "Post not found" });
    }

    res.json({ message: "Post deleted successfully" });
});

module.exports = router;