import { useState } from 'react'

function App() {
  const [city, setCity] = useState('')
  const [weatherData, setWeatherData] = useState(null)
  const [error, setError] = useState(null)

  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
  
  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      )
      const data = await response.json()
      
      if (response.ok) {
        setWeatherData(data)
        setError(null)
      } else {
        setError(data.message)
        setWeatherData(null)
      }
    } catch (err) {
      setError('Failed to fetch weather data')
      setWeatherData(null)
    }
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
