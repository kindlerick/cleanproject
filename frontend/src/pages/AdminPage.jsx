import { useState, useEffect } from "react";
import blogStorage from "../services/blogStorage";
import "../styles/admin.css";

function AdminPage() {
    const [posts, setPosts] = useState([]);
    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        category: "",
        content: ""
    });

    // Load blogs from database when component mounts
    useEffect(() => {
        async function loadBlogs() {
            const data = await blogStorage.getBlogs();
            setPosts(data);
        }
        loadBlogs();    
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleTitleChange = (e) => {
        const title = e.target.value;
        const generatedSlug = title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/[\s_-]+/g, "-")
            .replace(/^-+|-+$/g, "");

        setFormData((prev) => ({
            ...prev,
            title,
            slug: editingId ? prev.slug : generatedSlug
        }));
    };

    // SUBMIT (CREATE OR UPDATE)
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingId) {
                const updatedPost = await blogStorage.updateBlog(editingId, formData);
                setPosts((prev) => prev.map((p) => (p.id === editingId ? updatedPost : p)));
            } else {
                const newPost = await blogStorage.addBlog(formData);
                setPosts((prev) => [newPost, ...prev]);
            }
            resetForm();
        } catch (err) {
            alert("Action failed. Ensure your backend server is running.");
        }
    };

    // DELETE FROM DB
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this post from the database?")) {
            try {
                await blogStorage.deleteBlog(id);
                // Filter out the deleted post from state
                setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
            } catch (err) {
                alert("Failed to delete post from database.");
            }
        }
    };

    const handleEdit = (post) => {
        setEditingId(post.id);
        setFormData({
            title: post.title,
            slug: post.slug,
            category: post.category || "",
            content: post.content || ""
        });
    };

    const resetForm = () => {
        setEditingId(null);
        setFormData({ title: "", slug: "", category: "", content: "" });
    };

    return (
        <div className="admin-container">
            <h1>Admin Dashboard</h1>

            {/* POST FORM */}
            <section className="admin-form-section">
                <h2>{editingId ? "Edit Post" : "Create New Micro-Post"}</h2>

                <form onSubmit={handleSubmit} className="admin-form">
                    <div>
                        <label htmlFor="title">Title:</label>
                        <input
                            id="title"
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleTitleChange}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="slug">URL Slug:</label>
                        <input
                            id="slug"
                            type="text"
                            name="slug"
                            value={formData.slug}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="category">Category / Tag:</label>
                        <input
                            id="category"
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            placeholder="e.g. tech, lifestyle, updates"
                        />
                    </div>

                    <div>
                        <label htmlFor="content">Content:</label>
                        <textarea
                            id="content"
                            name="content"
                            rows="6"
                            value={formData.content}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="admin-form-buttons">
                        <button type="submit">
                            {editingId ? "Update Post" : "Publish Post"}
                        </button>
                        {editingId && (
                            <button type="button" onClick={resetForm}>
                                Cancel Edit
                            </button>
                        )}
                    </div>
                </form>
            </section>

            {/* EXISTING POSTS LIST */}
            <section>
                <h2>Manage Existing Posts</h2>

                <table className="admin-posts">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Slug</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post) => (
                            <tr key={post.id}>
                                <td>{post.title}</td>
                                <td><code>{post.slug}</code></td>
                                <td>
                                    <div className="admin-post-actions">
                                        <button onClick={() => handleEdit(post)}>
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(post.id)}
                                            className="admin-delete-button"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}

export default AdminPage;   