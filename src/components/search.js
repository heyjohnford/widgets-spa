'use strict';

import React, {PropTypes} from 'react';

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.resetFilter = this.resetFilter.bind(this);
    this.state = {
      filter: ''
    };
  }

  resetFilter(event) {
    event.target.value = '';
    this.handlePropsOnChange(event);
    this.setState({filter: ''});
  }

  handlePropsOnChange(event) {
    let {searchName, searchCritera} = this.props;

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(event, searchName, searchCritera);
    }
  }

  onChange(event) {
    this.handlePropsOnChange(event);
    this.setState({filter: event.target.value});
  }

  componentWillUnmount() {
    // Force a reset of the filter input on unmount
    // ¯\_(ツ)_/¯
    let clear = {target: {}};
    this.resetFilter(clear);
  }

  componentWillUpdate() {
    if (this.props.shouldSearchFilterReset) {
      let clear = {target: {}};
      this.resetFilter(clear);
    }
  }

  render() {
    let isSearchActive = this.state.filter.length ? ' active' : '';

    return (
      <div className="Search">
        <input
          type="text"
          className="form-control input-sm"
          placeholder={this.props.placeholder}
          onChange={this.onChange}
          disabled={this.props.disabled}
          value={this.state.filter} />
        <span className={'Search-reset' + isSearchActive} onClick={this.resetFilter}>&times;</span>
      </div>
    );
  }

}

Search.propTypes = {
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  searchName: PropTypes.string,
  searchList: PropTypes.array,
  searchCritera: PropTypes.string
};

Search.defaultProps = {
  placeholder: 'Search...',
  onChange: null,
  disabled: false
};

export default Search;
