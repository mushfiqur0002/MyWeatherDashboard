# Weather Dashboard

A modern, responsive weather dashboard built with React, Vite and Tailwind CSS that provides current weather information and 5-day forecasts for any city worldwide.

## Features

### Current Weather Display
- Real-time weather data for any city
- Current temperature in Celsius
- Weather description with visual indicators
- Humidity and wind speed information
- Clean, modern UI with responsive design

### 5-Day Weather Forecast
- Extended forecast showing the next 5 days
- Daily high and low temperatures
- Weather icons from OpenWeatherMap
- Weather descriptions for each day
- Additional details including humidity and wind speed
- Card-based layout for easy reading

## Technology Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for styling
- **OpenWeatherMap API** - Weather data provider

## API Integration

The application uses the OpenWeatherMap API to fetch:
- Current weather data via the `/weather` endpoint
- 5-day forecast data via the `/forecast` endpoint
- *IMPORTANT*- Update the ".env" file with your OpenWeatherMap API KEY.

Both endpoints are called simultaneously when searching for a city, providing comprehensive weather information.
