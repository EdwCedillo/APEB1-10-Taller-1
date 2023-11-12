// Obtén el formulario y el contenedor de resultados
const searchForm = document.getElementById("search-form");
const resultsContainer = document.getElementById("results-container");

// Escucha el evento de envío del formulario
searchForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Obtén el valor de búsqueda del formulario
    const searchTerm = document.getElementById("search-input").value;

    // Limpia los resultados anteriores
    resultsContainer.innerHTML = "";

    // Realiza una solicitud a la API de Open Library
    fetch(`https://openlibrary.org/search.json?q=${searchTerm}`)
        .then(response => response.json())
        .then(data => {
            // Muestra los resultados en el contenedor
            displayResults(data);
        })
        .catch(error => {
            console.error("Error al obtener resultados:", error);
        });
});

// URL de la imagen de reemplazo
const placeholderImageURL = "PORTADA-NO-DISPONIBLE.jpg";

// Función para mostrar los resultados en el contenedor
function displayResults(data) {
    const docs = data.docs;

    docs.forEach(book => {
        const bookResult = document.createElement("div");
        bookResult.classList.add("book-result");

        const img = document.createElement("img");
        //img.src = libro.cover_i ? `http://covers.openlibrary.org/b/id/${libro.cover_i}-M.jpg` : placeholderImageURL;
        img.src = `http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;        
        img.alt = "Portada del libro";

        
        const bookInfo = document.createElement("div");
        bookInfo.classList.add("book-info");

        const h2 = document.createElement("h2");
        h2.textContent = book.title;

        

        const autorP = document.createElement("p");
        autorP.textContent = `Autor: ${book.author_name ? book.author_name.join(',') : 'Desconocido'}`;

        const editorialP = document.createElement("p");
        editorialP.textContent = `Editorial: ${book.publisher ? book.publisher[0] : 'Desconocido'}`;

        bookInfo.appendChild(h2);
        bookInfo.appendChild(autorP);
        bookInfo.appendChild(editorialP);

        bookResult.appendChild(img);
        bookResult.appendChild(bookInfo);

        resultsContainer.appendChild(bookResult);
    });
}
