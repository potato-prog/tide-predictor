import React, { useState, useEffect } from 'react'
import './App.css'
import Tide from './tides/index'

function App() {
  const [tides, setTides] = useState([])
  useEffect(() => {
    fetch(
      'https://tidesandcurrents.noaa.gov/mdapi/v1.0/webapi/stations/9413450/harcon.json'
    )
      .then(response => {
        return response.json()
      })
      .then(stationInfo => {
        const tideStation = new Tide().station(stationInfo)
        const today = new Date()
        const threeDaysFromNow = new Date(
          today.getTime() + 3 * 24 * 60 * 60 * 1000
        )
        tideStation.setTimeSpan(today, threeDaysFromNow)
        const tideLevels = tideStation.getExtremesPrediction()
        setTides(tideLevels)
      })
  }, [])
  return (
    <div className="App">
      <header className="App-header"></header>
      <div className="App-content">
        {tides.length ? (
          <>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>High/Low</th>
                  <th>Level</th>
                </tr>
              </thead>
              <tbody>
                {tides.map((tide, index) => (
                  <tr key={index}>
                    <td>{tide.time.toString()}</td>
                    <td>{tide.label}</td>
                    <td>{tide.level}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <p>Loading tide data</p>
        )}
      </div>
    </div>
  )
}

export default App