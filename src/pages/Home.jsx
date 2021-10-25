import React from 'react';

export default class Home extends React.Component {
  render() {
    // Versão inicial da pagina home, apenas cumprindo o requisito 2
    return (
      <div>
        <h1 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h1>
      </div>
    );
  }
}
