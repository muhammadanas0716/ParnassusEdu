// Get all the modals
var modals = document.querySelectorAll(".modal");

// Get all the buttons that open modals
var btns = document.querySelectorAll(".buttons a");

// Get all the <span> elements that close modals
var spans = document.querySelectorAll(".close");

// When the user clicks on a button, open the corresponding modal
btns.forEach((btn, index) => {
  btn.onclick = function (event) {
    event.preventDefault();
    modals[index].style.display = "block";
    setTimeout(() => {
      modals[index].style.opacity = "1";
    }, 10);
  };
});

// When the user clicks on <span> (x), close the modal
spans.forEach((span, index) => {
  span.onclick = function () {
    closeModal(modals[index]);
  };
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  modals.forEach((modal) => {
    if (event.target == modal) {
      closeModal(modal);
    }
  });
};

// Close modal with animation
function closeModal(modal) {
  modal.style.animation = "fadeOut 0.5s";
  modal.style.opacity = "0";
  setTimeout(() => {
    modal.style.display = "none";
    modal.style.animation = "";
  }, 500);
}
