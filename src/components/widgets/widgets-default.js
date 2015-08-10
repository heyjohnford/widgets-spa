'use strict';

import React from 'react';
import Header from '../header';
import WidgetsCard from './widgets-card';
import WidgetsList from './widgets-list';

class WidgetsIndex extends React.Component {

  render() {
    let {widgets, widgetsCount} = this.props;
    return (
      <div id="content-wrapper">
        <Header paneName="Widgets" />
        <div className="row">
          <WidgetsCard widgetsCount={widgetsCount} gridClassName="col-lg-12" />
        </div>
        <div className="row">
          <WidgetsList widgets={widgets} gridClassName="col-lg-12" />
        </div>
      </div>
    );
  }

}

export default WidgetsIndex;
