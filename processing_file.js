// https://openprocessing.org/sketch/143842
// https://p5js.org/examples/simulate-particle-system.html

let particles = [];

function setup() {
    var canvas = createCanvas(1550, 600);
    background(255);
    canvas.parent('canvasForHTML');
  }

function mouseDragged() {
    particles.push(new Particle(mouseX, mouseY));
  }
  
function draw() {
    for (let i = 0; i < particles.length; i++) {
      p = particles[i];
      if (p.isDead()) {
       particles.splice(0,1);
      } else {
        p.update();
        p.display();
      }
    }
  }

class Particle {
  constructor(x, y) {
    // location = createVector(x, y);
    var randDegrees = random(360);
    var vel = createVector(cos(radians(randDegrees), sin(radians(randDegrees))));

    this.acceleration = createVector(0, random(0.1));
    this.velocity = vel.mult(random(5));
    this.lifespan = random(50, 70);
    this.color = color(random(255), random(255), random(255));
    this.weightRange = random(3, 50);
    this.loc = createVector(x, y);
    this.x = x;
    this.y = y;
  }
  run() {
    this.update();
    this.display();
  }
  // Method to update position
  update() {
    var noiseScale = 0.2;
    var noiseValue = (noise((this.loc.x) * noiseScale, (this.loc.y) * noiseScale) * (2 * PI) * 4);

    var dir = createVector(cos(noiseValue), sin(noiseValue));

    this.velocity.add(dir);
    this.loc.add(this.velocity);
    this.lifespan -= 2;
  }
  // Method to display
  display() {
    strokeWeight(this.lifespan + 1.5);
    stroke(0, (this.lifespan * 120));
    point(this.loc.x, this.loc.y);

    strokeWeight(this.lifespan);
    stroke(this.color);
    point(this.loc.x, this.loc.y);
  }
  // Is the particle still useful?
  isDead() {
    return this.lifespan < 0;
  }
}
