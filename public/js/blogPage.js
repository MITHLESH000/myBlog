let selectedBlogId = "";
window.onclick = function (event) {
    // user profile dropdown start
    var userImage = document.getElementById("userImage");
    var subMenu = document.getElementById("subMenu");

    if (event.target === userImage) {
        subMenu.classList.toggle("open-menu"); // Toggle class to open/close menu
    } else {
        subMenu.classList.remove("open-menu"); // Close menu if clicked outside userImage
    }
    // user profile dropdown end

    // Search results start
    var mainSearch = document.getElementById("searchInput");
    var searchResults = document.getElementById("searchResults");

    if (event.target === mainSearch) {
        searchResults.style.display = "block"; // Show the search results when clicking on search input
    } else if (event.target !== searchResults && !searchResults.contains(event.target)) {
        searchResults.style.display = "none"; // Hide the search results when clicking outside
    }
    // Search results end

};

function setSearchInput(title, id) {
    document.getElementById("searchInput").value = title;
    selectedBlogId = id; // Set the selected blog ID

    document.getElementById("searchResults").style.display = "none"; // Hide the search results after selection
    
}

// public/search.js
document
    .getElementById("searchInput")
    .addEventListener("input", async function () {
        const query = this.value;
        const response = await fetch(`/search?title=${query}`);
        const blogs = await response.json();

        const resultsDiv = document.getElementById("searchResults");
        resultsDiv.innerHTML = "";

        blogs.forEach((blog) => {
            const blogDiv = document.createElement("div");
            blogDiv.className = "blog";
            selectedBlogId = blog._id;
            blogDiv.innerHTML = `
            <h2 onclick="setSearchInput('${blog.title}','${blog._id}')">${blog.title}</h2>
        `;
            resultsDiv.appendChild(blogDiv);
        });
        resultsDiv.style.display = 'block'; // Ensure the search results are displayed

    });

document
    .getElementById("searchInput")
    .addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            window.location.href = `/searchBlog?id=${selectedBlogId}`; /////
        }
    });

// function setSearchInput(title) {
//     document.getElementById("searchInput").value = title;
// }
