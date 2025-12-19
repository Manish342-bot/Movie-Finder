const api_key = "f18420ea";

document.getElementById("searchButton").addEventListener("click", () => {
    const movieName = document.getElementById("inputText").value.trim();

    if (movieName === "") {
        alert("Enter a movie name first");
        return;
    }

    fetchMovie(movieName);
});

async function fetchMovie(title) {
    const card = document.getElementById("movieCard");
    const details = document.getElementById("movieDetails");
    const poster = document.getElementById("poster");

    card.style.display = "block";
    details.innerHTML = "Searching movie...";

    try {
        const response = await fetch(
            `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${api_key}`
        );

        const data = await response.json();

        if (data.Response === "False") {
            details.innerHTML = "❌ Movie not found";
            poster.style.display = "none";
            return;
        }

        poster.src = data.Poster !== "N/A" ? data.Poster : "";
        poster.style.display = "block";

        details.innerHTML = `
            <p><strong>Title:</strong> ${data.Title}</p>
            <p><strong>Year:</strong> ${data.Year}</p>
            <p><strong>Genre:</strong> ${data.Genre}</p>
            <p><strong>IMDB Rating:</strong> ${data.imdbRating}</p>
            <p><strong>Language:</strong> ${data.Language}</p>
            <p><strong>Plot:</strong> ${data.Plot}</p>
        `;

    } catch (error) {
        details.innerHTML = "⚠️ Unable to fetch data";
        console.error(error);
    }
}
