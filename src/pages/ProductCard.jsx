import React from 'react';
import PropTypes from 'prop-types';

export default class ProductCard extends React.Component {
  passToApp = ({ target }) => {
    const { addToCart } = this.props;
    const { id } = target;
    addToCart(id);
  }

  render() {
    const { title, price, thumbnail, id } = this.props;
    return (
      <div className="product-card" data-testid="product">
        <h3>{title}</h3>
        <img src={ thumbnail } alt={ title } width="100px" />
        <p>
          R$&nbsp;
          <span>{ price.toFixed(2) }</span>
        </p>
        <button
          type="button"
          data-testid="product-add-to-cart"
          id={ id }
          onClick={ this.passToApp }
        >
          Adicionar ao Carrinho
        </button>
      </div>
    );
  }
}

ProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  id: PropTypes.string,
  addToCart: PropTypes.func,
};

ProductCard.defaultProps = {
  id: undefined,
  addToCart: () => null,
};
