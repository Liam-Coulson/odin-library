# odin-library

On this website, books in the library are displayed on screen in a book-shaped div, with their information such as title, author, genre all shown. There is the option to add, edit, or delete a book from the library which can be done by pressing the buttons below the books.

In the JS there is a dictionary called "BookList" which stores numbered keys (book IDs) and values of book objects, corresponding to the books displayed on the website. These book objects have the displayed properties, i.e. title, author, year, page count.

There is an array called myLibrary which contains a list of book IDs that should be shown on screen. When the page is loaded or the library is updated with a new book added, myLibrary is used to check that all books with IDs in myLibrary are shown on screen. Each book object on the website is given a CSS ID that matches the ID in myLibrary so that we can keep track of the HTML elements in line with what JS sees.

There are some instructions on how to use the site listed below the buttons.

TODO: I must return to this project and make the CSS a lot nicer, especially when I tie this project in to a larger Github pages website listing all my TOP projects.