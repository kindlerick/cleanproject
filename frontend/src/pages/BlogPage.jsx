import "../styles/blog.css";

import { useEffect, useState } from "react";
import { getPosts } from "/src/services/postsAPI.js";
import { Link } from "react-router-dom";

function BlogPage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts()
            .then((data) => setPosts(data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <main>
            <h1>Blogs</h1>

            {posts.map((post) => (
                <article key={post.id}>
                    <h2>
                        <Link to={`/blog/${post.slug}`}>
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
