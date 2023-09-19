const libraryWrapper = document.getElementById("library-wrapper");
const headerRow = document.getElementById("header-row");

const myLibrary = [];
const BookList = {};

class Book {
  constructor(title, author, year, pages, genre, read) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.pages = pages;
    this.genre = genre;
    this.read = read;
  }
}

function addBookToLibrary(bookObj, library=myLibrary) {
  let bookID = Object.keys(BookList).length +1;
  BookList[bookID] = bookObj;
  library.push(bookID); // The bookID in library points to the book object in BookList
}

function displayLibrary(library) {
  // Gets the list of current displayed books so we don't double display
  let currentDisplayedLibrary = document.querySelectorAll(".book");
  let displayLibraryIDList = [];
  currentDisplayedLibrary.forEach(book => {
    displayLibraryIDList.push(book.id);
  })

  // Updates the displayed library in the website
  myLibrary.forEach(bookID => {
    if (displayLibraryIDList.includes("b"+bookID)) {}
    else {
      let newBookNode = document.createElement("div");
      newBookNode.id = "b"+bookID; // CSS IDs cannot start with a num
      newBookNode.classList.add("book");
      Object.keys(BookList[bookID]).forEach(field => {
        const fieldNode = document.createElement("div");
        fieldNode.textContent = field;
        const valueNode = document.createElement("div");
        valueNode.textContent = BookList[bookID][field];
        newBookNode.appendChild(fieldNode);
        newBookNode.appendChild(valueNode);
      })
      // newBookNode.textContent = `Title: ${BookList[bookID].title}\n
      // Author: ${BookList[bookID].author}\n
      // Year published: ${BookList[bookID].year}\n
      // Pages: ${BookList[bookID].pages}\n
      // Genre: ${BookList[bookID].genre}\n
      // Have I read it: ${BookList[bookID].read}
      // `;
      libraryWrapper.appendChild(newBookNode);
    }
  })
}

addBookToLibrary(new Book("The Hobbit", "JRR Tolkein", "1937", "310", "Fantasy", "no"));
addBookToLibrary(new Book("The Hunger Games", "Suzanne Collins", "2008", "374", "Young Adult Fiction", "yes"));
addBookToLibrary(new Book("Dune", "Frank Herbert", "1965", "755", "Science Fiction", "yes"));
addBookToLibrary(new Book("A Christmas Carol", "Charles Dickens", "1843", "65", "Victorian Literature", "no"));


displayLibrary(myLibrary);