import React from 'react';
import PropTypes from 'prop-types';

export default class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      ids: [],
    };
  }

  async componentDidMount() {
    if (localStorage.cart) {
      await this.fetchCartProducts();
    }
  }

  fetchCartProducts = async () => {
    await fetch(`https://api.mercadolibre.com/items?ids=${localStorage.getItem('cart')}`)
      .then((response) => response.json())
      .then((json) => this.setState({
        products: json,
        ids: localStorage.getItem('cart').split(','),
      }));
  }

  addToCart = (param) => {
    const cartString = localStorage.getItem('cart')
      ? `${localStorage.getItem('cart')},${param}` : param;
    localStorage.setItem('cart', cartString);
    this.setState({ ids: cartString.split(',') });
  }

  checkQuantity = (productId) => {
    const { products, ids } = this.state;
    const product = products.find((p) => p.body.id === productId);
    const cartItems = ids.filter((pro) => pro === productId).length;
    const maxItems = product.body.available_quantity;
    if (cartItems >= maxItems) {
      return true;
    }
    return undefined;
  }

  render() {
    const { products, ids } = this.state;
    return (
      <div>
        {products.length === 0 && (
          <h1 data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </h1>)}
        {products ? products.map((pr) => (
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
              Quantidade:
              <button
                type="button"
                id={ pr.body.id }
                onClick={ () => this.addToCart(pr.body.id) }
                data-testid="product-increase-quantity"
                disabled={ this.checkQuantity(pr.body.id) }
              >
                +
              </button>
              <span>
                { ids.filter((product) => product === pr.body.id).length }
              </span>
              <button
                type="button"
                data-testid="product-decrease-quantity"
                onClick={ () => {
                  const newArr = localStorage.getItem('cart').split(',');
                  newArr.splice(newArr.indexOf(pr.body.id), 1);
                  this.setState({ ids: newArr }, () => {
                    if (newArr.filter((pdct) => pdct === pr.body.id).length < 1) {
                      this.setState({ products: products
                        .filter((pd) => pd.body.id !== pr.body.id) });
                    }
                  });
                  localStorage.setItem('cart', newArr);
                } }
              >
                -
              </button>
              <button
                type="button"
                onClick={ () => {
                  const newArr = ids
                    .filter((product) => product !== pr.body.id);
                  localStorage.setItem('cart', newArr);
                  this.setState({ products: products
                    .filter((pd) => pd.body.id !== pr.body.id) });
                } }
              >
                X
              </button>
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
