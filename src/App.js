import React,{useState} from 'react'
import './App.css';

const dData = {
  api:"216ea5785a80dcabdbb7fade3bb6f0f0",
  link:'https://api.openweathermap.org/data/2.5/'
};
function App() {
  const dateGen = (d) =>{
    let months =[ "January","February","March","April","May","June","July","August","September","Octomber","November","December"];
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year} `
  }
  const[query,setQuery] = useState('');
  const[weather,setWeather] = useState({});
  const search = evt =>{
    if (evt.key ==="Enter"){
      fetch(`${dData.link}weather?q=${query}&units=metric&APPID=${dData.api}`)
      .then(res => res.json())
      .then(results => {
        setWeather(results);
        setQuery('');
      });
    }
  }
  return (
   <main>
     <div className="searchBox">
       <input 
       type="text"
       placeholder="Enter City..."
       className="Search"
       onChange={ e=> setQuery(e.target.value)}
       value={query}
       onKeyPress={search}
       />
     </div>
     {(typeof weather.main != "undefined") ? ( 
     <div>
     <div className="Result">
       <div className="location">{weather.name},{weather.sys.country}</div>
       <div className="date">{dateGen(new Date())}</div>
       <div className="Weather-type">{weather.weather[0].main}</div>
       <div className="degree"> {Math.round(weather.main.temp)}°C</div>

     </div>
     </div>):('')}

   </main>
  )
}

export default App;
