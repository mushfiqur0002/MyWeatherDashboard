import { useState } from 'react'

function App() {
  const [city, setCity] = useState('')
  const [weatherData, setWeatherData] = useState(null)
  const [forecastData, setForecastData] = useState(null)
  const [error, setError] = useState(null)

  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
  
  const fetchWeatherData = async () => {
    try {
      // Fetch current weather
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      )
      const weatherData = await weatherResponse.json()
      
      if (weatherResponse.ok) {
        setWeatherData(weatherData)
        
        // Fetch 5-day forecast
        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
        )
        const forecastData = await forecastResponse.json()
        
        if (forecastResponse.ok) {
          // Process forecast data to get daily forecasts
          const dailyForecasts = processForecastData(forecastData.list)
          setForecastData(dailyForecasts)
        }
        
        setError(null)
      } else {
        setError(weatherData.message)
        setWeatherData(null)
        setForecastData(null)
      }
    } catch (err) {
      setError('Failed to fetch weather data')
      setWeatherData(null)
      setForecastData(null)
    }
  }

  const processForecastData = (forecastList) => {
    const dailyData = {}
    
    forecastList.forEach(item => {
      const date = new Date(item.dt * 1000).toDateString()
      
      if (!dailyData[date]) {
        dailyData[date] = {
          date: date,
          temp_min: item.main.temp_min,
          temp_max: item.main.temp_max,
          description: item.weather[0].description,
          icon: item.weather[0].icon,
          humidity: item.main.humidity,
          wind_speed: item.wind.speed
        }
      } else {
        // Update min/max temperatures
        dailyData[date].temp_min = Math.min(dailyData[date].temp_min, item.main.temp_min)
        dailyData[date].temp_max = Math.max(dailyData[date].temp_max, item.main.temp_max)
      }
    })
    
    // Return first 5 days
    return Object.values(dailyData).slice(0, 5)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (city.trim()) {
      fetchWeatherData()
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h1 className="text-3xl font-bold text-center mb-8">Weather Dashboard</h1>
                
                <form onSubmit={handleSubmit} className="flex gap-4">
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city name"
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                  >
                    Search
                  </button>
                </form>

                {error && (
                  <div className="text-red-500 text-center mt-4">{error}</div>
                )}

                {weatherData && (
                  <div className="mt-6">
                    <h2 className="text-2xl font-semibold">{weatherData.name}, {weatherData.sys.country}</h2>
                    <div className="mt-4">
                      <p className="text-4xl font-bold">{Math.round(weatherData.main.temp)}°C</p>
                      <p className="text-xl capitalize">{weatherData.weather[0].description}</p>
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-gray-500">Humidity</p>
                          <p className="font-semibold">{weatherData.main.humidity}%</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Wind Speed</p>
                          <p className="font-semibold">{weatherData.wind.speed} m/s</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {forecastData && (
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">5-Day Forecast</h3>
                    <div className="space-y-3">
                      {forecastData.map((day, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">
                                {new Date(day.date).toLocaleDateString('en-US', { 
                                  weekday: 'short', 
                                  month: 'short', 
                                  day: 'numeric' 
                                })}
                              </p>
                              <p className="text-sm text-gray-600 capitalize">{day.description}</p>
                            </div>
                            <div className="flex items-center space-x-4">
                              <img 
                                src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                                alt={day.description}
                                className="w-12 h-12"
                              />
                              <div className="text-right">
                                <p className="font-bold text-lg">
                                  {Math.round(day.temp_max)}°/{Math.round(day.temp_min)}°
                                </p>
                                <p className="text-xs text-gray-500">
                                  {Math.round(day.humidity)}% • {Math.round(day.wind_speed)}m/s
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
