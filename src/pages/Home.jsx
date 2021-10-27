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
      cartSize: localStorage.cart ? localStorage.length : 0,
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

   // Função que pega dados do componente ProductCart e altera o state do App, para passar como props para a página do Cart
   addToCart = (param) => {
     const cartString = localStorage.getItem('cart')
       ? `${localStorage.getItem('cart')},${param}` : param;
     localStorage.setItem('cart', cartString);
     this.setState({ cartSize: localStorage.length > 0 ? localStorage
       .getItem('cart').split(',').length : 0 });
   }

   render() {
     const { returnFromSearch, cartSize } = this.state;
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
         <Link
           to={ { pathname: '/cart' } }
           data-testid="shopping-cart-button"
         >
           {`Carrinho(${cartSize})`}
         </Link>
         <div className="product-container">
           { // Verifica se o State passado como Props (products) tem algum elemento, se sim renderiza os mesmos, se não renderiza os da pesquisa
             products.length ? (
               products.map((pr) => (
                 <ProductCard
                   key={ pr.id }
                   id={ pr.id }
                   title={ pr.title }
                   price={ pr.price }
                   thumbnail={ pr.thumbnail }
                   name={ pr.name }
                   quantity={ pr.available_quantity }
                   addToCart={ this.addToCart }
                 />)))
               : returnFromSearch.map((p) => (
                 <ProductCard
                   key={ p.id }
                   id={ p.id }
                   title={ p.title }
                   price={ p.price }
                   thumbnail={ p.thumbnail }
                   name={ p.name }
                   quantity={ p.available_quantity }
                   addToCart={ this.addToCart }
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
