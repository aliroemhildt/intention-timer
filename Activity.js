class Activity {
  constructor(category, description, minutes, seconds) {
    this.category = category;
    this.description = description;
    this.minutes = minutes;
    this.seconds = seconds;
    this.completed = false;
    this.id = 'activity'+Date.now();
  };

  startTimer() {
    startTime = Date.now();
    updateTimer();
  };

  markComplete() {
    this.completed = true;
  };

  saveToStorage() {
    var stringifiedActivity = JSON.stringify(this);
    localStorage.setItem(`${this.id}`, stringifiedActivity);
  };
};
