'use strict';

import React from 'react';
import { Link } from 'react-router';
import Utility from '../utilities';

class WidgetsListItem extends React.Component {

  render() {
    let params = {
      id: this.props.id,
      widgetName: Utility.hyphenateParams(this.props.name)
    };

    return (
      <tr key={this.props.id}>
        <td className="text-center">{this.props.id}</td>
        <td><Link to="widgetsdetail" params={params}>{this.props.name}</Link></td>
        <td>{this.props.price}</td>
      </tr>
    );
  }

}

export default WidgetsListItem;
