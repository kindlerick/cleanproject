import "../styles/admin.css";

import { useEffect, useState } from "react";

import {
    getPosts,
    createPost,
    updatePost,
    deletePost
} from "/src/services/postsAPI.js";



function AdminPage() {

    const [posts, setPosts] = useState([]);

    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [category, setCategory] = useState("");
    const [content, setContent] = useState("");

    const [editingPost, setEditingPost] = useState(null);


    useEffect(() => {
    getPosts()
        .then((data) => setPosts(data))
        .catch((error) => console.error(error));
    }, []);

    async function handleDelete(id) {
        try {
            await deletePost(id);

            setPosts((currentPosts) =>
                currentPosts.filter((post) => post.id !== id)
            );

            alert("Post deleted!");
        } catch (error) {
            console.error(error);
            alert("Failed to delete post");
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const post = {
            title,
            slug,
            category,
            content,
        };

        try {
        if (editingPost) {
            const updatedPost = await updatePost(editingPost.id, post);

            setPosts((currentPosts) =>
                currentPosts.map((post) =>
                    post.id === updatedPost.id ? updatedPost : post
                )
            );

            alert("Post updated!");
            setEditingPost(null);
        } else {
                await createPost(post);
                alert("Post created!");
            }

            setTitle("");
            setSlug("");
            setCategory("");
            setContent("");
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    }

    return (
        <main>
            <h1>Admin</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Slug"
                    value={slug}
                    onChange={(event) => setSlug(event.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    required
                />

                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                    required
                />

                <button type="submit">
                    {editingPost ? "Update Post" : "Create Post"}
                </button>
                                
            </form>

            <h2>Existing Posts</h2>

            {posts.map((post) => (
                <div key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.category}</p>

                    <button
                        onClick={() => {
                            setEditingPost(post);
                            setTitle(post.title);
                            setSlug(post.slug);
                            setCategory(post.category);
                            setContent(post.content);
                        }}
                    >
                    Edit
                    </button>

                    <button
                        onClick={() => handleDelete(post.id)}
                    >
                    Delete
                    </button>
                </div>
            ))}

        </main>
    );
}

export default AdminPage;