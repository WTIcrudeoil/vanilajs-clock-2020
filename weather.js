const weather =document.querySelector(".js-weather");

const API_KEY ="86c7333f4a314d4b7ae960e38b0db2e6";
const COORDS ="coords";

function getWeather(lat,lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`).then(function(response){
        return response.json();
    })
    .then(function(json){
        const temp =json.main.temp;
        const place = json.name;
        weather.innerText =`${temp}℃ @${place}`;
    });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude:latitude,
        longitude:longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}

function handleGeoError(){
    console.log("Can't access geo-location");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces,handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords ===null){
        askForCoords();
    }else{
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude,parseCoords.longitude);
    }

}

function init(){
    loadCoords();
}

init();