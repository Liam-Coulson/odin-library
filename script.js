const libraryWrapper = document.getElementById("library-wrapper");
const headerRow = document.getElementById("header-row");
const addButton = document.getElementById("add");
const editButton = document.getElementById("edit");
const deleteButton = document.getElementById("delete");

const myLibrary = [];
const BookList = {};

// EVENTS
libraryWrapper.addEventListener("click", clickHandler);
addButton.addEventListener("click", clickHandler);
editButton.addEventListener("click", clickHandler);
deleteButton.addEventListener("click", clickHandler);


function clickHandler(e) {
  if (e.target.parentNode.matches(".book")) {
    if (e.target.parentNode.matches(".selected")){
      e.target.parentNode.classList.remove("selected")
    } else {
      e.target.parentNode.parentNode.childNodes.forEach(book => {
        book.classList.remove("selected");
      })
      e.target.parentNode.classList.add("selected");
    }
  } else if (e.target.matches("#add")) {
    console.log("Adding new book...");
  } else if (e.target.matches("#edit")) {
    console.log("Editing this book...");
  } else if (e.target.matches("#delete")) {
    if (libraryWrapper.querySelector(".selected") == null) {
      console.log("You haven't selected a book yet.")
    } else {
      let selectedBook = libraryWrapper.querySelector(".selected");
      let bookID = selectedBook.id.slice(1); // Remove the leading "b"
      console.log(`Deleting this book: ${BookList[bookID].title}`);
      console.log(`My library looks like this: ${myLibrary}`);
      console.log(`My library index 1 has type ${typeof myLibrary[1]}`);
      console.log(`BookID from javascript has type ${typeof bookID}`);
      console.log(`Index of ${bookID} is ${myLibrary.indexOf(bookID)}`);
      myLibrary.splice(myLibrary.indexOf(bookID),1); // Delete from JS array
      console.log("My JS library after deleting from JS: ",myLibrary)
      selectedBook.remove(); // Delete from DOM
      console.log("The book has been deleted!");
      myLibrary.forEach(bookID => {
        console.log(BookList[bookID]);
      })
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
  let bookID = (Object.keys(BookList).length +1).toString();
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