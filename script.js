let Library = [];

const addBookBtn = document.getElementById("addBookBtn");

const form = document.querySelector(".form");
const modal = document.getElementById("modal");

const submitBtn = document.getElementById("submit-btn");
const cancelBtn = document.getElementById("cancel-btn");

const bookTitle = document.querySelector("[name='title']");
const bookAuthor = document.querySelector("[name='author']");
const formPages = document.querySelector("[name='pages']");
const formIsRead = document.querySelector("[name='title']");

const readStateBtns = document.querySelectorAll(".read-state");
const removeBtns = document.querySelectorAll(".remove-btn");

const main = document.querySelector("main");

let idCount = 0;

// show modal
addBookBtn.addEventListener("click", () => {
    modal.showModal();
});

// cancel button
cancelBtn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.close();
    form.reset();
});

// submit button
form.addEventListener("submit", (event) => {
    event.preventDefault();
    createBook();
    modal.close();
    form.reset();
});

function createBook() {
    addBookToLibrary();

    // container
    let container = document.createElement("div");

    let book = document.createElement("div");
    // data-attribute that corresponds to the index of the library array.
    container.dataset.idNo = idCount;

    container.classList.add("container");
    book.classList.add("book");
    container.appendChild(book);

    let front = document.createElement("div");
    front.classList.add("front");
    book.appendChild(front);

    let cover = document.createElement("div");
    cover.classList.add("cover");
    front.appendChild(cover);

    let numUp = document.createElement("p");
    numUp.classList.add("num-up");
    numUp.textContent = Library[container.dataset.idNo].title; // variable
    cover.appendChild(numUp);
    let author = document.createElement("p");
    author.textContent = Library[container.dataset.idNo].author; //variable
    author.classList.add("author");
    cover.appendChild(author);

    let leftSide = document.createElement("div");
    leftSide.classList.add("left-side");
    book.appendChild(leftSide);

    let h2s = document.createElement("h2");
    leftSide.appendChild(h2s);

    let span1 = document.createElement("span");
    span1.textContent = Library[container.dataset.idNo].author; //variable
    h2s.appendChild(span1);
    let span2 = document.createElement("span");
    span2.textContent = Library[container.dataset.idNo].title; //variable
    h2s.appendChild(span2);

    // buttons
    let readButtons = document.createElement("div");
    readButtons.classList.add("buttons");
    book.appendChild(readButtons);

    let button1 = document.createElement("button");
    button1.textContent = Library[container.dataset.idNo].read ? "Read" : "Not Read"; // variable
    button1.classList.add("read-state");
    button1.style.backgroundColor = Library[container.dataset.idNo].read ? "#f9fbfa" : "#ff9c9c";
    button1.dataset.idNo = idCount;
    readButtons.appendChild(button1);
    let button2 = document.createElement("button");
    button2.classList.add("remove-btn");
    button2.dataset.idNo = idCount;
    button2.textContent = "Remove";
    readButtons.appendChild(button2);
    let pagesNumber = document.createElement("div");
    pagesNumber.textContent = `${Library[container.dataset.idNo].pages.toLocaleString("en", { useGrouping: true })} ${
        Library[container.dataset.idNo].pages > 1 ? "Pages" : "Page"
    }`; //variable
    pagesNumber.classList.add("pages-div");
    readButtons.appendChild(pagesNumber);

    container.appendChild(readButtons);

    main.appendChild(container);

    idCount++;
}

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = +pages;
    this.read = read;
}

function addBookToLibrary() {
    title = bookTitle.value;
    author = bookAuthor.value;
    pages = formPages.value;
    read = formIsRead.checked;

    let newBook = new Book(title, author, pages, read);

    Library.push(newBook);
}

// remove button
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
        console.log("works");
        let elementToRemove = document.querySelector(`main > [data-id-no="${e.target.dataset.idNo}"]`);
        elementToRemove.remove();
    }
});

// read button

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("read-state") && e.target.textContent.toUpperCase() === "READ") {
        e.target.textContent = "NOT READ";
        e.target.style.backgroundColor = "#ff9c9c";
        Library[e.target.dataset.idNo].read = false;
    } else if (e.target.classList.contains("read-state") && e.target.textContent.toUpperCase() === "NOT READ") {
        e.target.textContent = "READ";
        Library[e.target.dataset.idNo].read = true;
        e.target.style.backgroundColor = "#f9fbfa";
    }
});

function showBooks() {
    for (let book in Library) {
        console.log(book.title);
    }
}
