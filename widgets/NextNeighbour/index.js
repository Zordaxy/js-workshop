// There is graph of points. On user click: color points in radius 50px to red.
// List of points like:
// let points =  {
//   {x: 1, y: 2},
//   {x: 350, y: 567},
// }

// 1. Create  class ball that renders in in Canvas, exposes "Display" method and calculates distance to click
// 2. Create app object that initializes canvas, renders balls, handles click event
// 3. Click handler that checks distance and changes color of balls that are close to click
// 4. Clear canvas and re-render with updated colors (balls remain the same)

// More efficient:
// 1. Build KD-Tree.
// 2. Perform range search on KD-Tree (O(log n)).
// KD-Tree Recursively divides the set of points along alternating axes (x, then y, then x, etc.).

class Ball {
  constructor($canvas) {
    this.$canvas = $canvas;
    this.fillStyle = "blue";
    this.radius = 3;
    this.ctx = $canvas.getContext("2d");
    this.x = this.getRandom(1, this.$canvas.width - this.radius);
    this.y = this.getRandom(1, this.$canvas.height - this.radius);
    this.display();
  }

  display() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = this.fillStyle;
    this.ctx.fill();
  }

  getRandom(min, max) {
    return Math.random() * (max - min) + min - this.radius * 2;
  }

  getDistance(clickX, clickY) {
    return Math.sqrt(
      Math.pow(clickX - this.x, 2) + Math.pow(clickY - this.y, 2)
    );
  }
}

let app = {
  $canvas: null,
  canvasWidth: 0,
  canvasHeight: 0,
  ctx: null,
  balls: [],
  tresholdDistance: 50,

  init() {
    this.$canvas = document.querySelector("#canvas");
    this.ctx = this.$canvas.getContext("2d");
    this.canvasWidth = this.$canvas.width = window.innerWidth;
    this.canvasHeight = this.$canvas.height = window.innerHeight;
    this.renderBalls();

    document.addEventListener("click", this.handleClick.bind(this));
  },

  renderBalls() {
    let numberBalls = 1000;

    for (let i = 0; i < numberBalls; i++) {
      let ball = new Ball(this.$canvas);
      this.balls.push(ball);
    }
  },

  handleClick(e) {
    let clickX = e.clientX;
    let clickY = e.clientY;

    this.balls.forEach((ball) => {
      let distance = ball.getDistance(clickX, clickY);

      if (distance < this.tresholdDistance) {
        console.log(distance, this.tresholdDistance);
        ball.fillStyle = "red"; // Store the color change in the object
      } else {
        ball.fillStyle = "blue"; // Reset color if it's not close
      }
    });

    this.render();
  },

  render() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight); // Clear canvas
    this.balls.forEach((ball) => ball.display()); // Redraw all balls
  },
};
app.init();
