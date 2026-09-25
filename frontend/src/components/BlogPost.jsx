import { useParams } from "react-router-dom";

import blogPosts from "../assets/data/blogPosts.json";


function BlogPost( ) {

    const { slug } = useParams();

    function getBlogByslug(blogs, slug){
        for (let blog of blogs) {
            if (blog.slug === slug) {
                return blog
            }
        }
        
    }

    const blog = getBlogByslug(blogPosts, slug);

    if (!blog) {
        return <h1>Blog not found</h1>;
    }


    return (
        <>
        <div className="blogPost">
            <h1>{blog.title}</h1>
        </div>
        </>
    )
}


export default BlogPost;