import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import AddOption from './pages/addOptions/AddOption';
import AddOptions from './pages/addOptions/AddOptions';
import CarPage from './pages/cars/Car';
import Cars from './pages/cars/Cars';
import CarModel from './pages/carModels/CarModel';
import CarModelsList from './pages/carModels/CarModels';
import Home from './pages/Home';
import Logout from './pages/auth/Logout';
import Login from './pages/auth/Login';
import Navbar from './components/Navbar';
import Profile from './pages/user/ProfilePage';
import Sale from './pages/sale/Sale';
import Sales from './pages/sale/Sales';
import TestDrives from './pages/test-drives/TestDrives';
import TestDrive from './pages/test-drives/TestDrive';
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
                    <Route exact path="/carmodels/" element={<CarModelsList/>} />
                    <Route path="/carmodels/:id" element={<CarModel/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/logout" element={<Logout/>} />
                    <Route path="/profile" element={<Profile/>} />
                    <Route path="/sales" element={<Sales/>} />
                    <Route path="/sales/:id" element={<Sale/>} />
                    <Route path="/add-options" element={<AddOptions/>} />
                    <Route path="/add-options/:id" element={<AddOption/>} />
                    <Route path="/testdrives" element={<TestDrives/>} />
                    <Route path="/testdrives/:id" element={<TestDrive/>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
