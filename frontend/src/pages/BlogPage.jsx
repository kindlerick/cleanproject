import BlogPostCard from "../components/BlogPost";

import "../styles/blog.css";


function BlogPage() {

    return (
        <main>
            <h1>Blog</h1>

            <BlogPostCard
                title="My First Post"
                category="Technology"
                excerpt="This is my first blog post."
            />

            <BlogPostCard
                title="Another Post"
                category="Life"
                excerpt="Some thoughts about life."
            />
        </main>
    );
}


export default BlogPage;