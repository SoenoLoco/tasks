const API_KEY = "a5d11876f5373f4593b5f54f042e7186";
const BASE = "https://api.openweathermap.org/data/2.5";

let currentTempCelsius = null; //текущая температура
let currentUnit = "C"; //текущая единица измерения
let currentCity = ""; //город

// DOM элементы
const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const locationBtn = document.getElementById("location-btn");
const errorDiv = document.getElementById("error-message");
const unitCelsius = document.getElementById("unit-celsius");
const unitFahrenheit = document.getElementById("unit-fahrenheit");

// Основная функция запроса
async function getWeather(city) {
  try {
    showLoading(true);
    hideError();

    const url = `${BASE}/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ru`;
    console.log("Запрос погоды:", url);
    const response = await fetch(url);

    if (!response.ok) {
      const msg =
        response.status === 404 ? "❌ Город не найден" : "❌ Ошибка сервера";
      throw new Error(msg);
    }

    const data = await response.json();
    displayWeather(data);

    currentCity = data.name;
    currentTempCelsius = data.main.temp;

    changeBackground(data.weather[0].main);

    return data;
  } catch (error) {
    showError(error.message);
    throw error;
  } finally {
    showLoading(false);
  }
}

// Рендеринг данных
function displayWeather(data) {
  console.log("Отображаем погоду для:", data.name); // Для отладки

  document.getElementById("city-name").textContent = data.name;

  const iconElement = document.getElementById("weather-icon");
  if (iconElement) {
    iconElement.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    iconElement.alt = data.weather[0].description;
  }

  // Отображаем температуру
  if (currentUnit === "C") {
    document.getElementById("temperature").textContent =
      Math.round(data.main.temp) + "°C";
    document.getElementById("feels-like").textContent =
      "Ощущается как " + Math.round(data.main.feels_like) + "°C";
  } else {
    const tempF = celsiusToFahrenheit(data.main.temp);
    const feelsLikeF = celsiusToFahrenheit(data.main.feels_like);
    document.getElementById("temperature").textContent =
      Math.round(tempF) + "°F";
    document.getElementById("feels-like").textContent =
      "Ощущается как " + Math.round(feelsLikeF) + "°F";
  }

  document.getElementById("description").textContent =
    data.weather[0].description;
  document.getElementById("humidity").textContent = data.main.humidity + "%";
  document.getElementById("wind").textContent =
    data.wind.speed.toFixed(1) + " м/с";

  const pressureMmHg = Math.round(data.main.pressure * 0.75006);
  document.getElementById("pressure").textContent =
    pressureMmHg + " мм рт. ст.";
}

// Геолокация
function getLocation() {
  console.log("Запрос геолокации...");

  if (!navigator.geolocation) {
    showError("❌ Геолокация не поддерживается вашим браузером");
    return;
  }

  showLoading(true);
  hideError();

  navigator.geolocation.getCurrentPosition(
    async function (pos) {
      console.log(
        "Координаты получены:",
        pos.coords.latitude,
        pos.coords.longitude,
      );
      const { latitude, longitude } = pos.coords;
      try {
        // Сначала получаем погоду по координатам
        const weatherUrl = `${BASE}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=ru`;
        console.log("Запрос погоды по координатам:", weatherUrl);
        const weatherResponse = await fetch(weatherUrl);

        if (!weatherResponse.ok) {
          throw new Error(
            `HTTP ${weatherResponse.status}: ${weatherResponse.statusText}`,
          );
        }

        const weatherData = await weatherResponse.json();
        console.log("Погода получена:", weatherData.name);
        displayWeather(weatherData);
        currentCity = weatherData.name;
        currentTempCelsius = weatherData.main.temp;
        changeBackground(weatherData.weather[0].main);

        // Затем получаем прогноз
        await getForecastByCoords(latitude, longitude);
      } catch (error) {
        console.error("Ошибка:", error);
        showError("❌ Не удалось получить погоду: " + error.message);
      } finally {
        showLoading(false);
      }
    },
    function (error) {
      console.error("Ошибка геолокации:", error);
      let errorMessage = "❌ Не удалось определить местоположение. ";
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage += "Разрешите доступ к геолокации.";
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage += "Информация о местоположении недоступна.";
          break;
        case error.TIMEOUT:
          errorMessage += "Время ожидания истекло.";
          break;
        default:
          errorMessage += "Неизвестная ошибка.";
      }
      showError(errorMessage);
      showLoading(false);
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    },
  );
}

function showError(message) {
  errorDiv.textContent = message;
  errorDiv.style.display = "block";
  setTimeout(() => {
    errorDiv.style.display = "none";
  }, 5000);
}

function hideError() {
  errorDiv.style.display = "none";
}

function showLoading(show) {
  const skeletonLoader = document.getElementById("skeleton-loader");
  const mainContent = document.getElementById("main-content");

  if (show) {
    if (skeletonLoader) skeletonLoader.style.display = "block";
    if (mainContent) mainContent.style.opacity = "0.5";
  } else {
    if (skeletonLoader) skeletonLoader.style.display = "none";
    if (mainContent) mainContent.style.opacity = "1";
  }
}

function celsiusToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

// Прогноз на 5 дней
async function getForecast(city) {
  try {
    const url = `${BASE}/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=ru`;
    const response = await fetch(url);

    if (!response.ok) throw new Error("Не удалось получить прогноз");

    const data = await response.json();
    displayForecast(data);
  } catch (error) {
    console.error("Ошибка прогноза:", error);
    const forecastContainer = document.getElementById("forecast-container");
    if (forecastContainer) {
      forecastContainer.innerHTML =
        '<div class="error">❌ Не удалось загрузить прогноз</div>';
    }
  }
}

