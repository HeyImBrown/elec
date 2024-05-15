document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('post-form');
    const postsContainer = document.getElementById('posts-container');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const postId = document.getElementById('post-id').value;
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;

        if (postId) {
            await updatePost(postId, title, content);
        } else {
            await createPost(title, content);
        }

        form.reset();
        document.getElementById('post-id').value = '';
        loadPosts();
    });

    async function createPost(title, content) {
        await fetch('api.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content })
        });
    }

    async function updatePost(id, title, content) {
        await fetch(`api.php?id=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content })
        });
    }

    async function deletePost(id) {
        await fetch(`api.php?id=${id}`, {
            method: 'DELETE'
        });
        loadPosts();
    }

    async function loadPosts() {
        const response = await fetch('api.php');
        const posts = await response.json();
        postsContainer.innerHTML = '';
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post';
            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                <button onclick="editPost(${post.id}, '${post.title}', '${post.content}')">Edit</button>
                <button onclick="deletePost(${post.id})">Delete</button>
            `;
            postsContainer.appendChild(postElement);
        });
    }

    loadPosts();
});

function editPost(id, title, content) {
    document.getElementById('post-id').value = id;
    document.getElementById('title').value = title;
    document.getElementById('content').value = content;
}
