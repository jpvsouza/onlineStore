import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';

export default class ProductDetail extends Component {
  constructor() {
    super();

    this.state = {
      product: '',
      cartSize: '',
    };
  }

  async componentDidMount() {
    await this.setProduct();
    this.addToCart();
  }

  getProductById = async (productId) => {
    const URL = `https://api.mercadolibre.com/items/${productId}`;
    return fetch(URL)
      .then((response) => response.json())
      .then((data) => data);
  }

  setProduct = async () => {
    const { match } = this.props;
    const { id } = match.params;
    const product = await this.getProductById(id);
    getProductsFromCategoryAndQuery(product.category_id, product.title);
    this.setState({ product });
  }

  // se for chamada sem parametro atualiza o valor do CardSize.
  addToCart = (param) => {
    if (!param) {
      this.setState({ cartSize: localStorage.length > 0 ? localStorage
        .getItem('cart').split(',').length : 0 });
    }
    // Caso seja chamada com Parametro, seta o parametro no localstorage.
    const cartString = localStorage.getItem('cart')
      ? `${localStorage.getItem('cart')},${param}` : param;
    localStorage.setItem('cart', cartString);
    this.setState({ cartSize: localStorage.length > 0 ? localStorage
      .getItem('cart').split(',').length : 0 });
  }

  HandleClick = () => {
    const { match } = this.props;
    const { id } = match.params;
    this.addToCart(id);
  }

  renderProductDetail = () => {
    const { product, cartSize } = this.state;
    return (
      <div className="product-detail">
        <Link to="/cart" data-testid="shopping-cart-button">
          {`Carrinho(${cartSize})`}
        </Link>
        <p data-testid="product-detail-name">{ product.title }</p>
        <p>{ product.base_price }</p>
        <img src={ product.thumbnail } alt="" />
        { product ? product.attributes.map((atr) => (
          <div key={ atr.id }>
            <p>
              { atr.name }
              :
              {' '}
              { atr.value_name }
            </p>
          </div>
        )) : null }
        <button
          type="button"
          onClick={ () => { this.HandleClick(); } }
          data-testid="product-detail-add-to-cart"
        >
          Adicionar ao Carrinho
        </button>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderProductDetail()}
      </div>
    );
  }
}

ProductDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

ProductDetail.defaultProps = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: 'MLB1761790179',
    }),
  }),
};
