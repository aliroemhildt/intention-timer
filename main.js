// Category Buttons
// 1. add EventListener to all Buttons
//    - when clicked: border color changes, image changes to colored version
// function will add new class to button (specific class for each button)
//   - reassign innerHTML with new img url
var studyButton = document.querySelector("#study");
var meditateButton = document.querySelector("#meditate");
var exerciseButton = document.querySelector("#exercise");
var categorySection = document.querySelector(".category-button-section")


categorySection.addEventListener("click", changeButtonColor);

function changeButtonColor(event) {
  var selectedButton = event.target;
  changeBorderColor(selectedButton);
};

// need to refactor this, could probably use a for loop
function changeBorderColor(element) {
  if (element.id === "study") {
    element.classList.add("study-button-clicked");
    element.innerHTML = `<img src="assets/study-active.svg" alt="lightbulb over book" id="image"><br>Study`;
    meditateButton.classList.remove("meditate-button-clicked");
    meditateButton.innerHTML = `<img src="assets/meditate.svg" alt="flower" id="image"><br>Meditate`;
    exerciseButton.classList.remove("exercise-button-clicked");
    exerciseButton.innerHTML = `<img src="assets/exercise.svg" alt="tennis shoe" id="image"><br>Exercise`;
  } else if (element.id === "meditate") {
    element.classList.add("meditate-button-clicked");
    element.innerHTML = `<img src="assets/meditate-active.svg" alt="flower" id="image"><br>Meditate`;
    studyButton.classList.remove("study-button-clicked");
    studyButton.innerHTML = `<img src="assets/study.svg" alt="lightbulb over book" id="image"><br>Study`;
    exerciseButton.classList.remove("exercise-button-clicked");
    exerciseButton.innerHTML = `<img src="assets/exercise.svg" alt="tennis shoe" id="image"><br>Exercise`;
  } else if (element.id === "exercise") {
    element.classList.add("exercise-button-clicked")
    element.innerHTML = `<img src="assets/exercise-active.svg" alt="tennis shoe" id="image"><br>Exercise`;
    studyButton.classList.remove("study-button-clicked");
    studyButton.innerHTML = `<img src="assets/study.svg" alt="lightbulb over book" id="image"><br>Study`;
    meditateButton.classList.remove("meditate-button-clicked");
    meditateButton.innerHTML = `<img src="assets/meditate.svg" alt="flower" id="image"><br>Meditate`;
  };
};
