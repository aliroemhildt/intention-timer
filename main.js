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
var pageTitle = document.querySelector(".title");
var logActivityButton = document.querySelector(".log-activity-button");
var noActivitiesText = document.querySelector(".no-activities-text");
var activityCardSection = document.querySelector(".activities-list");
var createNewActivityButton = document.querySelector(".create-new-activity-button");

// GLOBAL VARIABLES
var currentActivity;

// EVENT LISTENERS
studyButton.addEventListener("click", function() {
  setCategory("study")
});

meditateButton.addEventListener("click", function() {
  setCategory("meditate")
});

exerciseButton.addEventListener("click", function() {
  setCategory("exercise")
});

startActivityButton.addEventListener("click", function(event) {
  event.preventDefault();
  startActivity();
});

startCompleteButton.addEventListener("click", callStartTimer);

logActivityButton.addEventListener("click", logActivity);

createNewActivityButton.addEventListener("click", returnHome);

window.addEventListener("load", createActivityCard);

// FUNCTIONS
function getActivatedCategory() {
  var categoryElement = document.querySelector(".activated-category");
  if (!categoryElement) {
    return "";
  };
  return categoryElement.id;
};

function returnHome() {
  addHidden(completedViewPage);
  removeHidden(chooseCatViewPage);
  deactivateCategory(getActivatedCategory());
  startCompleteButton.classList.remove(`${currentActivity.category}-border`);
  pageTitle.innerText = "New Activity";
  goalInput.value = null;
  secsInput.value = null;
  minsInput.value = null;
};

function logActivity() {
  addHidden(timerViewPage);
  addHidden(noActivitiesText);
  removeHidden(completedViewPage);
  pageTitle.innerText = "Completed Activity";
  currentActivity.saveToStorage();
  createActivityCard();
};

function createCardCategory(category) {
  return category.charAt(0).toUpperCase() + category.substr(1);
};

function createActivityCard() {
  activityCardSection.innerHTML = ``;
  for (var i = 0; i < localStorage.length; i++) {
    var stringifiedActivity = localStorage.getItem(`${localStorage.key(i)}`)
    var parsedActivity = JSON.parse(stringifiedActivity);
    activityCardSection.innerHTML += `
    <div class="activity-card">
      <div class="activity-details">
        <p class="activity-card-label">${createCardCategory(parsedActivity.category)}</p>
        <p class="activity-card-time">${parsedActivity.minutes} MIN ${parsedActivity.seconds} SECONDS</p>
        <p class="activity-card-description">${parsedActivity.description}</p>
      </div>
      <div class="activity-icon-div">
        <div class="activity-icon" id ="${parsedActivity.id}">
        </div>
      </div>
    </div>
    `;
    var activityCardIcon = document.getElementById(`${parsedActivity.id}`);
    activityCardIcon.classList.add(`${parsedActivity.category}-box`);
    addHidden(noActivitiesText);
  };
};

function setCategory(selectedCategory) {
  var currentActivatedCategory = getActivatedCategory();
  if (currentActivatedCategory !== "") {
    deactivateCategory(currentActivatedCategory);
  };
  activateCategory(selectedCategory);
};

function getCategoryElements(category) {
  if (category === "study") {
    return {button: studyButton, image: studyImage};
  } else if (category === "meditate") {
    return {button: meditateButton, image: meditateImage};
  } else if (category === "exercise") {
    return {button: exerciseButton, image: exerciseImage};
  };
};

function deactivateCategory(category) {
  var currCategory = getCategoryElements(category);
  currCategory.button.classList.remove(`${category}-button-clicked`);
  currCategory.button.classList.remove("activated-category");
  currCategory.image.src = `assets/${category}.svg`;
};

function activateCategory(category) {
  var currCategory = getCategoryElements(category);
  currCategory.button.classList.add(`${category}-button-clicked`);
  currCategory.button.classList.add("activated-category");
  currCategory.image.src = `assets/${category}-active.svg`;
};

function addHidden(element) {
  element.classList.add("hidden");
};

function addErrorHidden(element) {
  element.classList.add("error-hidden");
};

function removeHidden(element) {
  element.classList.remove("hidden");
};

function removeErrorHidden(element) {
  element.classList.remove("error-hidden");
};

function startActivity() {
  if (getActivatedCategory() !== "" && goalInput.value !== "" && minsInput.value !== "" && secsInput.value !== "") {
    addHidden(chooseCatViewPage);
    removeHidden(timerViewPage);
    addHidden(logActivityButton);
    currentActivity = new Activity(getActivatedCategory(), goalInput.value, parseInt(minsInput.value), parseInt(secsInput.value));
    renderTimer(currentActivity.minutes, currentActivity.seconds);
    activityName.innerText = `${goalInput.value}`;
    changeButtonBorder();
    pageTitle.innerText = "Current Activity";
    startCompleteButton.innerText = "START";
    startCompleteButton.disabled = false;
  } else {
    showInputError();
  };
};

function showInputError() {
  var inputElements = [goalInput, minsInput, secsInput];
  var errorElements = [goalError, minutesError, secondsError];
  for (var i = 0; i < inputElements.length; i++) {
    if (inputElements[i].value === "") {
      removeErrorHidden(errorElements[i]);
    } else {
      addErrorHidden(errorElements[i])
    }
  };
  if (getActivatedCategory() === "") {
    removeErrorHidden(buttonError);
  } else {
    addErrorHidden(buttonError);
  };
};

function changeButtonBorder() {
  var activity = currentActivity.category;
  startCompleteButton.classList.add(`${activity}-border`);
};

function changeActivityCardColor() {
  var activity = currentActivity.category;
};

function callStartTimer() {
  var startTime = Date.now();
  currentActivity.startTimer(renderTimer, onTimerComplete);
  startCompleteButton.disabled = true;
  startCompleteButton.innerText = "";
};

function onTimerComplete() {
  startCompleteButton.innerText = "COMPLETE!";
  removeHidden(logActivityButton);
  currentActivity.markComplete();
};

function renderTimer(minutes, seconds) {
  timerText.innerText = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};
