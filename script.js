// Fetching data from the books.json file
fetch('./data/books.json')
  .then(response => response.json())
  .then(data => {
    // Data from the JSON file is available here
    const myBooks = data;
    console.log(myBooks); // Displays the books array in the console

    // Use myBooks as needed (e.g., display titles, manipulate data, etc.)
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

const myLibrary = [];

function Book() {
  // the constructor...
}

function addBookToLibrary() {
  // do stuff here
}

// Function to fetch JSON data from the books json file
async function fetchBooks() {
    const response = await fetch('books.json');
    const data = await response.json();
    return data;
  }
  
  // Function to filter books by genre
  function filterBooksByGenre(books, genre) {
    return books.filter(book => book.genre === genre);
  }
  