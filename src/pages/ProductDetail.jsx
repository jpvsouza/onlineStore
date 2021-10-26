import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProductById, getProductsFromCategoryAndQuery } from '../services/api';

export default class ProductDetail extends Component {
  constructor() {
    super();

    this.state = {
      product: '',
      result: '',
    };
  }

  componentDidMount() {
    this.setProduct();
  }

  setProduct = async () => {
    const { match } = this.props;
    const { id } = match.params;
    const product = await getProductById(id);
    const result = await
    getProductsFromCategoryAndQuery(product.category_id, product.title);
    this.setState({ product, result });
  }

  render() {
    const { product, result } = this.state;
    // const { thumbnail, title, price, attributes } = location.state;
    return (
      <div>
        <Link to="/cart" data-testid="shopping-cart-button">Carrinho</Link>
        <p>
          {console.log(product)}
          {console.log(result)}
        </p>
        <p data-testid="product-detail-name">{ product.title }</p>
        <p>{ product.base_price }</p>
        <img src={ product.thumbnail } alt="" />
        <p>{ product.date_created }</p>
      </div>
    );
  }
}

ProductDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
