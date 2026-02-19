let body = document.getElementById("body");
let slider = document.getElementById("slider");
let price = document.getElementById("price");
let dotsContainer = document.getElementById("dots");
let cartCount = document.getElementById("cart-count");
let buyBtn = document.getElementById("buy-btn");

let shoes = [
  {
    img:"https://assets.adidas.com/images/e_trim:EAEEEF/c_lpad,w_iw,h_ih/b_rgb:EAEEEF/w_180,f_auto,q_auto,fl_lossy,c_fill,g_auto/e2f1dcbcac55451db75832945af363ae_9366/AMALGO_SHOES_Blue_IU6239_00_plp_standard.jpg",
    price:"89.00",
    bg:"linear-gradient(135deg,#4cb8c4,#3b82f6)"
  },
  {
    img:"https://assets.adidas.com/images/e_trim:EAEEEF/c_lpad,w_iw,h_ih/b_rgb:EAEEEF/w_180,f_auto,q_auto,fl_lossy,c_fill,g_auto/bdf19a73f0094cdc8c7ee14e50b74d9b_9366/Amalgo_Shoes_Silver_JJ6465_00_plp_standard.jpg",
    price:"99.00",
    bg:"linear-gradient(135deg,#cbd5e1,#94a3b8)"
  },
  {
    img:"https://assets.adidas.com/images/e_trim:EAEEEF/c_lpad,w_iw,h_ih/b_rgb:EAEEEF/w_180,f_auto,q_auto,fl_lossy,c_fill,g_auto/268d561c255d4f45b2d6f63d873cd079_9366/AMALGO_SHOES_Black_IU6241_00_plp_standard.jpg",
    price:"109.00",
    bg:"linear-gradient(135deg,#111,#444)"
  }
];

let index = 0;
let count = 0;
let interval;

/* Create dots */
shoes.forEach((_,i)=>{
  let dot = document.createElement("span");
  if(i===0) dot.classList.add("active");
  dot.onclick = ()=> goToSlide(i);
  dotsContainer.appendChild(dot);
});
let allDots = document.querySelectorAll(".dots span");

function updateSlide(){
  slider.style.opacity="0";
  setTimeout(()=>{
    slider.src=shoes[index].img;
    price.textContent=shoes[index].price;
    body.style.background=shoes[index].bg;
    allDots.forEach(d=>d.classList.remove("active"));
    allDots[index].classList.add("active");
    slider.style.opacity="1";
  },300);
}

function startAuto(){
  interval=setInterval(()=>{
    index=(index+1)%shoes.length;
    updateSlide();
  },3000);
}

function resetAuto(){
  clearInterval(interval);
  startAuto();
}

function goToSlide(i){
  index=i;
  updateSlide();
  resetAuto();
}

document.querySelector(".next").onclick=()=>{
  index=(index+1)%shoes.length;
  updateSlide();
  resetAuto();
};

document.querySelector(".prev").onclick=()=>{
  index=(index-1+shoes.length)%shoes.length;
  updateSlide();
  resetAuto();
};

/* Add to cart flying effect */
buyBtn.onclick=()=>{
  count++;
  cartCount.textContent=count;

  let imgClone=slider.cloneNode(true);
  imgClone.style.position="absolute";
  imgClone.style.width="100px";
  imgClone.style.top=slider.getBoundingClientRect().top+"px";
  imgClone.style.left=slider.getBoundingClientRect().left+"px";
  imgClone.style.transition="1s";
  document.body.appendChild(imgClone);

  setTimeout(()=>{
    imgClone.style.top=document.querySelector(".cart").getBoundingClientRect().top+"px";
    imgClone.style.left=document.querySelector(".cart").getBoundingClientRect().left+"px";
    imgClone.style.opacity="0";
    imgClone.style.transform="scale(0.2)";
  },50);

  setTimeout(()=>{imgClone.remove();},1000);
};

updateSlide();
startAuto();
