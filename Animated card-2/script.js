let dots = document.querySelectorAll(".dot");
let shoe = document.getElementById("shoe");
let price = document.getElementById("price");
let body = document.getElementById("body");
let btn = document.getElementById("btn");

dots.forEach(dot => {

  dot.addEventListener("click", () => {

    document.querySelector(".dot.active").classList.remove("active");
    dot.classList.add("active");

    // Background change
    body.style.background = dot.getAttribute("data-bg");

    // Image change with fade
    shoe.style.opacity = "0";
    setTimeout(() => {
      shoe.src = dot.getAttribute("data-image");
      shoe.style.opacity = "1";
    }, 200);

    // Price change
    price.textContent = dot.getAttribute("data-price");

  });

});

// Add To Cart animation
btn.addEventListener("click", () => {
  btn.innerText = "Added ✔";
  setTimeout(()=>{
    btn.innerText = "Add To Cart";
  },1500);
});
