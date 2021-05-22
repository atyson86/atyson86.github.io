// https://openprocessing.org/sketch/143842
// https://p5js.org/examples/simulate-particle-system.html


/**
 * Global Params
 */
let particles = [];
let sliderR;
let sliderG;
let sliderB;
let sizeSlide;

/**
 * Creates a Canvas and sliders that control the color and lifespan of particles
 */
function setup() {
    var canvas = createCanvas(1550, 600);
    background(255);
    canvas.parent('canvasForHTML');
    sliderR = createSlider(0, 255, 127);
    sliderG = createSlider(0, 255, 127);
    sliderB = createSlider(0, 255, 127);
    sizeSlide = createSlider(0, 100, 50);
  }

/**
 * Fills the particles array with particles as the mouse is dragged
 */
function mouseDragged() {
  let r = sliderR.value(); //adjusts the r value depending on the slider position
  let g = sliderG.value(); //adjusts the g value depending on the slider position
  let b = sliderB.value(); //adjusts the b value depending on the slider position
  let life = sizeSlide.value(); //adjusts the lifespan of a partcile depending on slider position
    particles.push(new Particle(mouseX, mouseY, r, g, b, life));
  }

  /**
   * Clears the screen if you press "x"
   */
function keyPressed() {
  if (key == 'x') {
    background(255);
    }
  }
  
/**
 * Draws each of the particles on the screen 
 */
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

/**
 * The particle class is used to create a single particle with an acceleration, velocity,
 * lifespan, and color
 */
class Particle {

  /**
   * Constructor for a particle
   * @param {float} x the x coordinate position for the particle
   * @param {float} y the y coordinate position for th eparticle
   * @param {float} r the maximum r value used to create the color of the particle
   * @param {float} g the maximum g value used to create the color of the particle
   * @param {float} b the maximum b value used to create the color of the particle
   * @param {float} life the maximum lifespan of the particle
   */
  constructor(x, y, r, g, b, life) {
    var randDegrees = random(360);
    var vel = createVector(cos(radians(randDegrees), sin(radians(randDegrees))));

    this.acceleration = createVector(0, random(0, 0.2));
    this.velocity = vel.mult(random(5)); //multiply the velocity vector by a ranom number between 1 and 5
    this.lifespan = life;
    this.color = color(random(r), random(g), random(b));
    this.weightRange = random(3, 50);
    this.location = createVector(x, y);
    this.x = x;
    this.y = y;
  }
  run() {
    this.update();
    this.display();
  }

  /**
   * Updates a particle's velocity, loction, color, and lifespan
   */
  update() {

    //noise is a random sequence generator producing a more naturally ordered,
    //harmonic succession of numbers compared to the standard random() function
    var noiseScale = 0.2;
    //24 is arbitrary, I just liked the result
    var noiseValue = (noise((this.location.x) * noiseScale, (this.location.y) * noiseScale) * 24);
  
    var dir = createVector(cos(noiseValue), sin(noiseValue));

    this.color;

    this.velocity.add(dir);
    this.location.add(this.velocity);
    this.lifespan -= 2;
  }
  
  /**
   * Displays a particle and mirrors it!
   */
  display() {
    var ellipseSize = random(this.lifespan);
    push();
    translate (width, height);
    rotate(PI);
    strokeWeight(this.lifespan + 1.5);
    stroke(0, (this.lifespan * 120));
    ellipse(this.location.x, this.location.y, ellipseSize, ellipseSize);


    strokeWeight(this.lifespan);
    stroke(this.color);
    ellipse(this.location.x, this.location.y, ellipseSize, ellipseSize);
    pop();

    push();
    strokeWeight(this.lifespan + 1.5);
    stroke(0, (this.lifespan * 120));
    ellipse(this.location.x, this.location.y, ellipseSize, ellipseSize);


    strokeWeight(this.lifespan);
    stroke(this.color);
    ellipse(this.location.x, this.location.y, ellipseSize, ellipseSize);
    pop();
  }
  /**
   * 
   * @returns boolean "true" if lifespan is < 0 and boolean "false" if lifespan is > 0
   */
  isDead() {
    return this.lifespan < 0;
  }
}