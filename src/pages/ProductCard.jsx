import React from 'react';
import PropTypes from 'prop-types';

export default class ProductCard extends React.Component {
  render() {
    const { title, price, thumbnail } = this.props;
    return (
      <div className="product-card" data-testid="product">
        <h3>{title}</h3>
        <img src={ thumbnail } alt={ title } width="100px" />
        <p>
          R$&nbsp;
          <span>{ price.toFixed(2) }</span>
        </p>
      </div>
    );
  }
}

ProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
};
