import React, { useState, useRef } from "react"
import "./App.scss"
import Picker from "./components/Picker"
import Table from "./components/Table"
import DataTimer from "./components/DataTimer"

function App() {
  const [updateInterval, setUpdateInterval] = useState(10)
  const [data, setData] = useState([]) // model at top of application
  const timerRef = useRef() // used to avoid react re-renders affecting the timer
  const dataUrl = "https://liquality.io/swap/agent/api/swap/marketinfo"
  return (
    <div className="App">
      <DataTimer
        dataUrl={dataUrl}
        updateInterval={updateInterval}
        setData={setData}
        timerRef={timerRef}
      >
        <header className="App-header">
          <h1>Market Information</h1>
          <Picker updateInterval={updateInterval} picked={setUpdateInterval} />
        </header>
      </DataTimer>
      <Table data={data} />
    </div>
  )
}

export default App
