import React from 'react';
import { getProductsFromCategoryAndQuery } from '../services/api';

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
    this.funcTest();
    console.log(this.state.arr);
  }

  funcTest = () => {
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
            <p data-testid="shopping-cart-product-quantity">
              {/* 1 */}
              {`Quantidade: ${pr.body.available_quantity}`}
            </p>
          </div>
        )) : (<p>Carregando...</p>)}
      </div>
    );
  }
}
