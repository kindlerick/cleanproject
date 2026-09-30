import "../styles/admin.css";

import { useState } from "react";
import { createPost } from "/src/services/postsAPI.js";


async function handleUpdate() {
    try {
        const updatedPost = await updatePost(2, {
            title: "Updated From React",
            slug: "updated-from-react",
            category: "Programming",
            content: "This post was updated through the React frontend.",
        });

        console.log(updatedPost);
    } catch (error) {
        console.error(error);
    }
}


function AdminPage() {
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [category, setCategory] = useState("");
    const [content, setContent] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        const post = {
            title,
            slug,
            category,
            content,
        };

        try {
            await createPost(post);

            setTitle("");
            setSlug("");
            setCategory("");
            setContent("");

            alert("Post created!");
        } catch (error) {
            console.error(error);
            alert("Failed to create post");
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
                />

                <input
                    type="text"
                    placeholder="Slug"
                    value={slug}
                    onChange={(event) => setSlug(event.target.value)}
                />

                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                />

                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                />

                <button type="submit">Create Post</button>
                
            </form>
        </main>
    );
}

export default AdminPage;