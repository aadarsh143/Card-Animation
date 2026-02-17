const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");

function resize(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

let angle = 0;

/* PLANETS DATA (slower speeds) */
let planets = [
  {radius:150, size:8, color:"gray", speed:0.002},
  {radius:230, size:12, color:"orange", speed:0.0016},
  {radius:320, size:14, color:"deepskyblue", speed:0.0012},
  {radius:420, size:12, color:"red", speed:0.001},
  {radius:550, size:30, color:"#d9a066", speed:0.0006}
];

function drawSun(cx,cy){
  let gradient = ctx.createRadialGradient(cx,cy,20,cx,cy,300);
  gradient.addColorStop(0,"#ffffff");
  gradient.addColorStop(0.3,"#ffdd00");
  gradient.addColorStop(0.6,"#ff8800");
  gradient.addColorStop(1,"#ff3300");

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(cx,cy,120,0,Math.PI*2);
  ctx.fill();
}

function drawOrbits(cx,cy){
  ctx.strokeStyle="rgba(255,255,255,0.15)";
  planets.forEach(p=>{
    ctx.beginPath();
    ctx.ellipse(cx,cy,p.radius,p.radius*0.6,0,0,Math.PI*2);
    ctx.stroke();
  });
}

function drawPlanets(cx,cy){
  planets.forEach(p=>{
    let x = cx + Math.cos(angle * p.speed) * p.radius;
    let y = cy + Math.sin(angle * p.speed) * p.radius * 0.6;

    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(x,y,p.size,0,Math.PI*2);
    ctx.fill();
  });
}

/* Asteroid belt */
let asteroids = [];
for(let i=0;i<120;i++){
  asteroids.push({
    angle:Math.random()*Math.PI*2,
    radius:500 + Math.random()*40
  });
}

function drawAsteroids(cx,cy){
  asteroids.forEach(a=>{
    let x = cx + Math.cos(a.angle + angle*0.0003) * a.radius;
    let y = cy + Math.sin(a.angle + angle*0.0003) * a.radius * 0.6;

    ctx.fillStyle="rgba(200,200,200,0.6)";
    ctx.fillRect(x,y,2,2);
  });
}

/* Stars background */
let stars=[];
for(let i=0;i<200;i++){
  stars.push({
    x:Math.random()*window.innerWidth,
    y:Math.random()*window.innerHeight,
    size:Math.random()*2
  });
}

function drawStars(){
  ctx.fillStyle="white";
  stars.forEach(s=>{
    ctx.fillRect(s.x,s.y,s.size,s.size);
  });
}

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  let cx = canvas.width/2;
  let cy = canvas.height/2;

  drawStars();
  drawSun(cx,cy);
  drawOrbits(cx,cy);
  drawPlanets(cx,cy);
  drawAsteroids(cx,cy);

  angle += 1;  // smooth slow motion
  requestAnimationFrame(animate);
}

animate();
