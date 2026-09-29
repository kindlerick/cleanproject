function BlogPostCard({ title, category, excerpt }) {
    return (
        <article>
            <h2>{title}</h2>
            <p>{category}</p>
            <p>{excerpt}</p>
        </article>
    );
}

export default BlogPostCard;

