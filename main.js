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
var inputs = document.querySelectorAll("input");
var errorMessages = document.querySelectorAll(".error-message")

// GLOBAL VARIABLES
var currentActivity;
var savedActivities = [];

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

window.addEventListener("load", displayActivityCards);

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
  clearInputs();
  clearErrorMessages();
  };

function clearInputs() {
  for (i = 0; i < inputs.length; i ++) {
    inputs[i].value = null;
  };
};

  function clearErrorMessages() {
    for (i = 0; i < errorMessages.length; i++){
      addErrorHidden(errorMessages[i]);
    };
  };

function logActivity() {
  addHidden(timerViewPage);
  addHidden(noActivitiesText);
  removeHidden(completedViewPage);
  pageTitle.innerText = "Completed Activity";
  currentActivity.saveToStorage();
  displayActivityCards();
};

function createCardCategory(category) {
  return category.charAt(0).toUpperCase() + category.substr(1);
};

function displayActivityCards() {
  activityCardSection.innerHTML = ``;
  savedActivities = [];
  getStoredActivities();

  sortList(savedActivities);
  for (var i = 0; i < savedActivities.length; i++) {
    addToActivityList(savedActivities[i]);
  };

  if (savedActivities.length > 0) {
    addHidden(noActivitiesText);
  };
};

function getStoredActivities() {
  for (var i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i).includes("activity")) {
      var stringifiedActivity = localStorage.getItem(`${localStorage.key(i)}`)
      var parsedActivity = JSON.parse(stringifiedActivity);
      savedActivities.push(parsedActivity);
    };
  };
};

function sortList(list) {
  for (i = 0; i < savedActivities.length;i++){
    savedActivities[i].id = savedActivities[i].id.substring(8);
  };
  savedActivities = savedActivities.sort(function(a, b) {
    return b.id - a.id;
  });
};

function addToActivityList(activity) {
  activityCardSection.innerHTML += `
  <div class="activity-card">
    <div class="activity-details">
      <p class="activity-card-label">${createCardCategory(activity.category)}</p>
      <p class="activity-card-time">${activity.minutes} MIN ${activity.seconds} SECONDS</p>
      <p class="activity-card-description">${activity.description}</p>
    </div>
    <div class="activity-icon-div">
      <div class="activity-icon" id ="${activity.id}">
      </div>
    </div>
  </div>
  `;
  var activityCardIcon = document.getElementById(`${activity.id}`);
  activityCardIcon.classList.add(`${activity.category}-box`);
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
  if (!getActivatedCategory()) {
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
