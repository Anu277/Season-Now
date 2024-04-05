
const apiUrl = 'https://api.weatherapi.com/v1/forecast.json?key=0cc4651c057b484fb97235830230506&';
// Get the current date and time
var date = new Date();

// Set the time zone to IST (UTC+5:30)
var ISTOffset = 330 * 60 * 1000;
var ISTDate = new Date(date.getTime() + ISTOffset);

// Get the current hour in IST
var currentHourIST = ISTDate.getUTCHours();

console.log("Current hour in IST: " + currentHourIST);


async function checkWeather(cityName) {
  const response = await fetch(apiUrl + 'q=' + cityName+`&hour=${currentHourIST}` );
  const data = await response.json();
  console.log(data);
  try {
      document.querySelector('.search-results h4').innerHTML='';
      document.querySelector('.city').innerHTML = data.location.name;
      document.querySelector('.temperature').innerHTML = data.forecast.forecastday[0].day.avgtemp_c;
      document.querySelector('.climate').innerHTML = data.forecast.forecastday[0].day.condition.text;
      document.querySelector('.pressure-val').innerHTML = data.current.pressure_mb;
      document.querySelector('.humidity-val').innerHTML = data.forecast.forecastday[0].day.avghumidity;
      document.querySelector(".sunrise").innerHTML=data.forecast.forecastday[0].astro.sunrise;
      document.querySelector(".sunset").innerHTML=data.forecast.forecastday[0].astro.sunset;
      document.querySelector('.wind-speed').innerHTML = data.forecast.forecastday[0].day.avgvis_km;

      const climate=data.forecast.forecastday[0].day.condition.text;
      const tempStr=data.forecast.forecastday[0].day.avgtemp_c;
      const temp=parseInt(tempStr);
      const rain='rain';
      const cloud='cloudy';
      const clear='clear';
      const sun='sun';
      

    if(climate.includes(cloud)){
      document.querySelector('.weather-img img').src="/cloudy day.webp";
      console.log("cloudy");
      document.querySelector('.container').style.backgroundImage=' linear-gradient(160deg, #003350 0%, #4195b5 100%)';
      document.querySelector('.weather').style.backgroundColor='rgba(95, 95, 95, 0.306)';
      document.querySelector('.weather-info').style.backgroundColor='rgba(255, 255, 255,0.3)';
      var elements = document.getElementsByClassName('card');
      for (var i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = '#e9e6cf'; 
      }
    }
    else if(climate.includes(rain)){
      document.querySelector('.weather-img img').src="/rainy day.webp";
      console.log("rainy");
      document.querySelector('.container').style.backgroundImage='linear-gradient(160deg, #4b4b4b, #000a30)';
      document.querySelector('.weather').style.backgroundColor='rgba(95, 95, 95, 0.306)';
      document.querySelector('.weather-info').style.backgroundColor='rgba(255, 255, 255,0.3)';
      var elements = document.getElementsByClassName('card');
      for (var i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = '#e9e6cf'; 
      }
    }
    else if(!climate.includes(rain) && temp<=0){
      document.querySelector('.weather-img img').src="/snowy day.webp";
      console.log("Snow");
      document.querySelector('.container').style.backgroundImage=' linear-gradient(160deg, #ebe0eb, #d19d9b,#6c5571)';
      document.querySelector('.weather').style.backgroundColor='rgba(95, 95, 95, 0.306)';
      document.querySelector('.weather-info').style.backgroundColor='rgba(255, 255, 255,0.3)';
      var elements = document.getElementsByClassName('card');
      for (var i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = '#ffbcd2d8'; 
      }
    }
    else if(!climate.includes(rain) && temp<=21){
      document.querySelector('.weather-img img').src="/cool day.webp";
      console.log("cool");
      document.querySelector('.container').style.backgroundImage=' linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%)';
      document.querySelector('.weather').style.backgroundColor='rgba(95, 95, 95, 0.306)';
      document.querySelector('.weather-info').style.backgroundColor='rgba(255, 255, 255,0.3)';
      var elements = document.getElementsByClassName('card');
      for (var i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = '#a9ffbbd8'; 
      }
    }
    else if((climate.includes(clear) || climate.includes(sun)) && temp<=33){
      document.querySelector('.weather-img img').src="/clear.webp";
      console.log("clear");
      document.querySelector('.container').style.backgroundImage='linear-gradient(160deg, #9ea530, hwb(69 5% 0%), #f7f59f)';
      document.querySelector('.weather').style.backgroundColor='rgba(95, 95, 95, 0.306)';
      document.querySelector('.weather-info').style.backgroundColor='rgba(255, 255, 255,0.3)';
      var elements = document.getElementsByClassName('card');
      for (var i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = '#e9e6cf'; 
      }
    }
    else if(!climate.includes(rain) && temp>34){
      document.querySelector('.weather-img img').src="/sunny day.webp";
      console.log("sunny");
      document.querySelector('.container').style.backgroundImage=' linear-gradient(90deg, #ffdb26 0%, #ffc934 100%)';
      document.querySelector('.weather').style.backgroundColor='rgba(95, 95, 95, 0.306)';
      document.querySelector('.weather-info').style.backgroundColor='rgba(255, 255, 255,0.3)';
      var elements = document.getElementsByClassName('card');
      for (var i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = 'rgba(255, 255, 255, 0.499)'; 
      }
    }
    else{
      document.querySelector('.weather-img img').src="/clear.webp";
      console.log("clear-lat");
      document.querySelector('.container').style.backgroundImage=' linear-gradient(160deg, #86f1ff 0%, #c8d53a 100%)';
      document.querySelector('.weather').style.backgroundColor='rgba(95, 95, 95, 0.306)';
      document.querySelector('.weather-info').style.backgroundColor='rgba(255, 255, 255,0.3)';
      var elements = document.getElementsByClassName('card');
      for (var i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = 'rgba(255, 255, 255, 0.499)'; 
      }
    
    }

  } catch (error) {
    document.querySelector('.search-results h4').innerHTML='Sorry '+data.error.message;
  }
  
}

function handleSearch() {
  const cityInput = document.getElementById('search').value;
  console.log(cityInput);
  checkWeather(cityInput);
}



// Define the media query
const mediaQuery = window.matchMedia('(max-width: 790px)');

// Function to handle media query change
function handleMediaQuery(mediaQuery) {
  if (mediaQuery.matches) {
    // Set the image source for smaller screens
  } else {
    // Set the image source for larger screens
  }
}

// Initial check of the media query
handleMediaQuery(mediaQuery);

// Add event listener for media query changes
mediaQuery.addEventListener('change', handleMediaQuery);
