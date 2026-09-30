import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostBySlug } from "/src/services/postsAPI.js";

function PostPage() {
    const { slug } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        getPostBySlug(slug)
            .then((data) => setPost(data))
            .catch((error) => console.error(error));
    }, [slug]);

    if (!post) {
        return <p>Loading...</p>;
    }

    return (
        <main>
            <h1>{post.title}</h1>
            <p>{post.category}</p>
            <p>{post.content}</p>
        </main>
    );
}

export default PostPage;