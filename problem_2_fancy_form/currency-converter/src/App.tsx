import React from 'react';
import logo from './logo.svg';
import './App.css';
import AssetConvertForm from './Components/AssetConvertForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Currency Converter</h1>
        <AssetConvertForm/>
      </header>
    </div>
  );
}

export default App;
