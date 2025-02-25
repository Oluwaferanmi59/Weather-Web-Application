import { useState, useEffect } from "react"
import axios from 'axios'
import { IoMdSunny } from "react-icons/io";
import { IoMdRainy } from "react-icons/io";
import { IoMdCloudy } from "react-icons/io";
import { IoMdSnow } from "react-icons/io";
import { IoMdThunderstorm } from "react-icons/io";
import { IoMdSearch } from "react-icons/io";
import { BsCloudHaze2Fill } from "react-icons/bs";
import { BsFillCloudDrizzleFill } from "react-icons/bs";
import { BsEye } from "react-icons/bs";
import { BsWater } from "react-icons/bs";
import { BsThermometer } from "react-icons/bs";
import { BsWind } from "react-icons/bs";
import { TbTemperatureCelsius } from "react-icons/tb";
import { ImFeed, ImSpinner8 } from "react-icons/im";

// ff967d62ccaec6cb303b0fdfbdb803f3
const APIkey = 'ff967d62ccaec6cb303b0fdfbdb803f3';


const App = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState('Bucharest');
  const [inputValue, setInputValue] = useState('');
  const [animate, setAnimate] = useState(false);

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log(inputValue);

    if (inputValue !== ''){
      setLocation(inputValue);
    }

    const input = document.querySelector('input');

    

    input.value = '';

    e.preventDefault();
    
  }
  

  useEffect(()=> {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;

    axios.get(url).then(res => {
      setData(res.data);
    });
  }, [location]);

  if (!data){
    return <div>
      <div><ImSpinner8 className="text-5xl animate-spin"/></div>
    </div>
  }

  let icon;

  switch (data.weather[0].main) {
    case 'Clouds':
      icon = <IoMdCloudy/>;
      break;
    case 'Haze':
      icon = <BsCloudHaze2Fill/>;
      break;
    case 'Rain':
      icon = <IoMdRainy/>;
      break;
    case 'Clear':
      icon = <IoMdSunny/>;
      break;
    case 'Drizzle':
      icon = <BsFillCloudDrizzleFill/>;
      break;
    case 'Snnow':
      icon = <IoMdSnow/>;
      break;
    case 'Thunderstorm':
      icon = <IoMdThunderstorm/>;
      break;
  }
  
  const date = new Date();
  
  return (
    <div className="w-full h-screen bg-slate-400 bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-4 lg:px-0">
      <form className="h-16 bg-black/30 w-full max-w-[450px] rounded-full backdrop-blur-[32px] mb-8">
        <div className="h-full relative flex items-center justify-between p-2">
          <input onChange={(e)=> handleInput(e)} className="flex-1 bg-transparent outline-none placeholder:text-white text-white text-[15px] font-light pl-6 h-full" type="text" placeholder="Search by city or country" />
          <button onClick={(e) => handleSubmit(e)} className="bg-[#1ab8ed] hover:bg-[#15abdd] w-20 h-12 rounded-full flex justify-center items-center transition"><IoMdSearch className="text-2xl text-white"/></button>
        </div>
      </form>
      <div className="w-full bg-black/20 min-h-[584px] text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6">
        <div>
          <div className="flex items-center gap-x-5">
            <div className="text-[87px]">{icon}</div>
            <div>
              <div className="text-2xl font-semibold">{data.name}, {data.sys.country}</div>
              <div>{date.getUTCDate()}/{date.getUTCMonth() + 1}/{date.getUTCFullYear()}</div>
            </div>
          </div>
          <div className="my-20">
            <div className="flex justify-center items-center">
              <div className="text-[144px] leading-none font-light">{parseInt(data.main.temp)}</div>
              <div className="text-4xl"><TbTemperatureCelsius/></div>
            </div>
            <div className="capitalize text-center">{data.weather[0].description}</div>
          </div>
          <div className="max-w-[378px] mx-auto flex flex-col gap-y-6">
            <div className="flex justify-between">
              <div className="flex items-center gap-x-2">
                <div className="text-[20px]"><BsEye/></div>
                <div>Visibility <span className="ml-2">{data.visibility / 1000} km</span></div>
              </div>
              <div className="flex items-center gap-x-2">
                <div className="text-[20px]"><BsThermometer/></div>
                <div className="flex">Feel like <div className="flex ml-2">{parseInt(data.main.feels_like)}<TbTemperatureCelsius/></div></div>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-x-2">
                <div className="text-[20px]"><BsWater/></div>
                <div>Humidity <span className="ml-2">{data.main.humidity} %</span></div>
              </div>
              <div className="flex items-center gap-x-2">
                <div className="text-[20px]"><BsWind/></div>
                <div>Wind <span className="ml-2">{data.wind.speed} m/s</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App