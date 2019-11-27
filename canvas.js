//Session functions
function submit() {	
	session.submitData();
}

function clearCanvas() {
	session.clearDrawing();
}

//Drawing functions
function beginDraw(mousePosition) {
	session.isDrawing = true;
	session.timeStart = Date.now();
};

function endDraw() {
	session.isDrawing = false;
	context.beginPath();
	if (session.currentX == []) return;
	session.xArray.push(session.currentX);
	session.yArray.push(session.currentY);
	session.tArray.push(session.currentT);
	session.currentX = [];
	session.currentY = [];
	session.currentT = [];
};

function draw(mousePosition) {
	session.draw(mousePosition);
};

//Main Program
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

//Resizing
canvas.width = window.innerWidth;
canvas.height = window.innerHeight -62;

//Instantiating drawing session
const session = new Session(canvas, context);

//Event listeners normal mode
canvas.addEventListener("mousedown", beginDraw);
canvas.addEventListener("mouseup", endDraw);
canvas.addEventListener("mousemove", draw);

// Set up touch events for mobile, etc
canvas.addEventListener("touchstart", function (e) {
    mousePos = getTouchPos(canvas, e);
  	var touch = e.touches[0];
  	var mouseEvent = new MouseEvent("mousedown", {
    	clientX: touch.clientX,
    	clientY: touch.clientY
  	});
  	e.preventDefault();
  	beginDraw(mouseEvent);
}, false);
canvas.addEventListener("touchend", function (e) {
	e.preventDefault();
  endDraw();
}, false);
canvas.addEventListener("touchmove", function (e) {
  var touch = e.touches[0];
  var mouseEvent = new MouseEvent("mousemove", {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  e.preventDefault();
  draw(mouseEvent);
}, false);

// Get the position of a touch relative to the canvas
function getTouchPos(canvasDom, touchEvent) {
  var rect = canvasDom.getBoundingClientRect();
  return {
    x: touchEvent.touches[0].clientX - rect.left,
    y: touchEvent.touches[0].clientY - rect.top
  };
};
