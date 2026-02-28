document.addEventListener("DOMContentLoaded", function () {

  const keys = document.querySelectorAll(".key");

  keys.forEach(function(key){
    key.addEventListener("click", function(){
      key.classList.toggle("active");
    });
  });

});
