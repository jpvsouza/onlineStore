import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class ProductCard extends React.Component {
  render() {
    const { title, price, thumbnail, productId } = this.props;
    return (
      <div className="product-card" data-testid="product">
        <Link
          data-testid="product-detail-link"
          to={ {
            pathname: `/product/${productId}`,
            state: { fromDashboard: true },
          } }
        >
          <h3>{title}</h3>
          <img src={ thumbnail } alt={ title } width="100px" />
          <p>
            R$&nbsp;
            <span>{ price.toFixed(2) }</span>
          </p>
        </Link>
      </div>
    );
  }
}

ProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  productId: PropTypes.string.isRequired,
};
