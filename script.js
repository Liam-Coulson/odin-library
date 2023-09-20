const libraryWrapper = document.getElementById("library-wrapper");
const headerRow = document.getElementById("header-row");

const myLibrary = [];
const BookList = {};

// EVENTS
libraryWrapper.addEventListener("click", clickHandler);

function clickHandler(e) {
  console.log(e.target);
  if (e.target.parentNode.matches(".book")) {
    console.log("Matches a book");
    if (e.target.parentNode.matches(".selected")){
      console.log("targeting an already selected book");
      console.log("e.target: ",e.target);
      console.log("e.target.parentnode: ",e.target.parentNode);
      console.log("parent class list: ",e.target.parentNode.classList);
      e.target.parentNode.classList.remove("selected")
      console.log("e.target.parentnode class list: ", e.target.parentNode.classList);
    } else {
      console.log("targeting a non-selected book");
      e.target.parentNode.parentNode.childNodes.forEach(book => {
        book.classList.remove("selected");
      })
      e.target.parentNode.classList.add("selected");
    }
  }
}

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

      const bookSpine = document.createElement("div");
      bookSpine.classList.add("spine");
      newBookNode.appendChild(bookSpine);

      Object.keys(BookList[bookID]).forEach(field => {
        const fieldNode = document.createElement("div");
        // Capitalise the first letter
        fieldNode.textContent = field.charAt(0).toUpperCase()+field.slice(1);
        const valueNode = document.createElement("div");
        valueNode.textContent = BookList[bookID][field];
        newBookNode.appendChild(fieldNode);
        newBookNode.appendChild(valueNode);
      })
      libraryWrapper.appendChild(newBookNode);
    }
  })
}

addBookToLibrary(new Book("The Hobbit", "JRR Tolkein", "1937", "310", "Fantasy", "no"));
addBookToLibrary(new Book("The Hunger Games", "Suzanne Collins", "2008", "374", "Young Adult Fiction", "yes"));
addBookToLibrary(new Book("Dune", "Frank Herbert", "1965", "755", "Science Fiction", "yes"));
addBookToLibrary(new Book("A Christmas Carol", "Charles Dickens", "1843", "65", "Victorian Literature", "no"));


displayLibrary(myLibrary);