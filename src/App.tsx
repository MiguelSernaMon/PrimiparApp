import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUpPage from './pages/Signup';
import { IonReactRouter } from '@ionic/react-router';
import { IonRouterOutlet } from '@ionic/react';
import LessonsDashboard from './pages/Lessons';

const App: React.FC = () => {
  // Manage authentication state

  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/login" component={Login} />
        <Redirect exact from="/" to="/home" />
        <Route path="/sign-up" component={SignUpPage} />
        <Route path="/home" component={Home} />
        <Route path="/lecciones" component={LessonsDashboard} />
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default App;
