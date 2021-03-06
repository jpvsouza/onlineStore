import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class ProductCard extends React.Component {
  render() {
    const { title, price, thumbnail, id, addToCart } = this.props;
    return (
      <div className="product-card" data-testid="product">
        <Link
          data-testid="product-detail-link"
          to={ { pathname: `/product/${id}`, state: { } } }
          className="LinkCard"
        >
          <h3 className="text">{title}</h3>
          <img src={ thumbnail } alt={ title } width="100px" className="product-image" />
          <p>
            R$&nbsp;
            <span>{ price.toFixed(2) }</span>
          </p>
        </Link>
        <button
          type="button"
          data-testid="product-add-to-cart"
          id={ id }
          onClick={ () => addToCart(id) }
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
