//Listener al botón de busqueda
document.querySelector(".search button").addEventListener("click", () => {
    library.search();
  });
  
  //Listener al presionar enter
  document.querySelector(".search-bar").addEventListener("keyup", (event) =>{
      if(event.key == "Enter"){
          library.search();
      }
  });
  
  
  
  //Clase libreria
  let library = {
    apiKey: " ",
    //https://openlibrary.org/isbn/9780140328721 "https://openlibrary.org/works/?q="
    url: "https://openlibrary.org/isbn/?q=", // http://openlibrary.org/search.json?q=  "http://openlibrary.org/search.json?title="
  
    //Función de busqueda
    search: function () {
      const isbn = document.querySelector(".search-bar").value;
      if (isbn) {
        this.fetchLibrary(isbn);
      } else {
        alert("Por favor, ingrese nombre de Libro.");
      }
    },
  
    //Función de Fetch a la API
    fetchLibrary: async function (isbn) {
      try {
        const response = await fetch(
          //`${this.url}${city}&units=metric&appid=${this.apiKey}`
          `${this.url}${isbn}`
        );
  
        if (!response.ok) {
          alert(`No se encontró el libro ${isbn}.`);
          throw new Error(`No se encontró datos para el libro ${isbn}.`);
        }
  
        const data = await response.json();
        console.log(data);
        
        this.displayLibrary(data);
      } catch (error) {
        console.error(error);
      }
    },
  
  
    //Función de renderizado de datos
    displayLibrary: function(data){
      const {title} = data;
      const {icon, description} = data.library[0];
      const {temp, publish_date} = data.main;
      const {number_of_pages} = data.number_of_pages;
      
      console.log(title, icon, description, temp, publish_date, number_of_pages);
      //Manejo del DOM
      //document.querySelector(".city").textContent = `Titulo: ${title}`;
      document.querySelector(".temp").textContent = `${temp}°C`;
      document.querySelector(".icon").src = `https://openweathermap.org/img/wn/${icon}.png`;
      document.querySelector(".description").textContent = description;
      document.querySelector(".publish_date").textContent = `Humedad al ${publish_date}%`;
      document.querySelector(".number_of_pages").textContent = `Numero de Paginas: ${number_of_pages} km/h`;
      /*document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?"+title+"')";*/

      //covers.openlibrary.org/b/id/12630813-M.jpg
    }
  };
  
  
  //Inicializar siempre con el id OL45804W
  library.fetchLibrary("OL45804W");