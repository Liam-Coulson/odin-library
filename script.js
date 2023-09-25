const libraryWrapper = document.getElementById("library-wrapper");
const headerRow = document.getElementById("header-row");
const addButton = document.getElementById("add");
const editButton = document.getElementById("edit");
const deleteButton = document.getElementById("delete");
const buttonsContainer = addButton.parentNode;

const myLibrary = [];
const BookList = {};

// ==========================================
// ================= EVENTS =================
// ==========================================

libraryWrapper.addEventListener("click", clickHandler);
addButton.addEventListener("click", clickHandler);
editButton.addEventListener("click", clickHandler);
deleteButton.addEventListener("click", clickHandler);

document.addEventListener("keydown", key => {
  if (key.code == "Enter") {
    let editingBook = libraryWrapper.querySelector(".editing");
    if (editingBook != null) {
      finishEditing(editingBook);
    } 
  } else if (key.code == "KeyK") {
    libraryWrapper.querySelector(".book").click();
  }
})

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
  }
  else if (e.target.matches("#add")) {
    let blankBook = new Book();
    addBookToLibrary(blankBook);
    const newBook = createNewBookElm(myLibrary[myLibrary.length-1]);
    libraryWrapper.appendChild(newBook);
    toggleButtons();
    editHTMLBookFields(newBook);
  }
  else if (e.target.matches("#edit")) {
    let selectedBook = libraryWrapper.querySelector(".selected");
    toggleButtons();
    editHTMLBookFields(selectedBook);
  }
  else if (e.target.matches("#delete")) {
    if (libraryWrapper.querySelector(".selected") == null) {
      console.log("You haven't selected a book yet.")
    } else {
      let selectedBook = libraryWrapper.querySelector(".selected");
      let bookID = selectedBook.id.slice(1); // Remove the leading "b" from ID
      myLibrary.splice(myLibrary.indexOf(bookID),1); // Delete from JS array
      selectedBook.remove(); // Delete from DOM
    }
  }
}

// =====================================
// ============== CLASSES ==============
// =====================================

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

  // Updates the displayed library on the website
  myLibrary.forEach(bookID => {
    if (displayLibraryIDList.includes("b"+bookID)) {}
    else {
      const bookToAdd = createNewBookElm(bookID);
      libraryWrapper.appendChild(bookToAdd);
    }
  })
}

function toggleButtons() {
  buttonsContainer.childNodes.forEach(button => {
    button.disabled = !button.disabled;
  })
}

function editHTMLBookFields(bookElm) {
  bookElm.classList.add("editing");
  let bookID = bookElm.id.slice(1);
  // Remove click events from all books while editing is in progress
  libraryWrapper.removeEventListener("click", clickHandler);
  bookElm.childNodes.forEach(gridElm => {
    if (gridElm.classList.contains("value")) {
      gridElm.contentEditable = true;

      // Credit for this function from stackoverflow https://stackoverflow.com/a/3806004
      // This allows the user to tab between fields and auto-select all text in the fields
      gridElm.onfocus = function() {
        window.setTimeout(function() {
          var sel, range;
          if (window.getSelection && document.createRange) {
            range = document.createRange();
            range.selectNodeContents(gridElm);
            sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
          } else if (document.body.createTextRange) {
            range = document.body.createTextRange();
            range.moveToElementText(gridElm);
            range.select();
          }
        }, 1);
      };

      gridElm.classList.add("editable");
    }
  })
  buttonsContainer.childNodes.forEach(button => {
    button.disabled = true;
  })
  bookElm.querySelector(".editable").focus();

}

// Reverses all of the changes we made to the HTML
// when making the book editable
function finishEditing(editingBook) {
  libraryWrapper.addEventListener("click", clickHandler);
  editingBook.classList.remove("editing");
  buttonsContainer.childNodes.forEach(button => {
    button.disabled = false;
  })
  editingBook.childNodes.forEach(gridElm => {
    if (gridElm.classList.contains("value")) {
      gridElm.contentEditable = false;
      gridElm.classList.remove("editable");
    }
  })
  changeBookList(editingBook);
}

// Takes the changes in HTML and transfers these changes to JS
// Without doing this, if we added an "update" button to update the
// library on screen, our changes would not have been saved.
function changeBookList(selectedBook) {
  let bookID = selectedBook.id.slice(1);
  Object.keys(BookList[bookID]).forEach(key => {
    BookList[bookID][key] = selectedBook.querySelector(`.${key}`).nextElementSibling.textContent;
  })

  displayLibrary(myLibrary);
}

/**
 * Creates a HTML element for the given book ID. If no ID is given,
 * then all fields are left empty and available for the user to fill
 * @param {string} bookID 
 * @returns HTML element
 */
function createNewBookElm(bookID) {
  let newBookNode = document.createElement("div");
  newBookNode.id = "b"+bookID; // CSS IDs cannot start with a num
  newBookNode.classList.add("book");

  const bookSpine = document.createElement("div");
  bookSpine.classList.add("spine");
  newBookNode.appendChild(bookSpine);
  
  Object.getOwnPropertyNames(new Book).forEach(field => {
    
    const fieldNode = document.createElement("div");
    fieldNode.classList.add(field);
    // Capitalise the first letter
    fieldNode.textContent = field.charAt(0).toUpperCase()+field.slice(1);
    
    const valueNode = document.createElement("div");
    valueNode.classList.add("value");
    valueNode.textContent = BookList[bookID][field];

    newBookNode.appendChild(fieldNode);
    newBookNode.appendChild(valueNode);
  })
  return newBookNode;
}


addBookToLibrary(new Book("The Hobbit", "JRR Tolkein", "1937", "310", "Fantasy", "no"));
addBookToLibrary(new Book("The Hunger Games", "Suzanne Collins", "2008", "374", "Young Adult Fiction", "yes"));
addBookToLibrary(new Book("Dune", "Frank Herbert", "1965", "755", "Science Fiction", "yes"));
addBookToLibrary(new Book("A Christmas Carol", "Charles Dickens", "1843", "65", "Victorian Literature", "no"));

displayLibrary(myLibrary);