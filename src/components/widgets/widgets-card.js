'use strict';

import React from 'react';

class WidgetsCard extends React.Component {

  render() {
    return (
      <div className={this.props.gridClassName + ' col-md-6 col-xs-12'}>
        <div className="widget">
          <div className="widget-header">
            <div className="widget-icon green pull-left">
              <i className="fa fa-users"></i>
            </div>
            <div className="title">{this.props.widgetsCount}</div>
            <div className="comment">Widgets</div>
          </div>
        </div>
      </div>
    );
  }

}

WidgetsCard.propTypes = {};
WidgetsCard.defaultProps = {
  gridClassName: 'col-lg-3'
};

export default WidgetsCard;
