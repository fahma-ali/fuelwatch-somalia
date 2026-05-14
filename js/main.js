const burgerBtn = document.getElementById("burgerBtn");
const navLinks = document.querySelector(".nav-links");
const fuelTableBody = document.getElementById("fuelTableBody");
const searchInput = document.getElementById("searchInput");
const fuelFilter = document.getElementById("fuelFilter");
burgerBtn.addEventListener("click", function () {
  navLinks.classList.toggle("active");

  if (navLinks.classList.contains("active")) {
    burgerBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
  } else {
    burgerBtn.innerHTML = `<i class="fa-solid fa-bars"></i>`;
  }
});
let fuelData = [];
async function loadFuelData() {
  const response = await fetch("./data/fuel.json");
  fuelData = await response.json();
  console.log(response);
  displayData(fuelData);
}
loadFuelData();

function displayData(fuelData) {
  fuelTableBody.innerHTML = "";
  fuelData.forEach((item) => {
    fuelTableBody.innerHTML += `<tr>
                       <td class = "city">${item.city}</td>
                        <td class ="petrol-col">${item.petrol}</td>
                        <td class ="diesel-col">${item.diesel}</td>
                        <td class = "kerosene-col">${item.kerosene}</td>
                       </tr>`;
  });

}

