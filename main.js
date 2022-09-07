// Initial Setup
const canvas = document.querySelector('canvas');
const c = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;


// Variables
const mouse = {
	x: innerWidth / 2,
	y: innerHeight / 2 - 80 
};

const colors = [
	'#8e44ad',
    '#7bed9f',
	'#2C3A47',
	'#ff6b81',
];


// Event Listeners
addEventListener('mousemove', event => {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
});
console.log(mouse.x)

addEventListener('resize', () => {
	canvas.width = innerWidth;	
	canvas.height = innerHeight;

	init();
});


// Utility Functions
function randomIntFromRange(min,max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
	return colors[Math.floor(Math.random() * colors.length)];
}


// Objects
function Particle(x, y, radius, color) {
	const distance = randomIntFromRange(110,120);
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = color;
	this.radians = Math.random() * Math.PI * 2;
	this.velocity = 0.1;
	this.distanceFromCenter = {
		x: distance,
		y: distance
	};
	this.prevDistanceFromCenter = {
		x: distance,
		y: distance
	};
	this.lastMouse = {x: x, y: y};

	this.update = () => {
		const lastPoint = {x: this.x, y: this.y};
		// Move points over time
		this.radians += this.velocity;

		// Drag effect
		this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.1;
		this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.1;

		// Circular Motion
		this.distanceFromCenter.x = this.prevDistanceFromCenter.x+ Math.cos(this.radians) * Math.cos(this.radians)*Math.sin(this.radians);
		this.distanceFromCenter.y = this.prevDistanceFromCenter.x +  Math.tan(this.radians)* Math.sin(this.radians)*200;
    
        

		this.x = this.lastMouse.x + Math.sin(this.radians) * this.distanceFromCenter.x;
		this.y = this.lastMouse.y + Math.cos(this.radians) * this.distanceFromCenter.y;

		this.draw(lastPoint);
	};

	this.draw = lastPoint => {
		c.beginPath();
		c.strokeStyle = this.color;
		c.lineWidth = this.radius;
		c.moveTo(lastPoint.x, lastPoint.y);
		c.lineTo(this.x, this.y);
		c.stroke();
		c.closePath();
	};
}


// Implementation
let particles;
function circleloop() {
	particles = [];

	for (let i = 0; i < 100; i++) {
		const radius = (Math.random() * 2) +1 ;
		particles.push(new Particle(canvas.width / 2, canvas.height / 2, radius, randomColor(colors)));
	}
}

// Animation Loop
function animate() {
	requestAnimationFrame(animate);
	c.fillStyle = 'rgba(248, 239, 186,1.0)';
	c.fillRect(0,0, canvas.width, canvas.height);

	particles.forEach(particle => {
		particle.update();
	});
}

circleloop();
animate();