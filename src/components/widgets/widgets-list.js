'use strict';

import React from 'react';
import WidgetsListItem from './widgets-list-item';
import Search from '../search';

class WidgetsList extends React.Component {
  renderWidgets() {
    return (
      <div className={'WidgetsList ' + this.props.widgetListClass}>
        <table className="table">
          <thead className="fixed">
            <tr>
              <th className="text-center">ID</th>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {this.renderIndividualWidgets()}
          </tbody>
        </table>
      </div>
    );
  }

  renderIndividualWidgets() {
    return this.props.widgets.map(widget => {
      let isIntlSupported = typeof window.Intl !== 'undefined' ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(widget.price) : '$' + widget.price;

      return (
        <WidgetsListItem
          key={widget.id}
          id={widget.id}
          name={widget.name}
          price={isIntlSupported}
          color={widget.color}
          inventory={widget.inventory}
          melts={widget.melts} />
      );
    });
  }

  noWidgetsFound() {
    return (
      <table className="table">
        <tr><td>No Widgets Found</td></tr>
      </table>
    );
  }

  render() {
    let {widgets, handleSearchFilter, shouldSearchFilterReset, gridClassName} = this.props;
    let hasWidgets = widgets.length;
    let isSearching = this.props.isSearching ? true : false;

    return (
      <div className={gridClassName}>
        <div className="Widget widget">
          <div className="widget-header">Widgets
            <div className="pull-right">
              <Search
                placeholder="Search widgets..."
                disabled={hasWidgets || isSearching ? false : true}
                searchName="widgets"
                searchCritera="name"
                shouldSearchFilterReset={shouldSearchFilterReset}
                onChange={handleSearchFilter} />
              </div>
          </div>
          <div className="table-responsive">
            {hasWidgets ? this.renderWidgets() : this.noWidgetsFound()}
          </div>
        </div>
      </div>
    );
  }

}

WidgetsList.defaultProps = {
  gridClassName: 'col-lg-6',
  widgetListClass: 'WidgetsList--notFixed'
};

export default WidgetsList;
