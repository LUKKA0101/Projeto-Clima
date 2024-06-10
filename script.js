const form = document.querySelector('.busca');

let horario = new Date();
let hora = horario.getHours();


mostrarBody()

function mostrarBody() {
    const body = document.querySelector('body');
    const titulo = document.querySelector('h1');

    if(hora >= 6 && hora < 12) {
       body.style.backgroundImage = 'url(image/manha.jpg)';
    }
    else if (hora >= 12 && hora < 18) {
        body.style.backgroundImage = 'url(image/tarde.jpg)';
        titulo.innerHTML = '<h1 style="color: black">Olá, Boa Tarde!</h1>';
        document.querySelector('#searchInput').style.color = '#000'
        document.querySelector('button').style.color = '#000'
        document.querySelector('h3').style.color = 'black';
    } else {
        body.style.backgroundImage = 'url(image/noite.jpg)';
        titulo.innerHTML = '<h1>Olá, Boa Noite</h1>'
        document.querySelector('footer').style.color = '#fff';
        document.querySelector('footer a').style.color = '#fff';
        document.querySelector('#searchInput').style.borderColor = '#fff';
    }
}
form.addEventListener('submit', async (event) => {
    event.preventDefault()

    const input = document.querySelector('#searchInput').value;

    if(input !== '') {
        clearInfo()
        showWarning('Carregando...')
        
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=7fece14b19af8757bf097761d953de1c&units=metric&lang=pt_br`;
        let results = await fetch(url)
        let json = await results.json();
    
        if(json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpped: json.wind.speed,
                windAngle: json.wind.deg,
                sensacaoTermica: json.main.feels_like,
                tempMin: json.main.temp_min,
                tempMax: json.main.temp_max
            })
        } else {
            clearInfo()
            showWarning('Localização não encotrada!')   
        }
    } else {
        clearInfo()
    }
});

function showInfo (json) {
    showWarning('');
    
    document.querySelector('.resultado').style.display = 'block';
    document.querySelector('.nome-da-cidade').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpped} <span>km/h</span>`;

    document.querySelector('.sensacao-termica').innerHTML = `Sensação térmica:<br>${json.sensacaoTermica}°C`;
    document.querySelector('.temp-minima').innerHTML = `Min:<br>${json.tempMin}°C`;
    document.querySelector('.temp-maxima').innerHTML = `Max:<br>${json.tempMax}°C`;

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle - 90}deg)`;
}


function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg
}

function clearInfo () {
    showWarning('')
    document.querySelector('.resultado').style.display = 'none'
}