import React from 'react';
import { BrowserRouter, Route,Routes, Link } from "react-router-dom";
import Layout from './components/Layout';
import CalenderPage from './components/CalenderPage';
import Client from './components/Client';
import Meetings from './components/Meetings';
import {EVENTS} from './data/Event'
import DynamicMeetings from './components/DynamicMeetings';
import {Clients} from './data/Clients'
import AppRoutes from './Routes';

function App() {
  // localStorage.setItem("events", JSON.stringify(EVENTS));
  localStorage.setItem("clients", JSON.stringify(Clients));
  return (
    <BrowserRouter>
    <Layout>
      <AppRoutes/>
     </Layout>
    </BrowserRouter>
  );
}

export default App;
