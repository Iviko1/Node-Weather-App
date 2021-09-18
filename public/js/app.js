var fetchWeather = "/weather";

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const weatherIcon = document.querySelector(".weatherIcon i");

const weatherCondition = document.querySelector(".weatherCondition");

const tempElement = document.querySelector(".temperature span");

const locationElement = document.querySelector(".place");

const dateElement = document.querySelector(".date");

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

dateElement.textContent = `${new Date().getDate()} ${
  monthNames[new Date().getMonth()]
}`;
locationElement.textContent = "Waiting...";

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  locationElement.textContent = "Loading...";
  tempElement.textContent = "";
  weatherCondition.textContent = "";

  const locationApi = `${fetchWeather}?address=${search.value}`;
  fetch(locationApi).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        locationElement.textContent = data.error;
        tempElement.textContent = "";
        weatherCondition.textContent = "";
      } else {
        if (data.description === "rain" || data.description === "fog") {
          weatherIcon.className = `wi wi-day-${data.description}`;
        } else {
          weatherIcon.className = "wi wi-day-cloudy";
        }
        locationElement.textContent = data.cityName;
        tempElement.textContent = `${Math.round(
          data.temperature
        )}${String.fromCharCode(176)}`;
        weatherCondition.textContent = data.description.toUpperCase();
      }
    });
  });
});
