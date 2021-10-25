import React from 'react';
import './App.css';
// Remoção de itens acima (logo), desnecessários para o projeto
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/Home'; // Componente da tela inicial

class App extends React.Component {
  render() {
    return (
      <div>
        {/* Rotas dinamicas para as paginas */}
        <BrowserRouter>
          <Route exact path="/" component={ Home } />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
