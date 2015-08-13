'use strict';

import React from 'react';
import { RouteHandler } from 'react-router';

class WidgetsIndex extends React.Component {

  render() {
    let {widgets, widgetsCount, BASE_API} = this.props;
    return (
      <div id="content-wrapper">
        <RouteHandler
          widgetsCount={widgetsCount}
          widgets={widgets}
          BASE_API={BASE_API} />
      </div>
    );
  }

}

export default WidgetsIndex;
