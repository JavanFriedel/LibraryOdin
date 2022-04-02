import { qsa, qs, createElement } from './helperFunctions/domUtils.js';

let myLibrary = [];

class Book {
  constructor(author, title, numPages, readStatus) {
    this.author = author;
    this.title = title;
    this.numPages = numPages;
    this.readStatus = readStatus;
  }
}

function addBooktoLibrary(author, title, numPages, readStatus) {
  myLibrary.push(new Book(author, title, numPages, readStatus));
}

// there is most likely a better way to do this other than a full re-render, but this will do for now.
function reRenderContent() {
  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }

  generateDisplay();
}

function createCard(book) {
  const card = createElement('div', {
    class: 'card',
    dataset: { index: myLibrary.indexOf(book) },
  });

  // Title Box
  const titleBox = createElement('div', {
    class: 'cardTitle',
    text: book.title,
  });

  // Author Box
  const authorBox = createElement('div', {
    text: `Author: ${book.author}`,
  });

  // Page Length Box
  const numPagesBox = createElement('div', {
    text: `Page Length: ${book.numPages}`,
  });

  //check read status
  let readStatusMsg;
  if (book.readStatus) {
    readStatusMsg = 'Status: Read';
  } else {
    readStatusMsg = ' Status: Unread';
  }

  // Read Status Box
  const readStatusBox = createElement('div', {
    class: 'cardRead',
    text: readStatusMsg,
  });

  // Delete Button
  const deleteBtn = createElement('button', {
    text: 'Delete',
  });
  deleteBtn.addEventListener('click', () => {
    removeBook(card.dataset.index);
  });

  // Read Toggle Box
  const readStatusToggle = createElement('button', {
    text: 'Read Toggle',
  });
  readStatusToggle.addEventListener('click', () => {
    toggleRead(card.dataset.index);
  });

  //add child elements to parent
  card.append(
    titleBox,
    authorBox,
    numPagesBox,
    readStatusBox,
    deleteBtn,
    readStatusToggle
  );

  return card;
}

// generate display using create card method for each item in array
function generateDisplay() {
  for (let i = 0; i < myLibrary.length; i++) {
    let newCard = createCard(myLibrary[i]);
    content.appendChild(newCard);
  }
}

function addBook() {
  addBooktoLibrary(
    bookAuthor.value,
    bookTitle.value,
    bookLength.value,
    bookReadStatus.checked
  );

  bookTitle.value = '';
  bookAuthor.value = '';
  bookLength.value = '';
  bookReadStatus.checked = false;
}

function removeBook(index) {
  myLibrary.splice(index, 1);
  reRenderContent();
}

function toggleRead(index) {
  if (myLibrary[index].readStatus) {
    myLibrary[index].readStatus = false;
    reRenderContent();
    return;
  }
  myLibrary[index].readStatus = true;
  reRenderContent();
}

addBooktoLibrary('J.K.R', 'Harry Potter', 200, false);
addBooktoLibrary('Tolkien', 'Lord of the Rings', 500, false);
addBooktoLibrary('Miguel de Cervantes', 'Done Quixote', 400, false);
addBooktoLibrary('Miguel de Cervantes', 'Done Quixote', 400, false);
addBooktoLibrary('Miguel de Cervantes', 'Done Quixote', 400, false);

//content div
const content = document.getElementById('content');

//form container
const formContainer = document.getElementById('formContainer');

//form Inputs
const bookTitle = document.getElementById('bookTitle');
const bookAuthor = document.getElementById('bookAuthor');
const bookLength = document.getElementById('bookLength');
const bookReadStatus = document.getElementById('bookReadStatus');

generateDisplay();

// --- EVENT LISTENERS ---
document.getElementById('bookAddBtn').addEventListener('click', () => {
  formContainer.style.display = 'flex';
});

document.getElementById('formClose').addEventListener('click', () => {
  formContainer.style.display = 'none';
});

document.getElementById('submitBook').addEventListener('click', () => {
  addBook();
  formContainer.style.display = 'none';
  reRenderContent();
});

function validityCheck() {}

// TODO
//  - Add button to change read status
//  - Refactor re-render strategy for performance
//  -
