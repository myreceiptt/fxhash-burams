let particles = [];

function setup() {
  createCanvas(800, 600);
  background(0); // Set background to black
  
  // Create initial particles
  for (let i = 0; i < 50; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
}

function draw() {
  // Move and display particles
  for (let particle of particles) {
    particle.update();
    particle.display();
  }
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(random(1, 3));
    this.acc = createVector(0, 0);
    this.history = [];
    this.maxHistory = 100;
    this.angle = random(TWO_PI);
    this.noiseOffset = createVector(random(1000), random(1000));
    this.color = color(random(255), random(255), random(255));
  }
  
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    
    // Add position to history
    let v = createVector(this.pos.x, this.pos.y);
    this.history.push(v);
    
    // Limit history length
    if (this.history.length > this.maxHistory) {
      this.history.splice(0, 1);
    }
    
    // Apply Perlin noise to the angle
    let angleChange = map(noise(this.noiseOffset.x, this.noiseOffset.y), 0, 1, -0.1, 0.1);
    this.angle += angleChange;
    this.noiseOffset.add(0.01, 0.01);
    
    // Update velocity based on angle
    this.vel.rotate(this.angle);
  }
  
  display() {
    noStroke();
    fill(this.color); // Random color
    ellipse(this.pos.x, this.pos.y, 4);
    
    // Draw history
    beginShape();
    for (let i = 0; i < this.history.length; i++) {
      let pos = this.history[i];
      let transparency = map(i, 0, this.history.length, 0, 100);
      fill(red(this.color), green(this.color), blue(this.color), transparency);
      ellipse(pos.x, pos.y, 4);
    }
    endShape();
  }
}
