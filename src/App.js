import React from 'react';
import './App.css';
// Remoção de itens acima (logo), desnecessários para o projeto
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/Home'; // Componente da tela inicial
import Cart from './pages/Cart';
import CategoryList from './pages/CategoryList';
import { getCategories, getProductsFromCategoryAndQuery } from './services/api';
import ProductDetail from './pages/ProductDetail';
import './Components.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      AllCategories: [],
      ArraytoAPI: [],
      products: [],
    };
  }

  async componentDidMount() {
    await this.setCategories();
  }

  // Puxa as categorias da API do ML e armazena no state em ARRAY (AllCategories)
  setCategories = async () => {
    this.setState({ isLoading: true });
    const result = await getCategories();
    this.setState({
      AllCategories: result,
    });
  }

  // Puxa categorias pelo ID e Termo e altera o state, passada como Props para o componente CategoryList
  setCategoriesByTermAndID = async (id, name) => {
    const RESPONSE = await getProductsFromCategoryAndQuery(id, name);
    this.setState({ products: RESPONSE.results });
  }

  render() {
    const { products } = this.state;
    return (
      <div className="AppBody">
        {/* Rotas dinamicas para as paginas */}
        {/* Passa o state via props */}
        <BrowserRouter>
          <Route exact path="/">
            <div className="CategoryDiv">
              <CategoryList
                { ... this.state }
                setCategoriesByTermAndID={ this.setCategoriesByTermAndID }
              />
            </div>
            <Home
              products={ products }
              className="homeDiv"
            />
            {/* Passa o state via props */}
          </Route>
          <Route path="/cart" component={ Cart } />
          <Route path="/product/:id" component={ ProductDetail } />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
