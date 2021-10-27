import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';

export default class ProductDetail extends Component {
  constructor() {
    super();

    this.state = {
      product: '',
    };
  }

  async componentDidMount() {
    await this.setProduct();
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
    // const result = await
    getProductsFromCategoryAndQuery(product.category_id, product.title);
    this.setState({ product });
  }

  renderProductDetail = () => {
    const { product } = this.state;
    return (
      <div className="product-detail">
        <Link to="/cart" data-testid="shopping-cart-button">Carrinho</Link>
        <p>
          {console.log(product)}
        </p>
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
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderProductDetail()}
        {console.log(this)}
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
