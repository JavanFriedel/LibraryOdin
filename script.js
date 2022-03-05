
let myLibrary = []

function Book(author, title, numPages, readStatus) {
  this.author = author;
  this.title = title;
  this.numPages = numPages;
  this.readStatus = readStatus;
}

function addBooktoLibrary(author, title, numPages, readStatus){
  myLibrary.push(new Book(author, title, numPages, readStatus))
}

// there is most likely a better way to do this other than a full re-render, but this will do for now. 
function reRenderContent (){
  while(content.firstChild){
    content.removeChild(content.firstChild)
  }

  generateDisplay();
}

function createCard (book) {
  //declare parent element
  let card = document.createElement('div');
  card.classList = "card";

  card.dataset.index = myLibrary.indexOf(book);

  //declare future children
  let titleBox = document.createElement('div');
  titleBox.classList = "cardTitle"

  let authorBox = document.createElement('div');
  let numPagesBox = document.createElement('div');

  let readStatusBox = document.createElement('div');
  readStatusBox.classList = "cardRead"

  let deleteBtn = document.createElement('button');
  deleteBtn.innerText = "Delete"

  deleteBtn.addEventListener('click', () => {
    removeBook(card.dataset.index);
  })

  let readStatusToggle = document.createElement('button');
  readStatusToggle.innerText = "Read Toggle"

  readStatusToggle.addEventListener('click', () => {
    toggleRead(card.dataset.index)
  })

  //fill children content
  titleBox.innerText = book.title;
  authorBox.innerText = `Author: ${book.author}`;
  numPagesBox.innerText = `Page Length: ${book.numPages}`;

  let readStatusMsg;

  if(book.readStatus){
    readStatusMsg = "Status: Read"
  }else {
    readStatusMsg = " Status: Unread"
  }
  readStatusBox.innerText = readStatusMsg;

  //add child elements to parent
  card.appendChild(titleBox);
  card.appendChild(authorBox);
  card.appendChild(numPagesBox);
  card.appendChild(readStatusBox);
  card.appendChild(deleteBtn);
  card.appendChild(readStatusToggle);
  
  return card;
}

// generate display using create card method for each item in array
function generateDisplay () {
  for (let i = 0; i < myLibrary.length; i++){
    
    let newCard = createCard(myLibrary[i])
    content.appendChild(newCard)
  }
}

function addBook () {  

  addBooktoLibrary(bookAuthor.value, bookTitle.value, bookLength.value, bookReadStatus.checked)

  bookTitle.value = '';
  bookAuthor.value = '';
  bookLength.value = '';
  bookReadStatus.checked = false;
}

function removeBook (index) {
  myLibrary.splice(index, 1);
  reRenderContent();
}

function toggleRead (index){
  if (myLibrary[index].readStatus){
    myLibrary[index].readStatus = false;
    reRenderContent();
    return
  }
  myLibrary[index].readStatus = true;
  reRenderContent();
}


  addBooktoLibrary('J.K.R', "Harry Potter", 200, false)
  addBooktoLibrary('Tolkien', "Lord of the Rings", 500, false)
  addBooktoLibrary('Miguel de Cervantes', "Done Quixote", 400, false)
  addBooktoLibrary('Miguel de Cervantes', "Done Quixote", 400, false)
  addBooktoLibrary('Miguel de Cervantes', "Done Quixote", 400, false)


//content div
const content = document.getElementById('content')

//form container
const formContainer = document.getElementById('formContainer')


const bookTitle = document.getElementById('bookTitle');
const bookAuthor = document.getElementById('bookAuthor');
const bookLength = document.getElementById('bookLength');
const bookReadStatus = document.getElementById('bookReadStatus');

generateDisplay()


// --- EVENT LISTENERS ---
document.getElementById('bookAddBtn').addEventListener('click', () => {
  formContainer.style.display = "flex";
})

document.getElementById('formClose').addEventListener('click', () => {
  formContainer.style.display = "none";
})

document.getElementById('submitBook').addEventListener('click', () => {
  addBook();
  formContainer.style.display = "none";
  reRenderContent();

})


// TODO
//  - Add button to change read status
//  - Refactor re-render strategy for performance
//  - 
