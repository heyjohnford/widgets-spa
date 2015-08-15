'use strict';

import React from 'react';

class WidgetsCreate extends React.Component {

  renderActionButtons() {
    let {isNewMode, handleIsNewModeToggle} = this.props;
    let actionText = isNewMode ? 'Cancel' : 'Create New Widget';
    let actionClass = isNewMode ? 'danger' : 'info';
    return (<button className={`WidgetsCreate-button btn btn-${actionClass} col-lg-12`} onClick={handleIsNewModeToggle}>{actionText}</button>);
  }

  renderFormError() {
    if (this.props.formError) {
      return (
        <small className="WidgetsCreate-msg error">(Something went wrong, please try again.)</small>
      );
    }

    return <span />;

  }

  renderNewWidgetForm() {
    if (!this.props.isNewMode) { return null; }

    return (
      <form className="WidgetsCreate-form" onSubmit={this.props.handleNewWidgetCreate}>
        <h5>Create New Widget {this.renderFormError()}</h5>
        <ul className="clearfix">
          <li className="WidgetsCreate-listItem col-lg-6">
            <label className="WidgetsCreate-label">Name: </label>
            <input className="WidgetsCreate-input" type="text" name="name" defaultValue="" placeholder="eg. Widget Blaster" />
          </li>
          <li className="WidgetsCreate-listItem col-lg-6">
            <label className="WidgetsCreate-label">Color: </label>
            <input className="WidgetsCreate-input" type="text" name="color" defaultValue="" placeholder="eg. lightblue" />
          </li>
          <li className="WidgetsCreate-listItem col-lg-6">
            <label className="WidgetsCreate-label">Price: </label>
            <input className="WidgetsCreate-input" type="text" name="price" defaultValue="" placeholder="eg. 50.00" />
          </li>
          <li className="WidgetsCreate-listItem col-lg-6">
            <label className="WidgetsCreate-label">Inventory: </label>
            <input className="WidgetsCreate-input" type="text" name="inventory" defaultValue="" placeholder="eg. 10" />
          </li>
          <li className="WidgetsCreate-listItem col-lg-6">
            <label className="WidgetsCreate-label">Melts: </label>
            <input className="WidgetsCreate-input WidgetsCreate-checkbox" type="checkbox" name="melts" defaultChecked={true} />
          </li>
          <li className="text-right">
            <button className="btn btn-success" type="submit">Save</button>
          </li>
        </ul>
      </form>
    );
  }

  render() {
    return (
      <div className="WidgetsCreate col-lg-12">
        {this.renderActionButtons()}
        <div className="col-lg-10 col-lg-push-1">
          {this.renderNewWidgetForm()}
        </div>
      </div>
    );
  }

}

export default WidgetsCreate;
