import { getWeather } from './services/weather.js';
import { getTime } from './services/time.js';
import { getCountry } from './services/country.js';

async function loadDashboard() {
    // 1. HAVA DURUMU (Open-Meteo)
    try {
        const weather = await getWeather(41.01, 28.97);
        const weatherCard = document.getElementById('weather-card');
        const temp = weather.current_weather.temperature;
        const wind = weather.current_weather.windspeed;

        weatherCard.innerHTML = `
            <h3>☀️ Hava Durumu</h3>
            <p>Sıcaklık: ${temp}°C</p>
            <p>Rüzgar: ${wind} km/h</p>
        `;
        weatherCard.classList.add(wind > 20 ? 'weather-wind' : 'weather-sunny');
    } catch (error) {
        document.getElementById('weather-card').innerHTML = "<h3>☀️ Hava Durumu</h3><p>Yüklenemedi</p>";
        console.error("Hava durumu hatası:", error);
    }

    // 2. ZAMAN BİLGİSİ (TimeAPI)
    try {
        const time = await getTime('Europe/Istanbul');
        // Yeni API'den gelen format: "10:05" veya "2025-12-19T10:05:46"
        document.getElementById('time-card').innerHTML = `
            <h3>🕒 Yerel Saat</h3>
            <p style="font-size: 1.5rem; font-weight: bold;">${time.time}</p>
            <p>${time.timeZone}</p>
        `;
    } catch (error) {
        document.getElementById('time-card').innerHTML = "<h3>🕒 Yerel Saat</h3><p>Servis Çevrimdışı</p>";
        console.error("Zaman hatası:", error);
    }

    // 3. ÜLKE BİLGİSİ (Rest Countries)
    try {
        const country = await getCountry('TR');
        document.getElementById('country-card').innerHTML = `
            <h3>🏳️ Ülke Bilgisi</h3>
            <img src="${country[0].flags.png}" width="80" style="border-radius: 5px;" />
            <p>${country[0].name.common}</p>
            <p>Para Birimi: ${Object.keys(country[0].currencies)[0]}</p>
        `;
    } catch (error) {
        document.getElementById('country-card').innerHTML = "<h3>🏳️ Ülke Bilgisi</h3><p>Yüklenemedi</p>";
        console.error("Ülke hatası:", error);
    }
}

loadDashboard();
