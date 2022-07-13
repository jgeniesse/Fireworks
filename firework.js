let canvas = (/** @type {HTMLCanvasElement} */ document.getElementById("canvas"));
let context = canvas.getContext('2d');
context.font = "30px Arial";
context.strokeText("Hello World",10,50);

let fireArr = [];
let popArr = [];
let fcolor = ["red", "orange", "yellow", "green", "blue", "purple"];
let j = 0;
let deltaX = [0, 1, 2, 1, 0, -1, -2, -1];
let deltaY = [2, 1, 0, -1, -2, -1, 0, 1];
let mouseX = -1;
let mouseY = -1;

canvas.onmousemove = function(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
    
    //Correct the coords
    let box2 = /** @type {HTMLCanvasElement} */(event.target).getBoundingClientRect();
    mouseX -= box2.left;
    mouseY -= box2.top;
};

canvas.onmouseleave =  function() {
    mouseX = -1;
    mouseY = -1;
};

canvas.onclick = function() {
    fireArr.push({"x": 0, "vx": mouseX/100, "y": canvas.height, "vy": (mouseY - canvas.height)/100, 
                    "yDest": mouseY, "radius": 8, "color": fcolor[j++ % 6]});
};


function animate() {

    context.clearRect(0, 0, canvas.width, canvas.height);
    
    fireArr.forEach(function(fwork) {
        if(fwork.y < fwork.yDest) {
            let i = 0;
            for(i; i < 8; ++i) {
                popArr.push({"x": fwork.x, "y": fwork.y, "dx": deltaX[i], "dy": deltaY[i], "radius": 3, 
                            "color": fwork.color});
                fireArr = fireArr.filter(fwork => (fwork.y > fwork.yDest));
            }
        } else {
            fwork.x += fwork.vx;
            fwork.y += fwork.vy; 
        }
        context.fillStyle = fwork.color;
        context.beginPath();
        context.arc(fwork.x, fwork.y, fwork.radius, 0, Math.PI *2, true);
        context.fill();
    })

    popArr.forEach(function(fpop) {
        fpop.x += fpop.dx;
        fpop.y += fpop.dy;
        context.fillStyle = fpop.color;
        context.beginPath();
        context.arc(fpop.x, fpop.y, fpop.radius, 0, Math.PI *2, true);
        context.fill();
    })
    
    popArr = popArr.filter(
        pop => ((pop.y>0)&&(pop.x>0)&&(pop.x<canvas.width)&&(pop.y<canvas.height))
        );

    window.requestAnimationFrame(animate);
};
animate();

//hello