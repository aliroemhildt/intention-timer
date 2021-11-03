class Activity {
  constructor(category, desc, mins, secs) {
    this.category = category;
    this.desc = desc;
    this.mins = mins;
    this.seconds = secs;
    this.completed = false;
    this.id = Date.now();
  };

  startTimer() {};

  markComplete() {
    this.completed = true;
  };

  saveToStorage() {};
};
