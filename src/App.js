import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MaterialThemeProvider from './providers/theme'

import HomePage from './components/HomePage';
import Layout from './components/Layout';
import "./assets/Home.css"

class App extends Component {
  render() {
    return (
      <MaterialThemeProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </MaterialThemeProvider>
    );
  }
}

export default App;