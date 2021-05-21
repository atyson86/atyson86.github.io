// https://openprocessing.org/sketch/143842
// https://p5js.org/examples/simulate-particle-system.html

let particles = [];
let sliderR;
let sliderG;
let sliderB;
let sizeSlide;

function setup() {
    var canvas = createCanvas(1550, 600);
    background(255);
    canvas.parent('canvasForHTML');
    sliderR = createSlider(0, 255, 127);
    sliderG = createSlider(0, 255, 127);
    sliderB = createSlider(0, 255, 127);
    sizeSlide = createSlider(0, 100, 50);
  }

function mouseDragged() {
  let r = sliderR.value();
  let g = sliderG.value();
  let b = sliderB.value();
  let life = sizeSlide.value();
    particles.push(new Particle(mouseX, mouseY, r, g, b, life));
  }
  
function draw() {
    for (let i = 0; i < particles.length; i++) {
      p = particles[i];
      if (p.isDead()) {
       particles.splice(0,1);
      } else {
        p.run();
      }
    }
  }

class Particle {
  constructor(x, y, r, g, b, life) {
    // location = createVector(x, y);
    var randDegrees = random(360);
    var vel = createVector(cos(radians(randDegrees), sin(radians(randDegrees))));

    this.acceleration = createVector(0, random(0, 0.2));
    this.velocity = vel.mult(random(5));
    this.lifespan = random(life);
    this.color = color(random(r), random(g), random(b));
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
    var noiseValue = (noise((this.loc.x) * noiseScale, (this.loc.y) * noiseScale) * 24);

    var dir = createVector(cos(noiseValue), sin(noiseValue));

    this.color;

    this.velocity.add(dir);
    this.loc.add(this.velocity);
    this.lifespan -= 2;
  }
  // Method to display
  display() {
    var rectSize = random(15);
    translate (width, height);
    rotate(PI);
    strokeWeight(this.lifespan + 1.5);
    stroke(0, (this.lifespan * 120));
    ellipse(this.loc.x, this.loc.y, rectSize, rectSize);


    strokeWeight(this.lifespan);
    stroke(this.color);
    ellipse(this.loc.x, this.loc.y, rectSize, rectSize);
  }
  // Is the particle still useful?
  isDead() {
    return this.lifespan < 0;
  }
}