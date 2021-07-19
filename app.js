const selectCountry = document.querySelector(".select-country");
const deaths = document.querySelector(".deaths");
const contaminated = document.querySelector(".contaminated");
const recovered = document.querySelector(".recovered");

async function init() {
  const url = "https://covid19.mathdro.id/api/countries/";

  const data = await fetch(url)
    .then((response) => response.json())
    .then((response) => {
      return response;
    });

  for (let i = 0; i < 194; i++) {
    const item = data.countries[i].name;
    selectCountry.innerHTML += `<option value="${item}">${item}</option>`;
  }
}

async function changeCountry() {
  deaths.innerHTML = "...";
  contaminated.innerHTML = "...";
  recovered.innerHTML = "...";

  const url = `https://covid19.mathdro.id/api/countries/${selectCountry.value}`;

  const data = await fetch(url)
    .then((response) => response.json())
    .then((response) => {
      numberTimer(response.deaths.value, deaths);
      numberTimer(response.confirmed.value, contaminated);
      numberTimer(response.recovered.value, recovered);
      return response;
    });
}

function numberTimer(value, element) {
  element.style.opacity = 0;

  document.querySelector(".select-container").style.display = "none";
  document.querySelector(
    ".country"
  ).innerHTML = `Country : ${selectCountry.value}`;

  setTimeout(() => {
    element.style.opacity = 1;
    let currentValue = 0;

    if (value < 300) {
      currentValue = 0;
    } else {
      currentValue = value - 100;
    }

    const set = setInterval(() => {
      if (currentValue == value) {
        element.innerHTML = currentValue;
        clearInterval(set);
        return;
      } else {
        currentValue++;
        element.innerHTML = currentValue;
      }
    }, 0);
    document.querySelector(".select-container").style.display = "flex";
  }, 500);
}

init();

selectCountry.addEventListener("change", () => {
  changeCountry();
});
