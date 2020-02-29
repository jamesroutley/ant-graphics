let ants = [];

let windowWidth = 1000;
let windowHeight = 800;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  ants = [
    new Ant(createVector(random(200, 800), random(200, 600)), random(180)),
    new Ant(createVector(random(200, 800), random(200, 600)), random(180)),
    new Ant(createVector(random(200, 800), random(200, 600)), random(180))
  ];
}

function draw() {
  for (let i = 0; i < 30; i++) {
    ants.forEach(ant => {
      ant.update();
    });

    ants.forEach(ant => {
      ant.draw();
    });
  }
}

class Ant {
  constructor(position, direction) {
    this.oldPosition;
    this.position = position;
    this.direction = direction;
    this.velocity = 2;

    this.stopped = false;
  }

  update() {
    this.oldPosition = this.position;
    this.position = this.getNextPosition();
    if (this.position.x < 0 || this.position.x > windowWidth) {
      this.stopped = true;
    }
    if (this.position.y < 0 || this.position.y > windowHeight) {
      this.stopped = true;
    }
  }

  getNextPosition() {
    let x = this.velocity * sin(this.direction);
    let y = this.velocity * cos(this.direction);
    let angleDiff = 90;
    this.direction += random(-angleDiff, angleDiff);

    return createVector(this.oldPosition.x + x, this.oldPosition.y + y);
  }

  draw() {
    if (this.stopped) {
      return;
    }
    line(
      this.oldPosition.x,
      this.oldPosition.y,
      this.position.x,
      this.position.y
    );
  }
}
