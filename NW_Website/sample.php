<?php include 'header.php'; ?>

<main class="main-content">
    <div class="content">
        <div class="container">
            <div class="row" id="news-container">
                <!-- Nutrition news articles will be displayed here as cards -->
            </div>
            <!-- <div class="row" id="load-more-container">
                <div class="col-md-12 text-center">
                    <button id="load-more-button" class="btn btn-primary">See More</button>
                </div>
            </div> -->
        </div>
    </div>
</main>
<footer class="site-footer">
    <div class="container">
        <nav class="footer-navigation">
            <a href="#">About US</a>
            <a href="#">Offer</a>
            <a href="#">Articles</a>
            <a href="#">Contact</a>
        </nav>

        <div class="social-links">
            <a href="#" class="facebook"><i class="fa fa-facebook"></i></a>
            <a href="#" class="twitter"><i class="fa fa-twitter"></i></a>
            <a href="#" class="google-plus"><i class="fa fa-google-plus"></i></a>
            <a href="#" class="pinterest"><i class="fa fa-pinterest"></i></a>
        </div>
        <div class="colophon">
            <p>Copyright 2023 NutriWise. <br> All rights reserved</p>
        </div>
    </div>
</footer>

<!-- Add this CSS to your existing CSS file or create a new one -->
<style>
    .card {
        background-color: #fff;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        margin-bottom: 20px;
        padding: 10px; /* Adjusted padding for spacing */
        max-width: 400px; /* Adjusted maximum width */
    }

    .card img {
        max-width: 100%;
        height: auto;
        border-radius: 8px 8px 0 0;
    }

    .card h2 {
        font-size: 1.25rem; /* Adjusted font size for titles */
        margin-top: 10px;
    }

    .card p {
        font-size: 1rem; /* Adjusted font size for descriptions */
    }

    .card a {
        color: #007BFF;
        text-decoration: none;
        font-weight: bold;
    }

    #load-more-button {
        margin-top: 20px;
    }

    /* Flexbox layout for news cards */
    #news-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .card {
        flex: 0 1 calc(33.33% - 20px); /* Three columns with spacing */
    }

    /* Responsive layout for smaller screens */
    @media (max-width: 768px) {
        #news-container {
            flex-wrap: wrap;
            justify-content: center; /* Center cards on smaller screens */
        }

        .card {
            flex: 0 1 calc(50% - 20px); /* Two columns with spacing on smaller screens */
        }
    }

    @media (max-width: 576px) {
        .card {
            flex: 0 1 100%; /* Single column on the smallest screens */
        }
    }
</style><style>
    .card {
        background-color: #fff;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        margin-bottom: 20px;
        padding: 10px; /* Adjusted padding for spacing */
        max-width: 400px; /* Adjusted maximum width */
    }

    .card img {
        max-width: 100%;
        height: auto;
        border-radius: 8px 8px 0 0;
    }

    .card h2 {
        font-size: 1.25rem; /* Adjusted font size for titles */
        margin-top: 10px;
    }

    .card p {
        font-size: 1rem; /* Adjusted font size for descriptions */
    }

    .card a {
        color: #007BFF;
        text-decoration: none;
        font-weight: bold;
    }

    #load-more-button {
        margin-top: 20px;
    }

    /* Flexbox layout for news cards */
    #news-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .card {
        flex: 0 1 calc(33.33% - 20px); /* Three columns with spacing */
    }

    /* Responsive layout for smaller screens */
    @media (max-width: 768px) {
        #news-container {
            flex-wrap: wrap;
            justify-content: center; /* Center cards on smaller screens */
        }

        .card {
            flex: 0 1 calc(50% - 20px); /* Two columns with spacing on smaller screens */
        }
    }

    @media (max-width: 576px) {
        .card {
            flex: 0 1 100%; /* Single column on the smallest screens */
        }
    }
</style>

<script>
    const apiKey = '40853a0b612a4a46b20cb1d938238e1e'; // Replace with your actual API key
    const apiUrl = 'https://newsapi.org/v2/everything';
    const keyword = 'nutrition';
    const articlesPerPage = 12;
    let currentPage = 1;
	let totalArticles = 0; // Variable to store the total number of articles


    // Function to create a news card
    function createNewsCard(article) {
        const card = document.createElement('div');
        card.classList.add('card');

        const image = document.createElement('img');
        image.src = article.urlToImage || 'https://via.placeholder.com/150'; // Use a placeholder image if no image is available
        image.alt = article.title || 'Image Alt Text'; // Use fallback text if no title is available
        card.appendChild(image);

        const title = document.createElement('h2');
        title.textContent = article.title || 'Title Not Available'; // Use fallback text if no title is available
        card.appendChild(title);

        const description = document.createElement('p');
        description.textContent = article.description || 'Description Not Available'; // Use fallback text if no description is available
        card.appendChild(description);

        const link = document.createElement('a');
        link.href = article.url || '#'; // Use a placeholder link if no URL is available
        link.textContent = 'Read more';
        card.appendChild(link);

        return card;
    }

    // Function to fetch and display nutrition news articles
	function fetchNutritionNews(page) {
    const pageSize = articlesPerPage;
    fetch(`${apiUrl}?q=${keyword}&apiKey=${apiKey}&pageSize=${pageSize}&page=${page}`)
        .then(response => response.json())
        .then(data => {
            const articles = data.articles;
            const newsContainer = document.getElementById('news-container');

            if (page === 1) {
                newsContainer.innerHTML = '';
                totalArticles = data.totalResults; // Update totalArticles with the total number of articles
            }

            articles.slice((page - 1) * articlesPerPage, page * articlesPerPage).forEach(article => {
                const newsCard = createNewsCard(article);
                newsContainer.appendChild(newsCard);
            });
        })
        .catch(error => {
            console.error('Error fetching news:', error);
        });
}

    // Function to load more news articles
	function loadMoreArticles() {
    if (currentPage * articlesPerPage < totalArticles) {
        currentPage++;
        fetchNutritionNews(currentPage);
    } else {
        // Disable the button or provide a message indicating no more articles to load
        const loadMoreButton = document.getElementById('load-more-button');
        loadMoreButton.disabled = true;
        loadMoreButton.textContent = 'No More Articles';
    }
}

    // Call the function to initially fetch and display the first 5 news articles
    fetchNutritionNews(currentPage);

    // Add an event listener to the "See More" button
    const loadMoreButton = document.getElementById('load-more-button');
    loadMoreButton.addEventListener('click', loadMoreArticles);
</script>

<script src="js/jquery-1.11.1.min.js"></script>
<script src="js/plugins.js"></script>
<script src="js/app.js"></script>

</body>

</html>

