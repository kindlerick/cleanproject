import { useEffect, useState } from "react";
import { getPosts } from "/src/services/postsAPI.js";
import { Link } from "react-router-dom";

import "../styles/blog.css";
import '../index.css';

function BlogPage() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        getPosts()
            .then((data) => {
                setPosts(data);
            })
            .catch((error) => {
                console.error(error);
                setError("Failed to load posts.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <main class="blog-page">
                <p>Loading posts...</p>
            </main>
        )
    }

    if (error) {
        return (
            <main class="blog-page">
                <p className="error-message">{error}</p>
            </main>
        );
    }


    return (
        <main className="blog-page">
        <h1>Blogs</h1>

            {posts.map((post) => (
                <article key={post.id}>
                    <h2>
                        <Link to={`/blogs/${post.slug}`}>
                            {post.title}
                        </Link>
                    </h2>
                    <p>{post.category}</p>
                    <p>{post.content}</p>
                </article>
            ))}
        </main>
    );
}

export default BlogPage;
