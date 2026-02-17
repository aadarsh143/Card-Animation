const body = document.querySelector("body"),
  hourHand = document.querySelector(".hour"),
  minuteHand = document.querySelector(".minute"),
  secondHand = document.querySelector(".second"),
  modeSwitch = document.querySelector(".mode-switch"),
  digitalTime = document.querySelector(".digital-time"),
  dateText = document.querySelector(".date");

// Load saved mode
if (localStorage.getItem("mode") === "Dark Mode") {
  body.classList.add("dark");
  modeSwitch.textContent = "Light Mode";
}

modeSwitch.addEventListener("click", () => {
  body.classList.toggle("dark");
  const isDarkMode = body.classList.contains("dark");
  modeSwitch.textContent = isDarkMode ? "Light Mode" : "Dark Mode";
  localStorage.setItem("mode", isDarkMode ? "Dark Mode" : "Light Mode");
});

const updateTime = () => {
  let date = new Date();

  let seconds = date.getSeconds();
  let minutes = date.getMinutes();
  let hours = date.getHours();

  let secToDeg = (seconds / 60) * 360;
  let minToDeg = ((minutes + seconds / 60) / 60) * 360;
  let hrToDeg = ((hours % 12 + minutes / 60) / 12) * 360;

  secondHand.style.transform = `rotate(${secToDeg}deg)`;
  minuteHand.style.transform = `rotate(${minToDeg}deg)`;
  hourHand.style.transform = `rotate(${hrToDeg}deg)`;

  digitalTime.textContent = date.toLocaleTimeString();
  dateText.textContent = date.toDateString();
};

setInterval(updateTime, 1000);
updateTime();
