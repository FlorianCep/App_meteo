const weatherIcons = {
    "Rain": "wi wi-day-rain",
    "Clouds": "wi wi-day-cloudy",
    "Clear": "wi wi-day-sunny",
    "Snow": "wi wi-day-snow",
    "mist": "wi wi-day-fog",
    "Drizzle": "wi wi-day-sleet",
}

function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
}



async function main(withIP = true) {
    // fetch('https://api.ipify.org?format=json').then(resultat => resultat.json()).then(json => {
    //     const ip = json.ip;

    //     fetch('http://freegeoip.net/json/' + ip).then(resultat => resultat.json()).then(json => {
    //         const ville = json.city;
    //         console.log(ville);

    //         fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=f8a654c4f17a1973e984e2199c6f7667&lang=fr&units=metric`).then(resultat => resultat.json()).then(json => {
    //             console.log(json);
    //         })
    //     })
    // });

    let ville;

    if (withIP) {

        const ip = await fetch('https://api.ipify.org?format=json').then(resultat => resultat.json()).then(json => json.ip);

        ville = await fetch('http://api.ipstack.com/' + ip + '?access_key=154b4ebeffa78aa7c2bebfc149ca1b40').then(resultat => resultat.json()).then(json => json.city);
    } else {
        ville = document.querySelector('#ville').textContent;
    }

    const meteo = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=f8a654c4f17a1973e984e2199c6f7667&lang=fr&units=metric`).then(resultat => resultat.json()).then(json => json);

    console.log(meteo);
    displayWeatherInfos(meteo);

}


function displayWeatherInfos(data) {
    const name = data.name;
    const temperature = data.main.temp;
    const conditions = data.weather[0].main;
    const description = data.weather[0].description;

    document.querySelector('#ville').textContent = name;
    document.querySelector('#temperature').textContent = Math.round(temperature);
    document.querySelector('#conditions').textContent = capitalize(description);

    document.querySelector('i.wi').className = weatherIcons[conditions];

    document.body.className = conditions.toLowerCase();
}

const ville = document.querySelector('#ville');

ville.addEventListener('click', () => {
    ville.contentEditable = true;
});

ville.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();
        ville.contentEditable = false;
        main(false);
    }
})

main();