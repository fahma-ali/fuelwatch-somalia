const burgerBtn = document.getElementById("burgerBtn");
const navLinks = document.querySelector(".nav-links");
const fuelTableBody = document.getElementById("fuelTableBody");
const searchInput = document.getElementById("searchInput");
const fuelFilter = document.getElementById("fuelFilter");
const avgPetrol = document.getElementById("avgPetrol");
const avgDiesel = document.getElementById("avgDiesel");
const cheapestCity = document.getElementById("cheapestCity");
const lastUpdated = document.getElementById("lastUpdated");
const themeBtn = document.getElementById("themeBtn");

burgerBtn.addEventListener("click", function () {
  navLinks.classList.toggle("active");

  if (navLinks.classList.contains("active")) {
    burgerBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
  } else {
    burgerBtn.innerHTML = `<i class="fa-solid fa-bars"></i>`;
  }
});
themeBtn.addEventListener("click", function () {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    themeBtn.innerHTML = `<i class="fa-solid fa-sun"></i>`;
  } else {
    themeBtn.innerHTML = `<i class="fa-solid fa-moon"></i>`;
  }
});
let fuelData = [];
async function loadFuelData() {
  const response = await fetch("./data/fuel.json");
  fuelData = await response.json();
  console.log(response);
  displayData(fuelData);
  updateStats(fuelData);
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
    filterFuelType();

}

function searchCities() {
  const searchValue = searchInput.value.toLowerCase();

  const filteredData = fuelData.filter((item) => {
    return item.city.toLowerCase().includes(searchValue);
  });

  displayData(filteredData);
}


/* Filter Fuel Type */
function filterFuelType() {
  const selectedFuel = fuelFilter.value;

  const petrolCols = document.querySelectorAll(".petrol-col");
  const dieselCols = document.querySelectorAll(".diesel-col");
  const keroseneCols = document.querySelectorAll(".kerosene-col");

  petrolCols.forEach(function (col) {
    col.style.display = "";
  });

  dieselCols.forEach(function (col) {
    col.style.display = "";
  });

  keroseneCols.forEach(function (col) {
    col.style.display = "";
  });

  if (selectedFuel === "petrol") {
    dieselCols.forEach(function (col) {
      col.style.display = "none";
    });

    keroseneCols.forEach(function (col) {
      col.style.display = "none";
    });
  }

  if (selectedFuel === "diesel") {
    petrolCols.forEach(function (col) {
      col.style.display = "none";
    });

    keroseneCols.forEach(function (col) {
      col.style.display = "none";
    });
  }

  if (selectedFuel === "kerosene") {
    petrolCols.forEach(function (col) {
      col.style.display = "none";
    });

    dieselCols.forEach(function (col) {
      col.style.display = "none";
    });
  }
}

function updateStats(data) {
  // Average Petrol
  const petrolAverage =
    data.reduce(function (total, item) {
      return total + item.petrol;
    }, 0) / data.length;

  // Average Diesel
  const dieselAverage =
    data.reduce(function (total, item) {
      return total + item.diesel;
    }, 0) / data.length;

  // Cheapest City
  const cheapest = data.reduce(function (lowest, item) {
    if (item.petrol < lowest.petrol) {
      return item;
    } else {
      return lowest;
    }
  });

  // Update HTML
  avgPetrol.textContent = `$${petrolAverage.toFixed(2)}`;

  avgDiesel.textContent = `$${dieselAverage.toFixed(2)}`;

  cheapestCity.textContent = cheapest.city;

  lastUpdated.textContent = "Today";
}
//addEventListeners
searchInput.addEventListener("input", searchCities);
fuelFilter.addEventListener("change",filterFuelType );


