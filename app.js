// book constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}


//ui constructor
function UI() {

}

UI.prototype.addBookToList = function (book) {
    const list = document.getElementById('book-list')
    // create tr
    const row = document.createElement('tr')
    // insert column
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
    `
    list.appendChild(row);

}

// Delete book
UI.prototype.deleteBook = function (target) {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove()
    }
}

// Show Alert
UI.prototype.showAlert = function (message, className) {
    //create div
    const div = document.createElement('div')

    //add classes
    div.className = `alert ${className}`

    //add text
    div.appendChild(document.createTextNode(message))

    //get parent
    const container = document.querySelector('.container');
    //get form
    const form = document.querySelector('#book-form');

    container.insertBefore(div, form);

    // timeout after 3 sec
    setTimeout(function () {
        document.querySelector('.alert').remove();
    }, 3000);
}

// Clear input fields
UI.prototype.clearFields = function () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}


//Event Listeners Insert
bookForm = document.getElementById('book-form').addEventListener('submit', function (e) {
    //get form values
    const author = document.getElementById('author').value,
        title = document.getElementById('title').value,
        isbn = document.getElementById('isbn').value;
    // instantiate book
    const book = new Book(title, author, isbn)

    // instantie new UI()
    const ui = new UI()

    // validate
    if (title === "" || author === "" || isbn === "") {
        //error alert

        ui.showAlert('Please fill in all fields', 'error')

    } else {
        //add Book to list
        ui.addBookToList(book)

        //clear fields
        ui.clearFields();

        ui.showAlert('Book added', 'success')
    }



    e.preventDefault();
})


//Event Listener Delete
document.getElementById('book-list').addEventListener('click', function (e) {
    // instantie new UI()
    const ui = new UI()

    //delete book
    ui.deleteBook(e.target);

    //show alert
    ui.showAlert('Book deleted', 'success')

    e.preventDefault();
})