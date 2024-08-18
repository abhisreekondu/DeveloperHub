import React from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import Myprofile from './Myprofile';
import Indprofile from './Indprofile';

import './App.css'

function App() {
  return (
   
     
        <BrowserRouter>
         <div className="App">
       
        <Routes>
           <Route path="/login" element={<Login/>} />

          <Route path="/register" element={<Register/>} />
          <Route path="/" element={<Login/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/myprofile" element={<Myprofile/>} />
          <Route path="/indprofile/:name/:email/:mobile/:skill/:id" element={<Indprofile/>} />
          </Routes>
          
        
    </div>
    </BrowserRouter>
  );
}

export default App;
