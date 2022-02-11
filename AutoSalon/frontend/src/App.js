import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import AddOptions from './pages/addOptions/AddOptions';
import CarPage from './pages/cars/Car';
import Cars from './pages/cars/Cars';
import CarModel from './pages/carModels/CarModelPage';
import CarModelsList from './pages/carModels/CarModelsListPage';
import Home from './pages/Home';
import Logout from './pages/auth/Logout';
import Login from './pages/auth/Login';
import Navbar from './components/Navbar';
import Profile from './pages/user/ProfilePage';
import Sales from './pages/sale/Sales';
// import { UserLogout } from './slices/userSlice';
// import CarModelsPage from './pages/CarModelsPage';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    <Route exact path="/" element={<Home/>} />
                    <Route exact path="/cars" element={<Cars/>} />
                    <Route exact path="/car/:vin" element={<CarPage/>} />
                    <Route exact path="/carmodels" element={<CarModelsList/>} />
                    <Route path="/carmodels/:id" element={<CarModel/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/logout" element={<Logout/>} />
                    <Route path="/profile" element={<Profile/>} />
                    <Route path="/sales" element={<Sales/>} />
                    {/* <Route path="/sales/:id" element={<Sales/>} /> */}
                    <Route path="/add-options" element={<AddOptions/>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
