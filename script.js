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
  let libraryIDList = [];
  currentDisplayedLibrary.forEach(book => {
    libraryIDList.push(book.id);
  })

  console.log(currentDisplayedLibrary);

  myLibrary.forEach(bookID => {
    if (libraryIDList.includes("b"+bookID)) {}
    else {
      console.log(`the ID should be valid now, id is ${bookID}`);
      let newBookNode = document.createElement("div");
      newBookNode.id = "b"+bookID; // CSS IDs cannot start with a num
      newBookNode.classList.add("book");
      newBookNode.textContent = `Title: ${BookList[bookID].title}\n
      Author: ${BookList[bookID].author}\n
      Year published: ${BookList[bookID].year}\n
      Pages: ${BookList[bookID].pages}\n
      Genre: ${BookList[bookID].genre}\n
      Have I read it: ${BookList[bookID].read}
      `;
      libraryWrapper.appendChild(newBookNode);
    }
  })
}

addBookToLibrary(new Book("The Hobbit", "JRR Tolkein", "1937", "310", "Fantasy", "no"));
addBookToLibrary(new Book("The Hunger Games", "Suzanne Collins", "2008", "374", "Young Adult Fiction", "yes"));
addBookToLibrary(new Book("Dune", "Frank Herbert", "1965", "755", "Science Fiction", "yes"));
addBookToLibrary(new Book("A Christmas Carol", "Charles Dickens", "1843", "65", "Victorian Literature", "no"));

console.log(BookList);

displayLibrary(myLibrary);
displayLibrary(myLibrary);