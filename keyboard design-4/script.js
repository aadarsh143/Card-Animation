document.addEventListener("DOMContentLoaded",()=>{

const keys = document.querySelectorAll(".key");
const screen = document.getElementById("screen");

let wordsBox = document.getElementById("words");
let charsBox = document.getElementById("chars");
let wpmBox   = document.getElementById("wpm");

let startTime=null;

/* update stats */
function updateStats(){
 let text=screen.textContent;
 let chars=text.length;
 let words=text.trim()?text.trim().split(/\s+/).length:0;

 charsBox.textContent=chars;
 wordsBox.textContent=words;

 if(startTime){
   let min=(Date.now()-startTime)/60000;
   wpmBox.textContent=Math.round(words/(min||1));
 }

 screen.scrollTop=screen.scrollHeight;
}

/* typing */
document.addEventListener("keydown",e=>{
 let k=e.key.toLowerCase();

 if(!startTime) startTime=Date.now();

 if(k==="backspace") screen.textContent=screen.textContent.slice(0,-1);
 else if(k==="enter") screen.textContent+="\n";
 else if(k==="tab"){e.preventDefault();screen.textContent+="    ";}
 else if(k.length===1) screen.textContent+=k;

 updateStats();

 keys.forEach(btn=>{
  if(btn.dataset.key===k) btn.classList.add("active");
 });

});

/* release */
document.addEventListener("keyup",e=>{
 let k=e.key.toLowerCase();
 keys.forEach(btn=>{
  if(btn.dataset.key===k) btn.classList.remove("active");
 });
});

});
