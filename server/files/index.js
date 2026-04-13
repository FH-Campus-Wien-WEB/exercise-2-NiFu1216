window.onload = function () {
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    const bodyElement = document.querySelector("body");
    if (xhr.status == 200) {
      const movies = JSON.parse(xhr.responseText);

      // Display the title "Movies"
      let title = document.createElement("h1")
      title.innerHTML = "Movies"
      bodyElement.append(title)

      // Create a wrapper for the sections
      let wrapper = document.createElement("section")
      
      // Loop through all the movies and display their information
      for (let movie of movies) {

          let container = document.createElement("article")
          container.setAttribute("ID", movie.imdbID)

          let movie_title = document.createElement("h2")
          movie_title.innerHTML = movie.Title
          movie_title.setAttribute("class", "movie_title")

          let img = document.createElement("img")
          img.src = movie.Poster

          let release_date = document.createElement("p")
          release_date.innerHTML = "Released on: " + movie.Released

          let runtime = document.createElement("p")
          runtime.innerHTML = "Duration: " + movie.Runtime + " min"

          let plot = document.createElement("p")
          plot.innerHTML = movie.Plot

          let genres = document.createElement("h3")
          genres.innerHTML = "Genres"

          let genres_list = document.createElement("ul")
          
          for (let genre of movie.Genres) {
              let genre_list_element = document.createElement("li")
              genre_list_element.innerHTML = genre
              genres_list.append(genre_list_element)
          }

          let directors = document.createElement("h3")
          directors.innerHTML = "Directors"

          let directors_list = document.createElement("ul")
          
          for (let director of movie.Directors) {
              let director_list_element = document.createElement("li")
              director_list_element.innerHTML = director
              directors_list.append(director_list_element)
          }

          let writers = document.createElement("h3")
          writers.innerHTML = "Writers"

          let writers_list = document.createElement("ul")
          
          for (let writer of movie.Writers) {
              let writer_list_element = document.createElement("li")
              writer_list_element.innerHTML = writer
              writers_list.append(writer_list_element)
          }

          let actors = document.createElement("h3")
          actors.innerHTML = "Actors"

          let actors_list = document.createElement("ul")
          
          for (let actor of movie.Actors) {
              let actor_list_element = document.createElement("li")
              actor_list_element.innerHTML = actor
              actors_list.append(actor_list_element)
          }

          let metascore_and_imdbRating = document.createElement("p")
          metascore_and_imdbRating.innerHTML = "Metascore: " + movie.Metascore + ", IMDB Rating: " + movie.imdbRating

          let edit_button = document.createElement("button")
          edit_button.innerText = "Edit"
          edit_button.onclick = function() {
              window.location.href = "edit.html?imdbID=" + movie.imdbID
          }
          
          container.append(movie_title, img, release_date, runtime, plot, genres, genres_list, directors, directors_list, writers, writers_list, actors, actors_list, metascore_and_imdbRating, edit_button)
          wrapper.append(container)
          bodyElement.append(wrapper)
      }

    } else {
      bodyElement.append(
        "Daten konnten nicht geladen werden, Status " +
          xhr.status +
          " - " +
          xhr.statusText
      );
    }
  };
  xhr.open("GET", "/movies");
  xhr.send();
};
