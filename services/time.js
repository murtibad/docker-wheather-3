export async function getTime(timezone) {
    // WorldTimeAPI yerine TimeAPI.io kullanıyoruz
    const res = await fetch(`https://www.timeapi.io/api/Time/current/zone?timeZone=${timezone}`);
    return await res.json();
}
