import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';
import ProductCard from './ProductCard';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    // Criação dos estados iniciais da página
    this.state = {
      search: '',
      returnFromSearch: [],
    };
  }

  // Função que atualiza o estado do input de busca
  handleChange = (e) => {
    this.setState({
      search: e.target.value,
    });
  }

  // Função de requisição da API pelo clique no botão de pesquisar
  handleClick = (event) => {
    event.preventDefault();
    const { search } = this.state;
    getProductsFromCategoryAndQuery('', search)
      .then((response) => this.setState({ returnFromSearch: response.results }));
  }

  render() {
    const { returnFromSearch } = this.state;
    const { products } = this.props;
    return (
      <div>
        <form>
          <input data-testid="query-input" type="text" onChange={ this.handleChange } />
          <button data-testid="query-button" type="submit" onClick={ this.handleClick }>
            Pesquisar
          </button>
        </form>
        <h1 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h1>
        <Link to="/cart" data-testid="shopping-cart-button">Carrinho</Link>
        <div className="product-container">
          { // Verifica se o State passado como Props (products) tem algum elemento, se sim renderiza os mesmos, se não renderiza os da pesquisa
            products.length ? (
              products.map((pr) => (
                <ProductCard
                  key={ pr.id }
                  title={ pr.title }
                  price={ pr.price }
                  thumbnail={ pr.thumbnail }
                  productId={ pr.id }
                />)))
              : returnFromSearch.map((p) => (
                <ProductCard
                  key={ p.id }
                  title={ p.title }
                  price={ p.price }
                  thumbnail={ p.thumbnail }
                  productId={ p.id }
                />))
          }
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
};
