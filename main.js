// Category Buttons
// 1. add EventListener to all Buttons
//    - when clicked: border color changes, image changes to colored version
// function will add new class to button (specific class for each button)
//   - reassign innerHTML with new img url
var studyButton = document.querySelector("#study");
var meditateButton = document.querySelector("#meditate");
var exerciseButton = document.querySelector("#exercise");
var categorySection = document.querySelector(".category-button-section")
var studyImage = document.querySelector("#study-image");
var meditateImage = document.querySelector("#meditate-image");
var exerciseImage = document.querySelector("#exercise-image");

var studyButtonState = false;
var meditateButtonState = false;
var exerciseButtonState = false;

categorySection.addEventListener("click", changeButtonColor);

function changeButtonColor(event) {
  var selectedButton = event.target;
  if (selectedButton.id === "study") {
      toggleStudyButton();
      meditateButtonState = false;
      exerciseButtonState = false;
  };
  if (selectedButton.id == "meditate") {
    toggleMeditateButton();
    studyButtonState = false;
    exerciseButtonState = false;
  };
  if (selectedButton.id === "exercise") {
    toggleExerciseButton();
    var studyButtonState = false;
    var meditateButtonState = false;
  };
};

function toggleStudyButton() {
  if (studyButtonState) {
    studyButton.classList.remove("study-button-clicked");
    studyImage.src = "assets/study.svg";
    studyButtonState = false;
  } else {
    studyButton.classList.add("study-button-clicked");
    studyImage.src = "assets/study-active.svg";
    studyButtonState = true;
    if (meditateButtonState) {
      toggleMeditateButton();
    };
    if (exerciseButtonState) {
      toggleExerciseButton();
    };
  };
};

function toggleMeditateButton() {
  if (meditateButtonState) {
    meditateButton.classList.remove("meditate-button-clicked");
    meditateImage.src = "assets/meditate.svg";
    meditateButtonState = false;
  } else {
    meditateButton.classList.add("meditate-button-clicked");
    meditateImage.src = "assets/meditate-active.svg";
    meditateButtonState = true;
    if (studyButtonState) {
      toggleStudyButton();
    };
    if (exerciseButtonState) {
      toggleExerciseButton();
    };
  };
};

function toggleExerciseButton() {
  if (exerciseButtonState) {
    exerciseButton.classList.remove("exercise-button-clicked");
    exerciseImage.src = "assets/exercise.svg";
    exerciseButtonState = false;
  } else {
    exerciseButton.classList.add("exercise-button-clicked");
    exerciseImage.src = "assets/exercise-active.svg";
    exerciseButtonState = true;
    if (studyButtonState) {
      toggleStudyButton();
    };
    if (meditateButtonState) {
      toggleMeditateButton();
    };
  };
};
