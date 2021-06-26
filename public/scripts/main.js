
import Modal from './modal.js';

const modal = Modal();


const readButtons = document.querySelectorAll(".actions a.read");
const delButton = document.querySelectorAll(".actions .delete");
const modalTitle = document.querySelector('.modal h2');
const modalText = document.querySelector('.modal p');
const modalButton = document.querySelector('.modal button');


new ClipboardJS('.button.outlined.clipboard');





readButtons.forEach(button =>  {

    button.addEventListener("click", handleClick);



})

delButton.forEach(button => {

    button.addEventListener("click", (event) => handleClick(event, false))

})

function handleClick(event, check = true) {

    event.preventDefault();

    const slug = check ? "read" : "delete"

    const roomID = document.querySelector('#room-id').dataset.id

    const questionID = event.target.dataset.id
    

    const form = document.querySelector('.modal form');
    form.setAttribute("action", `/question/${roomID}/${questionID}/${slug}`);

    modalTitle.innerHTML = check ? "Mark as read" : "Delete question";
    modalText.innerHTML = check ? "Do you want to mark as read?" : "Are you sure you want to delete?";
    modalButton.innerHTML = check ? "Read" : "Delete"
    modalButton.classList.add(check ? "button" : "red");
    check ? modalButton.classList.remove("red") : modalButton.classList.add("red");

    modal.open();

}




