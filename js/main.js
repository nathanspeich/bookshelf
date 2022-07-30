//Example fetch using pokemonapi.co
document.querySelector(".btn").addEventListener("click", getFetch);

//Fetch for search results
function getFetch(event) {
  event.preventDefault();

  const key = "AIzaSyDyAuertwz7gokc9wDEsdCeDvh8SsjG7V4";
  const input = document.querySelector("input").value;
  const lang = "en-US";
  const page = 1;
  const adultContent = false;
  fetch(`https://www.googleapis.com/books/v1/volumes?q={${input}}&key=${key}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      //Reset DOM
      reset();
      //Loop through Search arr and return a new copy
      data.items.map((book) => {
        bookVols = document.querySelector(".bookVols");
        //Display book(s) on DOM
        bookVols.innerHTML += `
        <article class="bookVol">
        <img src="${
          book.volumeInfo.imageLinks.thumbnail
        }" alt="" class="bookVolCover">
            <div class="bookVolMeta">
              <div class="metaHeader">
                <a href="#" class="metaTitle">${book.volumeInfo.title}</a>
                <div>
                  <span class="metaAuthor">by ${spaceBetweenAuthors(
                    book.volumeInfo.authors
                  )}</span>
                  · <span class="metaReleaseYear">${releaseYear(book)}</span>
                </div>
              </div>
              <p class="metaDescription">${truncate(
                book.volumeInfo.description,
                300
              )}</p>
            </div>
        </article>
        `;
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

//Functions

//Reset DOM
function reset() {
  const bookVols = document.querySelector(".bookVols");

  while (bookVols.firstChild) bookVols.removeChild(bookVols.firstChild);
}

//Only return the year
function releaseYear(book) {
  let year = book.volumeInfo.publishedDate.substring(0, 4);
  return year;
}

//Meta description character limit ellipsis
function truncate(p, n) {
  return p.length > n ? p.substr(0, n - 1) + "&hellip;" : p;
}

//Add space after commas separating authors
function spaceBetweenAuthors(authors) {
  return authors.slice(",").join(", ");
}

//Media query
function checkMediaQuery() {
  const mobileMenu = document.querySelector(".fi");
  const searchForm = document.querySelector(".searchForm");
  // If the inner width of the window is greater then 768px
  if (window.innerWidth <= 500) {
    // Then log this message to the console
    mobileMenu.classList.remove("hidden");
    searchForm.style.display = "none";
  } else {
    mobileMenu.classList.add("hidden");
    searchForm.style.display = "flex";
  }
}
// Add a listener for when the window resizes
window.addEventListener("resize", checkMediaQuery);
