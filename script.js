const myLibrary = [];
const libraryTable = document.getElementById("library-table");
const headerRow = document.getElementById("header-row");

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

function addBookToLibrary() {

}

function displayLibrary(library) {
  myLibrary.forEach(book => {
    let newRow = document.createElement("tr");
    Object.values(book).forEach(field => {
      let newEntry = document.createElement("td");
      newEntry.textContent = field;
      newRow.appendChild(newEntry);
    })
    libraryTable.appendChild(newRow);
  })
}

myLibrary.push(new Book("The Hobbit", "JRR Tolkein", "1937", "310", "Fantasy", "no"));
myLibrary.push(new Book("The Hunger Games", "Suzanne Collins", "2008", "374", "Young Adult Fiction", "yes"));
myLibrary.push(new Book("Dune", "Frank Herbert", "1965", "755", "Science Fiction", "yes"));
myLibrary.push(new Book("A Christmas Carol", "Charles Dickens", "1843", "65", "Victorian Literature", "no"));

// Adds the headers to the table based on the keys in the constructor

Object.keys(myLibrary[0]).forEach(field => {
  let tableNode = document.createElement("th");
  field = field.charAt(0).toUpperCase() + field.slice(1)
  tableNode.textContent = field;
  headerRow.appendChild(tableNode);
})

displayLibrary(myLibrary);