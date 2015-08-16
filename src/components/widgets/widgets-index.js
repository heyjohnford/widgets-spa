'use strict';

import React from 'react';
import { RouteHandler } from 'react-router';

class WidgetsIndex extends React.Component {

  componentWillUnmount() {
    this.props.resetToDefaultSettings();
  }

  render() {
    let {
      widgets,
      widgetsCount,
      updateAllWidgetsList,
      updateSingleWidgetList,
      handleSearchFilter,
      isSearching,
      resetToDefaultSettings,
      BASE_API
    } = this.props;

    return (
      <div id="content-wrapper">
        <RouteHandler
          widgetsCount={widgetsCount}
          widgets={widgets}
          updateAllWidgetsList={updateAllWidgetsList}
          updateSingleWidgetList={updateSingleWidgetList}
          handleSearchFilter={handleSearchFilter}
          isSearching={isSearching}
          resetToDefaultSettings={resetToDefaultSettings}
          BASE_API={BASE_API} />
      </div>
    );
  }

}

export default WidgetsIndex;
