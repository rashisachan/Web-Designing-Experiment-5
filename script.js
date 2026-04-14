const apiKey = "3f28b493eb05023d12b6b28d29de8b2d";

async function getWeather() {
    const city = document.getElementById("city").value.trim();
    const resultDiv = document.getElementById("result");
    
    if (!city) {
        resultDiv.innerHTML = '<p class="error">❌ Please enter a city name</p>';
        resultDiv.classList.add("show");
        return;
    }
    
    resultDiv.innerHTML = '<p>⏳ Loading...</p>';
    resultDiv.classList.add("show");
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("City not found");
        
        const data = await response.json();
        
        resultDiv.innerHTML = `
            <div class="city-name">📍 ${data.name}, ${data.sys.country}</div>
            <div class="temp">${Math.round(data.main.temp)}°C</div>
            <div class="weather-desc">${data.weather[0].description}</div>
            <div class="details">
                <div class="detail"><span>💧 Humidity</span><span>${data.main.humidity}%</span></div>
                <div class="detail"><span>🌬️ Wind</span><span>${data.wind.speed} m/s</span></div>
                <div class="detail"><span>🔥 Feels Like</span><span>${Math.round(data.main.feels_like)}°C</span></div>
            </div>
        `;
    } catch (error) {
        resultDiv.innerHTML = `<p class="error">❌ ${error.message}. Try again.</p>`;
    }
}

document.getElementById("city").addEventListener("keypress", (e) => {
    if (e.key === "Enter") getWeather();
});
