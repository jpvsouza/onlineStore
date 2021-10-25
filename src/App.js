import React from 'react';
import './App.css';
// Remoção de itens acima (logo), desnecessários para o projeto
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/Home'; // Componente da tela inicial
import Cart from './pages/Cart';
import CategoryList from './pages/CategoryList';
import { getCategories } from './services/api';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      AllCategories: [],
    };
  }

  async componentDidMount() {
    this.setCategories();
  }

  // Puxa as categorias da API do ML e armazena no state em ARRAY (AllCategories)
  setCategories = async () => {
    const result = await getCategories();
    this.setState({ AllCategories: result });
  }

  render() {
    return (
      <div>
        {/* Rotas dinamicas para as paginas */}
        {/* Passa o state via props */}
        <BrowserRouter>
          <Route exact path="/" component={ Home } />
          <Route exact path="/cart" component={ Cart } />
          {/* Passa o state via props */}
          <CategoryList { ... this.state } />
        </BrowserRouter>
        <CategoryList { ... this.state } />
      </div>
    );
  }
}

export default App;
