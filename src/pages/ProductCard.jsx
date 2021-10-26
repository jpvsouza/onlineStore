import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class ProductCard extends React.Component {
  render() {
    const { title, price, thumbnail, productId } = this.props;
    return (
      <Link data-testid="product-detail-link" to={ `/product/${productId}` }>
        <div className="product-card" data-testid="product">
          <h3>{title}</h3>
          <img src={ thumbnail } alt={ title } width="100px" />
          <p>
            R$&nbsp;
            <span>{ price.toFixed(2) }</span>
          </p>
        </div>
      </Link>
    );
  }
}

ProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  productId: PropTypes.string.isRequired,
};
