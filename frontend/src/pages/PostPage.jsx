import { useEffect, useState } from "react";
import { getPostBySlug } from "/src/services/postsAPI.js";
import { Link, useParams } from "react-router-dom";

import '../styles/post.css';

function PostPage() {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getPostBySlug(slug)
            .then((data) => {
                setPost(data);
            })
            .catch((error) => {
                console.error(error);
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [slug]);

    if (loading) {
        return <p>Loading post...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <main className="post-page">
        <h1>{post.title}</h1>
            <p>{post.category}</p>
            <p>{post.content}</p>

            <Link to="/blogs">Back to Blogs</Link>
        </main>
    );
}

export default PostPage;