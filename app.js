function getWeather(){
    let apiKey="2fcf65692089cee320dfee2a6bbe888a";
    let city=document.getElementById('city').value;

    if(!city){
        alert('Please enter a city');
        return;
    }

    const currentWeatherUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

        fetch(currentWeatherUrl)
            .then(response => response.json())
            .then(data=> {
                displayWeather(data);
            })
            .catch(error=>{
                console.error('Error',error);
                alert('Error');
            });
    }


    function displayWeather(data){
        const tempDivInfo=document.getElementById('temp-container');
        const weatherInfoDiv=document.getElementById('weather-info');
        const weatherIcon=document.getElementById('weather-icon');

        tempDivInfo.innerHTML='';
        weatherInfoDiv.innerHTML='';

        if(data.cod==='404'){
            weatherInfoDiv.innerHTML=`<p>${data.message}</p>`;
        }else{
            const cityName=data.name;
            const tempeature=Math.round(data.main.temp-273.15);
            const description=data.weather[0].description;
            const iconCode=data.weather[0].icon;
            const iconUrl=`https://openweathermap.org/img/wn/${iconCode}@4x.png`;

            const tempeatureHTML=`<p>${tempeature}°C</p>`;
            const weatherHTMl=`
                <p>${cityName}</p>
                <p>${description}</p>`;
            
            tempDivInfo.innerHTML=tempeatureHTML;
            weatherInfoDiv.innerHTML=weatherHTMl;
            weatherIcon.src=iconUrl;
            weatherIcon.alt=description;

            showImage();            
        }
    }
    function showImage() {
        const weatherIcon = document.getElementById('weather-icon');
        weatherIcon.style.display = 'block'; 
    }
