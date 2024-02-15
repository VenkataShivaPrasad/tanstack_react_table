
import './App.css'
import ReactTable from "./components/ReactTable"

const App = () => {
  return (
    <div className="navbar">
      <div className="appName">
        <h2>Tanstack Table 🔥</h2>
      </div>
      
      <div className="react-table">
        <ReactTable/>
      </div>
    </div>
  )
}

export default App
