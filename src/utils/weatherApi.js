export async function getWeatherData() {
  const API_KEY = "YOUR_API_KEY";
  const latitude = "37.7749"; // Example coordinates (San Francisco)
  const longitude = "-122.4194";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();

  return {
    temperature: Math.round(data.main.temp),
    city: data.name,
    temperatureType:
      data.main.temp >= 86 ? "hot" : data.main.temp >= 66 ? "warm" : "cold",
  };
}
