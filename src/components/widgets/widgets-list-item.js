'use strict';

import React from 'react';

class WidgetsListItem extends React.Component {

  render() {
    return (
      <tr key={this.props.id}>
        <td className="text-center">{this.props.id}</td>
        <td>{this.props.name}</td>
        <td>{this.props.price}</td>
      </tr>
    );
  }

}

export default WidgetsListItem;
