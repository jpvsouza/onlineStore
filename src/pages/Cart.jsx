import React from 'react';
import PropTypes from 'prop-types';

export default class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      cartProduct: [],
      arr: [],
    };
  }

  async componentDidMount() {
    await this.fetchCartProducts();
    this.getArrayFromProps();
  }

  getArrayFromProps = () => {
    const { location: { state } } = this.props;
    this.setState({ arr: state });
  }

  fetchCartProducts = async () => {
    const { location: { state } } = this.props;
    const URL = `https://api.mercadolibre.com/items?ids=${state}`;
    return fetch(URL)
      .then((response) => response.json())
      .then((d) => this.setState({ cartProduct: d }));
  }

  render() {
    const { cartProduct, arr } = this.state;
    return (
      <div>
        <h1 data-testid="shopping-cart-empty-message">
          Seu carrinho está vazio
        </h1>
        {cartProduct ? cartProduct.map((pr) => (
          <div key={ pr.body.id }>
            <p
              data-testid="shopping-cart-product-name"
            >
              {pr.body.title}
            </p>
            <img
              src={ pr.body.thumbnail }
              className="product-image"
              alt={ pr.body.title }
            />
            <p data-testid="shopping-cart-product-quantity">
              {/* 1 */}
              {`Quantidade: ${arr.filter((item) => item === pr.body.id).length}`}
            </p>
          </div>
        )) : (<p>Carregando...</p>)}
      </div>
    );
  }
}

Cart.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.arrayOf(PropTypes.string),
  }),
};

Cart.defaultProps = {
  location: PropTypes.arrayOf(PropTypes.any),
};
