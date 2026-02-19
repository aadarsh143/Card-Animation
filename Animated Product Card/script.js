let dots = document.querySelectorAll(".dot");
let shoe = document.getElementById("shoe");
let price = document.getElementById("price");

dots.forEach(dot => {

  dot.addEventListener("click", () => {

    document.querySelector(".dot.active").classList.remove("active");
    dot.classList.add("active");

    shoe.style.opacity = "0";

    setTimeout(() => {
      shoe.src = dot.getAttribute("data-image");
      shoe.style.opacity = "1";
    }, 200);

    price.textContent = dot.getAttribute("data-price");

  });

});
