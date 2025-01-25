import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import BasicDataProvider from './context/BasicContext';
import Navigation from './global_components/NavBar';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
//import { CreateProject } from './pages/CreateProject';
//import { Projects } from './pages/Projects';
//import { Tasks } from './pages/Tasks';
//import { UpdatePassword } from './pages/UpdatePassword';
//import UpdateTask from './pages/UpdateTasks';
//import { ForgotPasswordEmailPage } from './pages/ForgotPasswordEmailPage';
//import { ResetPasswordPage } from './pages/ResetPasswordPage';
import './App.css';
//<BasicDataProvider> remove this, was covering above Navigation and all routes
const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <BasicDataProvider>
          <Navigation/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login />} />
          </Routes>
        </BasicDataProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
