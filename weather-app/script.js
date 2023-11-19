const key = "66529123e942098b008effac837ff160";

function addDataToObjects(data) {
  document.querySelector(".medium-box").style.display = "contents";
  document.querySelector(
    ".city"
  ).innerHTML = `Previsão do tempo em ${data.name}`;
  document.querySelector(".temp").innerHTML = Math.floor(data.main.temp) + "°C";
  document.querySelector(".text-weather").innerHTML =
    data.weather[0].description;
  document.querySelector(".humidity").innerHTML =
    "Umidade " + data.main.humidity + "%";
  document.querySelector(
    ".weather-icon"
  ).src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
}
async function fecthApi(inputValue) {
  const data = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${key}&lang=pt_br&units=metric`
  ).then((response) => response.json());

  if (data.cod === `404` || data.cod === `400`) {
    window.alert("Localização inválida");
    return;
  }

  addDataToObjects(data);
}
function getInputValue() {
  const inputValue = document.querySelector("#search-input").value;
  fecthApi(inputValue);
}
