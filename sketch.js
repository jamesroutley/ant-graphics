let ants = [];

let windowWidth = 862;
let windowHeight = 595;

let iterationsPerStep = 100;

let angleDiff = 70;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  ants = [
    new Ant(
      createVector(
        random(windowWidth * (1 / 6), windowWidth * (5 / 6)),
        random(windowHeight * (1 / 6), windowHeight * (5 / 6))
      ),
      random(180)
    ),
    new Ant(
      createVector(
        random(windowWidth * (1 / 6), windowWidth * (5 / 6)),
        random(windowHeight * (1 / 6), windowHeight * (5 / 6))
      ),
      random(180)
    ),
    new Ant(
      createVector(
        random(windowWidth * (1 / 6), windowWidth * (5 / 6)),
        random(windowHeight * (1 / 6), windowHeight * (5 / 6))
      ),
      random(180)
    )
  ];

  ants.forEach(a => {
    a.run();
  });
}

function draw() {}

function keyPressed() {
  if (keyCode === 80) {
    save("ants.png");
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

  run() {
    while (!this.stopped) {
      this.update();
      this.draw();
    }
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
