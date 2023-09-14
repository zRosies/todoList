import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App.jsx'; // Import your main App component here
import Home from './components/Home';
import Study from './components/Study';
import Development from './components/Development';
import Work from './components/Work';
import Other from './components/Other';
import './index.css';
import Search from './components/Search.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}> {/* Wrap your top-level routes in the <App> component */}
          <Route path="/" element={<Home />} />
          <Route path="/study" element={<Study />} />
          <Route path="/dev" element={<Development />} />
          <Route path="/work" element={<Work />} />
          <Route path="/other" element={<Other/>} />
          <Route path="/search" element={<Search/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);