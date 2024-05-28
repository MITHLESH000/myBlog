// public/search.js
let selectedBlogId = '';
document.getElementById('searchInput').addEventListener('input', async function () {
    const query = this.value;
    const response = await fetch(`/search?title=${query}`);
    const blogs = await response.json();

    const resultsDiv = document.getElementById('searchResults');
    resultsDiv.innerHTML = '';

    blogs.forEach(blog => {
        const blogDiv = document.createElement('div');
        blogDiv.className = 'blog';
        selectedBlogId=blog._id;
        blogDiv.innerHTML = `
            <h2 onclick="setSearchInput('${blog.title}')">${blog.title}</h2>
        `;
        resultsDiv.appendChild(blogDiv);
    });
});

document.getElementById('searchInput').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        window.location.href = `/searchBlog?id=${selectedBlogId}`;/////
    }
});

function setSearchInput(title) {
    document.getElementById('searchInput').value = title;
}


// <p>${blog.content}</p>
// <p><small>${new Date(blog.date).toLocaleDateString()}</small></p>
