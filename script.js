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

  //declare future children
  let titleBox = document.createElement('div');
  titleBox.classList = "cardTitle"

  let authorBox = document.createElement('div');
  let numPagesBox = document.createElement('div');

  let readStatusBox = document.createElement('div');
  readStatusBox.classList = "cardRead"
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
  
  return card;
}

function generateDisplay () {
  for (let i = 0; i < myLibrary.length; i++){
    
    let newCard = createCard(myLibrary[i])
    content.appendChild(newCard)
  }
}

// Temp Book Entries
addBooktoLibrary('J.K.R', "Harry Potter", 200, false)
addBooktoLibrary('Tolkien', "Lord of the Rings", 500, false)
addBooktoLibrary('Miguel de Cervantes', "Done Quixote", 400, false)
addBooktoLibrary('Miguel de Cervantes', "Done Quixote", 400, false)
addBooktoLibrary('Miguel de Cervantes', "Done Quixote", 400, false)

const content = document.getElementById('content')
const formContainer = document.getElementById('formContainer')

generateDisplay()

document.getElementById('bookAddBtn').addEventListener('click', () => {
  formContainer.style.display = "flex";
})

document.getElementById('formClose').addEventListener('click', () => {
  formContainer.style.display = "none";
})



// console.log(myLibrary[0].title)

// TODO
//  - Create funciton to handle adding new books
//  - Create button to remove the book from the array
//  - Add button to change read status
//  - Refactor re-render strategy for performance
//  - 
