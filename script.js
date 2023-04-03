
function btn() {

    let name = document.getElementById('name');
    let cityName = name.value;


    if (cityName != 0) {
        document.getElementById('err').style.visibility = "hidden";
    }

    // ----------Fetch APi----------

    var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=7f325534a3f95ae95fbcea68796b02db&units=metric`;
    fetch(url).then((res) => {
        return res.json();
    }).then((data) => {
        if (data.cod === 200) {
            showWeatherData(data)
            document.getElementById('show').style.visibility = "visible";
            document.getElementById('show').style.transform = "translateY(0px)";
        }
        else {
            document.getElementById('err').style.visibility = "visible";
        }
    }).catch((error) => {

    })
}

function showWeatherData(data) {

    // --------Temprature--------

    document.getElementById('temp').innerHTML = `${Math.ceil(data.main.temp)}</span><span id="deg">&#176C</span><br><p>${data.weather[0].description}</p></figure>`;
   
    // -------description--------

    const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${data.weather[0]["icon"]}.svg`;
    document.getElementById('description').innerHTML = `<figure>
    <img class="city-icon" src="${icon}" alt="${data.weather[0]["description"]}">`;

    // ----------Time-----------

    const utc_seconds = parseInt(data.dt, 10) + parseInt(data.timezone, 10);
    const utc_milliseconds = utc_seconds * 1000;
    const date = new Date(utc_milliseconds).toUTCString();
    d = date.split('')
    if (d[17] + d[18] >= 18) {
        document.getElementById('day').innerHTML = `<img src="./images/night-unscreen.gif" height="35px" width="35px">`
    }
    else {
        document.getElementById('day').innerHTML = `<img src="./images/sun-unscreen.gif" height="35px" width="35px">`

    }
    //----------sunrise/sunset---------

    let date1 = new Date(data.sys.sunrise * 1000).toString();
    let sunrise = date1.slice(16, 24);
    let date2 = new Date(data.sys.sunset * 1000).toString();
    let sunset = date2.slice(16, 24);

    //--------Weather data to display---------

    document.getElementById('cityName').innerHTML = `${data.name},${data.sys.country}`;
    document.getElementById('humidity').innerHTML = `${data.main.humidity}`;
    document.getElementById('wind').innerHTML = `${(Math.ceil(data.wind.speed)) * 3.6}`;
    document.getElementById('sunrise').innerHTML = `${sunrise}`;
    document.getElementById('sunset').innerHTML = `${(sunset)}`;
    document.getElementById('max').innerHTML = `${Math.ceil(data.main.temp_max)}`;
    document.getElementById('min').innerHTML = `${Math.floor(data.main.temp_min)}`;


}

