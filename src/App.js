import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminView from './components/admin/adminView';
import Login from './components/login';
import Register from './components/register';
import Dashboard from './components/user/dashboard';
import LandingPage from './components/landingPage';

function App() {
    
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<LandingPage />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/dashboard" exact element={<Dashboard />} />
          <Route path="/admin" exact element={<AdminView />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;