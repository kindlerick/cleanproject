const API_URL = "http://localhost:5000/api/posts";

export async function getPosts() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Failed to fetch posts");
    }

    return response.json();
}

export async function getPostBySlug(slug) {
    const response = await fetch(`${API_URL}/${slug}`);

    if (response.status === 404) {
        throw new Error("Post not found");
    }

    if (!response.ok) {
        throw new Error("Failed to fetch post");
    }

    return response.json();
}

export async function createPost(post) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);    }

    return response.json();
}


export async function updatePost(id, post) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
    });

    if (!response.ok) {
        throw new Error("Failed to update post");
    }

    return response.json();
}

export async function deletePost(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Failed to delete post");
    }

    return response.json();
}


