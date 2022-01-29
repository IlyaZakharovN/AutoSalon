import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import CarModel from './pages/CarModelPage';
import CarModelsList from './pages/CarModelsListPage';
import Home from './pages/Home';
import Logout from './pages/Logout';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Profile from './pages/user/ProfilePage';
// import { UserLogout } from './slices/userSlice';
// import CarModelsPage from './pages/CarModelsPage';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    <Route exact path="/" element={<Home/>} />
                    <Route exact path="/carmodels" element={<CarModelsList/>} />
                    <Route path="/carmodels/:id" element={<CarModel/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/logout" element={<Logout/>} />
                    <Route path="/profile" element={<Profile/>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
