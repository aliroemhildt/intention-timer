class Activity {
  constructor(category, description, minutes, seconds) {
    this.category = category;
    this.description = description;
    this.minutes = minutes;
    this.seconds = seconds;
    this.completed = false;
    this.id = "activity" + Date.now();
  };

  startTimer(renderRemainingTime, onDone) {
    this.startTime = Date.now();
    function everyInterval() {
      var currentTime = Date.now();
      var elapsedTime = currentTime - this.startTime;
      var overAllDuration = (this.minutes * 60 + this.seconds) * 1000;
      var remainingDuration = overAllDuration - elapsedTime;
      if (remainingDuration <= 0) {
        onDone();
        clearInterval(this.intervalID);
        return;
      };
      var remainingSeconds = Math.floor(remainingDuration / 1000);
      var minutesComponent = Math.floor(remainingSeconds / 60);
      var secondsComponent = Math.floor(remainingSeconds % 60);
      renderRemainingTime(minutesComponent, secondsComponent);
    };
    this.intervalID = setInterval(everyInterval.bind(this), 100);
  };

  markComplete() {
    this.completed = true;
  };

  saveToStorage() {
    var stringifiedActivity = JSON.stringify(this);
    localStorage.setItem(`${this.id}`, stringifiedActivity);
  };
};
