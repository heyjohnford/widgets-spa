'use strict';

import React from 'react';
import { RouteHandler } from 'react-router';

class WidgetsIndex extends React.Component {

  render() {
    let {widgets, widgetsCount, updateAllWidgetsList, updateSingleWidgetList, BASE_API} = this.props;

    return (
      <div id="content-wrapper">
        <RouteHandler
          widgetsCount={widgetsCount}
          widgets={widgets}
          updateAllWidgetsList={updateAllWidgetsList}
          updateSingleWidgetList={updateSingleWidgetList}
          BASE_API={BASE_API} />
      </div>
    );
  }

}

export default WidgetsIndex;
