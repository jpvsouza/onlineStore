import React from 'react';
import { getProductsFromCategoryAndQuery } from '../services/api';
import ProductCard from './ProductCard';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    // Criação dos estados iniciais da página
    this.state = {
      search: '',
      isLoading: false,
      products: [],
    };
  }

  // Função que atualiza o estado do input de busca
  handleChange = (e) => {
    this.setState({
      search: e.target.value,
    });
  }

  // Função de requisição da API pelo clique no botão de pesquisar
  handleClick = (e) => {
    e.preventDefault();
    const { search } = this.state;
    this.setState({ isLoading: true });
    getProductsFromCategoryAndQuery('', search)
      .then((response) => this.setState({ products: response.results }));
  }

  render() {
    const { isLoading, products } = this.state;
    return (
      <div>
        <form action="">
          <input data-testid="query-input" type="text" onChange={ this.handleChange } />
          <button data-testid="query-button" type="button" onClick={ this.handleClick }>
            Pesquisar
          </button>
        </form>
        <h1 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h1>
        <div className="product-container">
          { // Mostra a mensagem de carregando enquanto a api é requisitada
            isLoading && <h1>Carregando...</h1>
          }
          { // Chama o card de produtos para cada item na resposta da API
            products.length > 0 && products.map((product) => (
              <ProductCard
                key={ product.id }
                title={ product.title }
                price={ product.price }
                thumbnail={ product.thumbnail }
              />
            ))
          }
        </div>
      </div>
    );
  }
}
