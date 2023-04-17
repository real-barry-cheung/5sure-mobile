import './App.css';
import React from 'react';
import Drivers from './components/drivers/Drivers'
import Home from './components/home/Home';
import NavigationBar from './components/navigationBar/NavigationBar';
import Queue from './components/queue/Queue';
import Rides from './components/rides/Rides';
import DriverDetail from './components/driverDetail/DriverDetail';
import QueueDetail from './components/queueDetail/QueueDetail';
import RiderDetail from './components/riderDetail/RiderDetail';
import AssignDriver from './components/assignDriver/AssignDriver';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className='AppContainer'>
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/rides" element={<Rides />} />
          <Route path="/queue" element={<Queue />} />
          <Route path="drivers/:driverId" element={<DriverDetail />} />
          <Route path="queue/:riderId" element={<QueueDetail />} />
          <Route path="rides/:driverId" element={<RiderDetail />} />
          <Route path="queue/assign/:riderId" element={<AssignDriver />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