async function getForecastByCoords(lat, lon) {
  try {
    const url = `${BASE}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ru`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Не удалось получить прогноз");
    const data = await response.json();
    displayForecast(data);
  } catch (error) {
    console.error("Ошибка прогноза по координатам:", error);
  }
}

function displayForecast(data) {
  const forecastContainer = document.getElementById("forecast-container");
  if (!forecastContainer) return;

  forecastContainer.innerHTML = "";

  const dailyData = {};

  data.list.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const day = date.toLocaleDateString("ru-RU", {
      weekday: "short",
      day: "numeric",
    });

    if (!dailyData[day]) {
      dailyData[day] = {
        temp: item.main.temp,
        icon: item.weather[0].icon,
        description: item.weather[0].description,
      };
    }
  });

  const days = Object.keys(dailyData).slice(0, 5);

  days.forEach((day) => {
    const forecast = dailyData[day];
    const card = document.createElement("div");
    card.className = "forecast-card";

    let tempDisplay =
      currentUnit === "C"
        ? Math.round(forecast.temp) + "°C"
        : Math.round(celsiusToFahrenheit(forecast.temp)) + "°F";

    card.innerHTML = `
            <div class="forecast-date">${day}</div>
            <img src="https://openweathermap.org/img/wn/${forecast.icon}.png" alt="иконка">
            <div class="forecast-temp">${tempDisplay}</div>
            <div class="forecast-desc">${forecast.description}</div>
        `;
    forecastContainer.appendChild(card);
  });
}

// Избранные города
let favorites = [];

function loadFavorites() {
  const saved = localStorage.getItem("favoriteCities");
  if (saved) {
    favorites = JSON.parse(saved);
  }
  renderFavorites();
}

function saveFavorites() {
  localStorage.setItem("favoriteCities", JSON.stringify(favorites));
  renderFavorites();
}

function addFavorite(city) {
  if (!city) return;

  if (favorites.includes(city)) {
    showError("⚠️ Город уже в избранном");
    return;
  }

  if (favorites.length >= 5) {
    showError("⚠️ Можно добавить не более 5 городов");
    return;
  }

  favorites.push(city);
  saveFavorites();
  showError(`✅ ${city} добавлен в избранное`);
}

function removeFavorite(city) {
  favorites = favorites.filter((c) => c !== city);
  saveFavorites();
}

function renderFavorites() {
  const container = document.getElementById("favorites-container");
  if (!container) return;

  container.innerHTML = "";

  favorites.forEach((city) => {
    const btn = document.createElement("button");
    btn.className = "fav-btn";
    // ИСПРАВЛЕНО: добавляем символ ✖ для удаления
    btn.innerHTML = `${city} <span class="remove-fav">✖</span>`;

    btn.addEventListener("click", async (e) => {
      if (e.target.classList.contains("remove-fav")) {
        e.stopPropagation();
        removeFavorite(city);
      } else {
        cityInput.value = city;
        await getWeather(city);
        await getForecast(city);
      }
    });

    container.appendChild(btn);
  });
}

// Смена фона
function changeBackground(weatherMain) {
  const body = document.body;
  const gradients = {
    Clear: "linear-gradient(135deg, #f5af19 0%, #f12711 100%)",
    Clouds: "linear-gradient(135deg, #757F9A 0%, #D7DDE8 100%)",
    Rain: "linear-gradient(135deg, #2c3e50 0%, #3498db 100%)",
    Drizzle: "linear-gradient(135deg, #3a6186 0%, #89253e 100%)",
    Thunderstorm: "linear-gradient(135deg, #141e30 0%, #243b55 100%)",
    Snow: "linear-gradient(135deg, #e6e9f0 0%, #eef1f5 100%)",
    Mist: "linear-gradient(135deg, #606c88 0%, #3f4c6b 100%)",
    Haze: "linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%)",
  };

  body.style.background =
    gradients[weatherMain] ||
    "linear-gradient(135deg, #4d0f0f 0%, #080708 100%)";
}

// Переключатель °C / °F
function setupUnitToggle() {
  if (unitCelsius) {
    unitCelsius.addEventListener("click", () => {
      if (currentUnit === "F") {
        currentUnit = "C";
        unitCelsius.classList.add("active");
        unitFahrenheit.classList.remove("active");
        if (currentCity) {
          getWeather(currentCity);
          getForecast(currentCity);
        }
      }
    });
  }

  if (unitFahrenheit) {
    unitFahrenheit.addEventListener("click", () => {
      if (currentUnit === "C") {
        currentUnit = "F";
        unitFahrenheit.classList.add("active");
        unitCelsius.classList.remove("active");
        if (currentCity) {
          getWeather(currentCity);
          getForecast(currentCity);
        }
      }
    });
  }
}

// Обработчики событий
searchBtn.addEventListener("click", async () => {
  const city = cityInput.value.trim();

  if (!city) {
    showError("❌ Введите название города");
    return;
  }

  await getWeather(city);
  await getForecast(city);
});

locationBtn.addEventListener("click", () => {
  getLocation();
});

// Кнопка добавления в избранное
const addFavoriteBtn = document.createElement("button");
addFavoriteBtn.textContent = "⭐ Добавить в избранное";
addFavoriteBtn.className = "add-favorite-btn";
addFavoriteBtn.addEventListener("click", () => {
  if (currentCity) {
    addFavorite(currentCity);
  } else {
    showError("❌ Сначала найдите город");
  }
});

const weatherCard = document.getElementById("weather-card");
if (weatherCard) {
  weatherCard.appendChild(addFavoriteBtn);
}

// Инициализация
setupUnitToggle();
loadFavorites();
