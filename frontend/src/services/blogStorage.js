// services/blogStorage.js

const API_URL = "http://localhost:5000/api/posts";

// 1. Fetch all blogs from the DB
async function getBlogs() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch posts from DB");
        return await response.json();
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return [];
    }
}

// 2. Add a new blog to the DB
async function addBlog({ title, category, slug, content }) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, category, slug, content })
        });
        if (!response.ok) throw new Error("Failed to create post in DB");
        return await response.json();
    } catch (error) {
        console.error("Error adding blog:", error);
        throw error;
    }
}

// 3. Update an existing blog in the DB
async function updateBlog(id, updatedData) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData)
        });
        if (!response.ok) throw new Error("Failed to update post in DB");
        return await response.json();
    } catch (error) {
        console.error("Error updating blog:", error);
        throw error;
    }
}

// 4. Delete a blog from the actual DB
async function deleteBlog(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });
        if (!response.ok) throw new Error("Failed to delete post from DB");
        return true;
    } catch (error) {
        console.error("Error deleting blog:", error);
        throw error;
    }
}

export default {
    getBlogs,
    addBlog,
    updateBlog,
    deleteBlog
};