//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/home/Home'
import Footer from './components/layout/Footer'
import NavBar from './components/layout/NavBar'
import { Route, Routes } from 'react-router-dom';
import ShowPlot from './components/misc/ShowPlot';

function App() {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/showPlot" element={<ShowPlot />} />
            </Routes>
            <Footer />
        </>
    )
    //const [count, setCount] = useState(0)


    //return (
    //  <>
    //    <div>
    //      <a href="https://vitejs.dev" target="_blank">
    //        <img src={viteLogo} className="logo" alt="Vite logo" />
    //      </a>
    //      <a href="https://react.dev" target="_blank">
    //        <img src={reactLogo} className="logo react" alt="React logo" />
    //      </a>
    //    </div>
    //    <h1>Vite + React</h1>
    //    <div className="card">
    //      <button onClick={() => setCount((count) => count + 1)}>
    //        count is {count}
    //      </button>
    //      <p>
    //        Edit <code>src/App.tsx</code> and save to test HMR
    //      </p>
    //    </div>
    //    <p className="read-the-docs">
    //      Click on the Vite and React logos to learn more
    //    </p>
    //  </>
    //)
}

export default App
