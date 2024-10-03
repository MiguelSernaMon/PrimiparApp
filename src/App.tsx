import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUpPage from './pages/Signup';
import { IonReactRouter } from '@ionic/react-router';
import { IonRouterOutlet } from '@ionic/react';

const App: React.FC = () => {
  // Manage authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(storedAuth === 'true');
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('isAuthenticated', 'false');
  };

  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/login" component={Login} />
        <Redirect exact from="/" to="/login" />
        <Route path="/sign-up" component={SignUpPage} />
        <Route path="/home" component={Home} />
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default App;
