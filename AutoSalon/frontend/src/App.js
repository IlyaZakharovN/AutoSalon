import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import CarModelsList from './pages/CarModelsListPage';
import Navbar from './components/Navbar';
import CarModel from './pages/CarModelPage';
// import CarModelsPage from './pages/CarModelsPage';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    <Route exact path="/carmodels" element={<CarModelsList/>} />
                    <Route path="/carmodels/:id" element={<CarModel/>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
