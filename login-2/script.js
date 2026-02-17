// THEME TOGGLE
function toggleTheme(){
  document.body.classList.toggle("light");
  document.body.classList.toggle("dark");
}

// PAGE SWITCH
function showPage(page){
  document.querySelectorAll(".wrapper")
    .forEach(w=>w.classList.remove("active"));
  document.getElementById(page)
    .classList.add("active");
}

// LOGIN (Demo)
function login(){
  const email=document.getElementById("loginEmail").value;
  const pass=document.getElementById("loginPass").value;

  if(email==="admin@gmail.com" && pass==="123456"){
    showPage("dashboard");
  } else {
    alert("Use:\nadmin@gmail.com\n123456");
  }
}

function logout(){
  showPage("login");
}

// PARTICLES
const container=document.getElementById("particles");

for(let i=0;i<40;i++){
  const dot=document.createElement("span");
  dot.style.position="absolute";
  dot.style.width="4px";
  dot.style.height="4px";
  dot.style.background="white";
  dot.style.borderRadius="50%";
  dot.style.left=Math.random()*100+"%";
  dot.style.top=Math.random()*100+"%";
  dot.style.opacity=Math.random();
  dot.style.animation=`move ${5+Math.random()*10}s linear infinite`;
  container.appendChild(dot);
}

const style=document.createElement("style");
style.innerHTML=`
@keyframes move{
  from{transform:translateY(0)}
  to{transform:translateY(-100vh)}
}`;
document.head.appendChild(style);
