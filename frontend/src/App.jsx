import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import CityDetail from "./pages/CityDetail";
import './App.css'


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/city/:id" element={<CityDetail />} />
      </Routes>
    </Router>
  );
}

export default App
;