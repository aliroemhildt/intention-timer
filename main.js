//  QUERY SELECTORS
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
var goalError = document.querySelector(".error-goal");
var minutesError = document.querySelector(".error-minutes");
var secondsError = document.querySelector(".error-seconds");
var buttonError = document.querySelector(".error-button");
var startCompleteButton = document.querySelector(".start-complete-button");
var activityTitle = document.querySelector(".title");

// GLOBAL VARIABLES
var categoryElements = {study:{button: studyButton, image: studyImage},
                        meditate:{button:meditateButton, image: meditateImage},
                        exercise:{button:exerciseButton, image:exerciseImage}};
var currentActivatedCategory = "";
var currentActivity;
var startTime;
var updateTimer;

// EVENT LISTENERS
studyButton.addEventListener("click", function(){
  setCategory("study")
});

meditateButton.addEventListener("click", function(){
  setCategory("meditate")
});

exerciseButton.addEventListener("click", function(){
  setCategory("exercise")
});

startActivityButton.addEventListener("click", function(event) {
  event.preventDefault();
  startActivity();
});

startCompleteButton.addEventListener("click", startTimer);

startCompleteButton.addEventListener("click", pressStart);

// FUNCTIONS
function setCategory(selectedCategory) {
  if (currentActivatedCategory !== "") {
    deactivateCategory(currentActivatedCategory);
  };
  activateCategory(selectedCategory);
  currentActivatedCategory = selectedCategory;
};

function deactivateCategory(category){
  var currCategory = categoryElements[category];
  currCategory.button.classList.remove(`${category}-button-clicked`);
  currCategory.image.src = `assets/${category}.svg`;
};

function activateCategory(category){
  var currCategory = categoryElements[category];
  console.log(category, currCategory);
  currCategory.button.classList.add(`${category}-button-clicked`);
  currCategory.image.src = `assets/${category}-active.svg`;
};

function addHidden(element) {
  element.classList.add('hidden');
};

function addErrorHidden(element) {
  element.classList.add('error-hidden');
};

function removeHidden(element) {
  element.classList.remove('hidden');
};

function removeErrorHidden(element) {
  element.classList.remove('error-hidden');
};

function startActivity() {
  if (currentActivatedCategory !== '' && goalInput.value !== '' && minsInput.value !== '' && secsInput.value !== '') {
    addHidden(chooseCatViewPage);
    removeHidden(timerViewPage);
    currentActivity = new Activity(currentActivatedCategory, goalInput.value, parseInt(minsInput.value), parseInt(secsInput.value));
    timerText.innerText = `${currentActivity.minutes}:${currentActivity.seconds.toString().padStart(2, "0")}`;
    activityName.innerText = `${goalInput.value}`;
    changeButtonBorder();
    activityTitle.innerText = "Current Activity";
  } else {
    showInputError();
  };
};

function showInputError() {
  var inputElements = [goalInput, minsInput, secsInput];
  var errorElements = [goalError, minutesError, secondsError];
  for (var i = 0; i < inputElements.length; i++) {
    if (inputElements[i].value === ''){
      removeErrorHidden(errorElements[i]);
    } else {
      addErrorHidden(errorElements[i])
    }
  };
  if (!currentActivatedCategory) {
    removeErrorHidden(buttonError);
  } else {
    addErrorHidden(buttonError);
  };
};

function changeButtonBorder() {
  console.log(currentActivity);
  var activity = currentActivity.category;
  startCompleteButton.classList.add(`${activity}-border`);
};

function pressStart() {
  startTime = Date.now();
  updateTimer = setInterval(startTimer, 1000);
  startCompleteButton.innerText = '';
};

function startTimer() {
  var currentTime = Date.now();
  var inputTimeMilliseconds = (currentActivity.minutes * 60 * 1000) + (currentActivity.seconds * 1000);
  var elapsedTimeMilliseconds = Math.abs(currentTime-startTime);
  var timerUpdate = inputTimeMilliseconds - elapsedTimeMilliseconds;
  var minutes = Math.floor(timerUpdate % (1000 * 60 * 60) / (1000 * 60));
  var seconds = Math.floor((timerUpdate % (1000 * 60)) / 1000);
  console.log(minutes);
  console.log(seconds);
  displayTime();
  if (timerUpdate === -1) {
    clearInterval(updateTimer);
    timerText.innerText = "00:00";
    startCompleteButton.innerText = 'COMPLETE';
    window.alert("Time's up!");
  };
};

displayTime() {
  if (minutes < 10 && seconds > 10){
    timerText.innerText = `${minutes.toString().padStart(2,"0")}:${seconds.toString()}`;
    console.log(timerText);
  } else if (minutes < 10 && seconds < 10) {
    timerText.innerText = `${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`
    console.log(timerText);
  } else {
    timerText.innerText = `${minutes.toString()}:${seconds.toString()}`;
    console.log(timerText);
  };
}
