import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CategoryList extends Component {
  handleClickAPI = ({ target }) => {
    const { setCategoriesByTermAndID } = this.props;
    setCategoriesByTermAndID(target.id, target.value);
  }

  // cria o array que sera renderizado no CategoryList, usando a props passada pelo pai (App).
  renderCategories = () => {
    const { AllCategories } = this.props;
    const result = AllCategories.map((element) => {
      const { id, name } = element;
      return (
        <div key={ id }>
          <label htmlFor={ id }>
            <input
              type="radio"
              name="lista"
              id={ id }
              value={ name }
              data-testid="category"
              onClick={ this.handleClickAPI }
            />
            <span>
              {name}
            </span>
          </label>
        </div>
      );
    });
    return (result);
  }

  render() {
    return (
      <div>
        {this.renderCategories()}
      </div>
    );
  }
}

CategoryList.propTypes = {
  AllCategories: PropTypes.arrayOf(PropTypes.object).isRequired,
  setCategoriesByTermAndID: PropTypes.func,
};

CategoryList.defaultProps = {
  setCategoriesByTermAndID: () => null,
};
