import React from 'react';
import { getProductsFromCategoryAndQuery } from '../services/api';
import ProductCard from './ProductCard';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searched: false,
      search: '',
      isLoading: false,
      products: [],
    };
  }

  handleChange = (e) => {
    this.setState({
      search: e.target.value,
    });
  }

  handleClick = () => {
    const { search } = this.state;
    this.setState({ isLoading: true });
    getProductsFromCategoryAndQuery('', search)
      .then((response) => this.setState({ products: response.results }));
  }

  render() {
    const { searched, search, isLoading, products } = this.state;
    // Versão inicial da pagina home, apenas cumprindo o requisito 2
    return (
      <div>
        <input data-testid="query-input" type="text" onChange={ this.handleChange } />
        <button data-testid="query-button" type="button" onClick={ this.handleClick }>
          Pesquisar
        </button>
        <h1 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h1>
        <div className="product-container">
          { isLoading && <h1>Carregando...</h1> }
          { products.length > 0 && products.map((product) => (
            <ProductCard
              key={ product.id }
              title={ product.title }
              price={ product.price }
              thumbnail={ product.thumbnail }
            />
          )) }
        </div>
      </div>
    );
  }
}
