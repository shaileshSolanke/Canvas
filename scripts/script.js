const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const button = document.querySelector("button");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// context.strokeStyle = "gold";
context.lineJoin = "round";
context.lineCap = "round";

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;
context.globalCompositeOperation = "lighten";

function draw(event) {
  if (!isDrawing) return;

  context.strokeStyle = `hsl(${hue},100%,50%)`;

  context.beginPath();
  context.moveTo(lastX, lastY);
  context.lineTo(event.offsetX, event.offsetY);
  context.stroke();

  [lastX, lastY] = [event.offsetX, event.offsetY];

  hue++;
  if (hue >= 360) {
    hue = 0;
  }

  if (context.lineWidth >= 50 || context.lineWidth <= 1) {
    direction = !direction;
  }

  direction ? context.lineWidth++ : context.lineWidth--;
}

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  button.innerText="CLEARED"
  setTimeout(()=>{
    button.innerText="CLEAR"
  },1000)
}

canvas.addEventListener("mousedown", (event) => {
  isDrawing = true;
  [lastX, lastY] = [event.offsetX, event.offsetY];
});

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));

button.addEventListener("click", clearCanvas);
