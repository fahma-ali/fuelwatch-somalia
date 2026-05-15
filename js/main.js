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
const navItems = document.querySelectorAll(".nav-links a");
const clearSearch = document.getElementById("clearSearch");
navItems.forEach(function (link) {
  link.addEventListener("click", function () {
    navItems.forEach(function (item) {
      item.classList.remove("active");
    });

    link.classList.add("active");

    navLinks.classList.remove("active");

    burgerBtn.innerHTML = `<i class="fa-solid fa-bars"></i>`;
  });
});
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
    localStorage.setItem("theme", "dark");
    themeBtn.innerHTML = `<i class="fa-solid fa-sun"></i>`;
  } else {
    localStorage.setItem("theme", "light");
    themeBtn.innerHTML = `<i class="fa-solid fa-moon"></i>`;
  }
});
// Check Saved Theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");

  themeBtn.innerHTML = `<i class="fa-solid fa-sun"></i>`;
} else {
  document.body.classList.remove("dark");

  themeBtn.innerHTML = `<i class="fa-solid fa-moon"></i>`;
}
clearSearch.addEventListener("click", function () {
  searchInput.value = "";
  displayData(fuelData);
});
let fuelData = [];
async function loadFuelData() {
  try{


  const response = await fetch("./data/fuel.json");
  if (!response.ok) {
    throw new Error("Fuel data could not be loaded");
  }

  fuelData = await response.json();
  
  displayData(fuelData);
  updateStats(fuelData);
    }catch(error){
       fuelTableBody.innerHTML = `
      <tr>
        <td colspan="5" class="no-data">
          Failed to load fuel prices. Please try again later.
        </td>
      </tr>
    `;

    console.error(error);
    }
}
loadFuelData();

function displayData(fuelData) {
  fuelTableBody.innerHTML = "";
  if (fuelData.length === 0) {
    fuelTableBody.innerHTML = `
                <tr>
                  <td colspan="5" class="no-data">No city found</td>
                </tr>
              `;
    return;
  }
  fuelData.forEach((item) => {
    const favoriteCity = localStorage.getItem("favoriteCity");
    const isFavorite = favoriteCity === item.city;
    fuelTableBody.innerHTML += `
                      <tr class="${isFavorite ? "favorite-row" : ""}">
                       <td class = "city">${item.city}</td>
                        <td class ="petrol-col">$${item.petrol}</td>
                        <td class ="diesel-col">$${item.diesel}</td>
                        <td class = "kerosene-col">$${item.kerosene}</td>
                        <td>
                        <button class="favorite-btn" onclick="saveFavorite('${item.city}')">  
                        ${favoriteCity === item.city ? "Saved ✓" : "Save"}
                        </button>
                        </td>
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
function saveFavorite(city) {
  localStorage.setItem("favoriteCity", city);

  displayData(fuelData);
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


}
function updateTime() {
  const currentDate = new Date();

  lastUpdated.textContent =
    currentDate.toLocaleString();
}

updateTime();

setInterval(updateTime, 1000);
//addEventListeners
searchInput.addEventListener("input", searchCities);
fuelFilter.addEventListener("change", filterFuelType);
