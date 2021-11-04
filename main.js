
var studyButton = document.querySelector("#study");
var meditateButton = document.querySelector("#meditate");
var exerciseButton = document.querySelector("#exercise");
var categorySection = document.querySelector(".category-button-section")
var studyImage = document.querySelector("#study-image");
var meditateImage = document.querySelector("#meditate-image");
var exerciseImage = document.querySelector("#exercise-image");
var startActivityButton = document.querySelector(".start-activity-button");
var timerViewPage = document.querySelector(".timer-view");
var chooseCatViewPage = document.querySelector(".choose-category-view");
var completedViewPage = document.querySelector(".completed-view");
var goalInput = document.querySelector(".goal-input");
var minsInput = document.querySelector(".mins-input");
var secsInput = document.querySelector(".secs-input");
var timerText = document.querySelector(".timer-text");
var activityName = document.querySelector(".activity-name");

var categoryElements = {study:{button: studyButton, image: studyImage},
                        meditate:{button:meditateButton, image: meditateImage},
                        exercise:{button:exerciseButton, image:exerciseImage}};

// var studyButtonState = false;
// var meditateButtonState = false;
// var exerciseButtonState = false;

var currentActivatedCategory = "";
var currentActivity;

// categorySection.addEventListener("click", changeButtonColor);
studyButton.addEventListener("click", function(){
  setCategory("study")
});
meditateButton.addEventListener("click", function(){
  setCategory("meditate")
});
exerciseButton.addEventListener("click", function(){
  setCategory("exercise")
});

// function changeButtonColor(event) {
//   // var selectedButton = event.target;
//   // if (selectedButton.id === "study") {
//   //     toggleStudyButton();
//   //     meditateButtonState = false;
//   //     exerciseButtonState = false;
//   // };
//   // if (selectedButton.id == "meditate") {
//   //   toggleMeditateButton();
//   //   studyButtonState = false;
//   //   exerciseButtonState = false;
//   // };
//   // if (selectedButton.id === "exercise") {
//   //   toggleExerciseButton();
//   //   var studyButtonState = false;
//   //   var meditateButtonState = false;
//   // };
//   var category = event.target.id
//   if (category === "study" || category === "meditate" || category === "exercise") {
//   setCategory(event.target.id);
//   }
// };

function setCategory(selectedCategory) {
  if (currentActivatedCategory !== "") {
    deactivateCategory(currentActivatedCategory);
  }
  activateCategory(selectedCategory);
  currentActivatedCategory = selectedCategory;
}

function deactivateCategory(category){
  var currCategory = categoryElements[category];
  currCategory.button.classList.remove(`${category}-button-clicked`);
  currCategory.image.src = `assets/${category}.svg`;
}

function activateCategory(category){
  var currCategory = categoryElements[category];
  console.log(category, currCategory);
  currCategory.button.classList.add(`${category}-button-clicked`);
  currCategory.image.src = `assets/${category}-active.svg`;
}

// function toggleStudyButton() {
//   if (studyButtonState) {
//     studyButton.classList.remove("study-button-clicked");
//     studyImage.src = "assets/study.svg";
//     studyButtonState = false;
//   } else {
//     studyButton.classList.add("study-button-clicked");
//     studyImage.src = "assets/study-active.svg";
//     studyButtonState = true;
//     if (meditateButtonState) {
//       toggleMeditateButton();
//     };
//     if (exerciseButtonState) {
//       toggleExerciseButton();
//     };
//   };
// };
//
// function toggleMeditateButton() {
//   if (meditateButtonState) {
//     meditateButton.classList.remove("meditate-button-clicked");
//     meditateImage.src = "assets/meditate.svg";
//     meditateButtonState = false;
//   } else {
//     meditateButton.classList.add("meditate-button-clicked");
//     meditateImage.src = "assets/meditate-active.svg";
//     meditateButtonState = true;
//     if (studyButtonState) {
//       toggleStudyButton();
//     };
//     if (exerciseButtonState) {
//       toggleExerciseButton();
//     };
//   };
// };
//
// function toggleExerciseButton() {
//   if (exerciseButtonState) {
//     exerciseButton.classList.remove("exercise-button-clicked");
//     exerciseImage.src = "assets/exercise.svg";
//     exerciseButtonState = false;
//   } else {
//     exerciseButton.classList.add("exercise-button-clicked");
//     exerciseImage.src = "assets/exercise-active.svg";
//     exerciseButtonState = true;
//     if (studyButtonState) {
//       toggleStudyButton();
//     };
//     if (meditateButtonState) {
//       toggleMeditateButton();
//     };
//   };
// };

function addHidden(element) {
  element.classList.add('hidden');
};

function removeHidden(element) {
  element.classList.remove('hidden');
};

function startActivity() {
  addHidden(chooseCatViewPage);
  removeHidden(timerViewPage);
  currentActivity = new Activity(currentActivatedCategory, goalInput.value, parseInt(minsInput.value), parseInt(secsInput.value));
  console.log(currentActivity);
  timerText.innerText = `${currentActivity.minutes}:${currentActivity.seconds.toString().padStart(2, "0")}`;
  activityName.innerText = `${goalInput.value}`;
}

startActivityButton.addEventListener("click", function(event) {
  event.preventDefault();
  startActivity();
});
