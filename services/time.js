cat <<EOF > services/time.js
export async function getTime(timezone) {
    const res = await fetch("https://worldtimeapi.org/api/timezone/Europe/Istanbul");
    // Eğer worldtimeapi hala bozuksa sistem saatini yedek olarak kullanır
    if (!res.ok) {
        return { datetime: new Date().toISOString(), timezone: "Sistem Saati (Yedek)" };
    }
    return await res.json();
}
EOF
