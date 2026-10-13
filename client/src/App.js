import React, { useState } from 'react';
import Home from './services/Pages/Home';
import Login from './services/Pages/login';
import Register from './services/Pages/Register';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState('login'); // 'login' ya 'register'

  // Agar user login ho chuka hai toh Home page dikhao
  if (isLoggedIn) {
    return <Home />;
  }

  // Agar currentView 'register' hai toh Register page dikhao
  if (currentView === 'register') {
    return (
      <Register 
        onSwitchToLogin={() => setCurrentView('login')} 
        onRegisterSuccess={() => setCurrentView('login')} 
      />
    );
  }

  // Default mein Login page dikhao
  return (
    <Login 
      onSwitchToRegister={() => setCurrentView('register')} 
      onLoginSuccess={() => setIsLoggedIn(true)} 
    />
  );
}

export default App;
