window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    car.start();
  };

  /** @type {HTMLCanvasElement} */
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const background = new Image();
  background.src = "./images/road.png";

  class Car {
    constructor() {
      this.x = 230;
      const img = document.createElement("img");
      img.addEventListener("load", () => {
        this.img = img;
        //this.draw No bc its going to be draw before you click start btn
      });
      img.src = "./images/car.png";
      // this.frame = 0;
    }

    draw() {
      ctx.drawImage(
        this.img,
        this.x,
        600,
        this.img.width / 4,
        this.img.height / 4
      );
      console.log(this.x);
    }

    moveRight() {
      this.x += 50;
    }

    moveLeft() {
      this.x -= 50;
    }

    start() {
      this.interval = setInterval(updateCanvas, 20);
    }
  }

  function setBackground() {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  } //Don't have this so you can write it outside the class

  const car = new Car();

  document.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "ArrowRight":
        car.moveRight();
        break;

      case "ArrowLeft":
        car.moveLeft();
        break;
    }
  });

    let obstaclesArray = [];
    const obstaclesWidth = 100;
    const obstaclesHeight = 20;
    const obstaclesSpeed = 4;

  class Obstacle {
    constructor(ctx, x, y, width, height, speed) {
      this.ctx = ctx;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.speed = speed;
  }

    draw() {
      this.ctx.fillStyle = 'red';
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    move() {
      this.y += this.speed;
    }
  }
    function newObstacles() {
      const random = Math.random()*(canvas.width-obstaclesWidth);
      const randomObstacle = new Obstacle(random,obstaclesWidth,obstaclesHeight,obstaclesSpeed)
      obstaclesArray.push(randomObstacle)
    }

    setInterval(newObstacles(),1000)

    function updateObstacles() {
    for (i = 0; i < obstaclesArray.length; i++) {
      obstaclesArray[i].x += -4;
      obstaclesArray[i].redraw();
    } 
    }

    function updateCanvas() {
      ctx.clearRect(0, 0, 500, 700);
      setBackground();
      car.draw();
      updateObstacles();
    }
  };
// I need to rewatch the lesson and try again. I will update the lab