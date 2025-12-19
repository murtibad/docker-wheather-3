cat <<EOF > main.js
import { getWeather } from './services/weather.js';
import { getTime } from './services/time.js';
import { getCountry } from './services/country.js';

async function loadDashboard() {
    console.log("Dashboard yükleniyor...");
    
    // Hava Durumu
    try {
        const weather = await getWeather(41.01, 28.97);
        document.getElementById('weather-card').innerHTML = "<h3>☀️ Hava</h3><p>" + weather.current_weather.temperature + "°C</p>";
    } catch (e) { document.getElementById('weather-card').innerHTML = "Hava Hatası"; }

    // Zaman
    try {
        const timeData = await getTime('Europe/Istanbul');
        const displayTime = timeData.datetime ? timeData.datetime.substring(11, 16) : "Hata";
        document.getElementById('time-card').innerHTML = "<h3>🕒 Saat</h3><p style='font-size:1.5rem'>" + displayTime + "</p>";
    } catch (e) { document.getElementById('time-card').innerHTML = "Saat Hatası"; }

    // Ülke
    try {
        const country = await getCountry('TR');
        document.getElementById('country-card').innerHTML = "<h3>🏳️ Ülke</h3><img src='" + country[0].flags.png + "' width='60' />";
    } catch (e) { document.getElementById('country-card').innerHTML = "Ülke Hatası"; }
}

// Sayfa tamamen yüklendiğinde çalıştır
window.addEventListener('DOMContentLoaded', loadDashboard);
EOF
