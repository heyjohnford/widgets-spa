'use strict';

import React from 'react';
import Header from '../header';
import WidgetsCard from './widgets-card';
import WidgetsList from './widgets-list';

class WidgetsIndex extends React.Component {

  render() {
    return (
      <div id="content-wrapper">
        <Header paneName="Widgets" />
        <div className="row">
          <WidgetsCard widgetsCount={this.props.widgetsCount} gridClassName="col-lg-12" />
        </div>
        <div className="row">
          <WidgetsList gridClassName="col-lg-12" />
        </div>
      </div>
    );
  }

}

export default WidgetsIndex;
