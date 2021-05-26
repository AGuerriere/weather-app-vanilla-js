document.getElementById("searchForm").addEventListener('submit', searchCity)
document.getElementById("submit").addEventListener('click', searchCity)

function searchCity(e) {
    e.preventDefault();

    let input = document.getElementById("input");
    splitArray = input.value.split(" ")
    getWeatherData(splitArray.join('+'))
    input.value = ""
}

function getWeatherData(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiToken}`)
    .then((res) => res.json())
    .then((data) => updateCard(data))
    .catch(()=> document.getElementById("error").innerHTML = "Invalid City/Town")
}

function updateCard(obj) {
    document.getElementById("error").innerHTML = ''
    const icon = document.getElementById("icon");
    document.getElementById("displayCity").innerHTML = `${obj.name}, ${obj.sys.country}`
    icon.setAttribute("src", `http://openweathermap.org/img/wn/${obj.weather[0].icon}@4x.png`)
    document.getElementById("temperature").innerHTML = `${obj.main.temp}°C`
    document.getElementById("feelsLike").innerHTML = `Feels like: ${obj.main.feels_like}°C`
    document.getElementById("description").innerHTML = obj.weather[0].description
}

// Call default city on first loading
getWeatherData("london")