export async function getWeatherData() {
  const API_KEY = "b360ae9323cb522c6cf6c3c4ff04dc77";
  const latitude = "37.7749"; // Example coordinates (San Francisco)
  const longitude = "-122.4194";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${b360ae9323cb522c6cf6c3c4ff04dc77}`;

  const response = await fetch(url);
  const data = await response.json();

  return {
    temperature: Math.round(data.main.temp),
    city: data.name,
    temperatureType:
      data.main.temp >= 86 ? "hot" : data.main.temp >= 66 ? "warm" : "cold",
  };
}
