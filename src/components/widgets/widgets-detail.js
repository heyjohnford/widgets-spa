'use strict';

import React, { PropTypes } from 'react';
import Header from '../header';
import Constants from '../constants';
import Utility from '../utilities';

class WidgetsDetail extends React.Component {

  _bind(...handlers) {
    handlers.forEach(handler => this[handler] = this[handler].bind(this));
  }


  constructor(props, context) {
    super(props, context);
    this._bind('setCurrentWidget', 'handleIsEditToggle', 'handleWidgetEditForm', 'updateCurrentWidget');
    this.state = {
      widget: {},
      isEdit: false
    };
  }

  getCurrentWidget() {
    let {router} = this.context;
    Utility.goFetch(`${this.props.BASE_API}/widgets/${router.getCurrentParams().id}`, {}, 'widget', this.setCurrentWidget);
  }

  setCurrentWidget(data) {
    this.setState({widget: data});
  }

  componentWillMount() {
    this.getCurrentWidget();
  }

  componentDidUpdate(prevProps, prevState) {
    // Wait -- if you need to -- exit early if you must
    let {widget, isEdit} = this.state;
    if (!widget.id || isEdit) { return; }
    this.determineIfWidgetHasValidColor();
  }

  determineIfWidgetHasValidColor() {
    let widgetColorNode = React.findDOMNode(this.refs.widgetColor);
    let computedStyle = window.getComputedStyle(widgetColorNode);
    let backgroundColor = computedStyle.getPropertyValue('background-color');

    if (backgroundColor === 'rgba(0, 0, 0, 0)' || backgroundColor === 'transparent') {
      widgetColorNode.classList.add('WidgetsDetail-color--noColor');
      widgetColorNode.setAttribute('title', `Sorry, I cannot programmatically determine this widget's color`);
    } else {
      widgetColorNode.setAttribute('title', widgetColorNode.style.backgroundColor);
    }
  }

  handleIsEditToggle() {
    this.setState({isEdit: !this.state.isEdit});
  }

  handleWidgetEditForm(event) {
    event.preventDefault();
    let formData = this.getFormElements(event.target);
    let editConfig = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=utf-8'
      },
      method: 'put',
      body: JSON.stringify(formData)
    };

    Utility.goFetch(`/widgets/${this.state.widget.id}/edit`, editConfig, 'widget', this.updateCurrentWidget);
  }

  getFormElements(form) {
    let formObject = {};

    for (let i = 0; i < form.elements.length; i += 1) {
      let element = form[i] || {};
      let hasName = element.hasAttribute('name');

      if (hasName) {
        let name = element.getAttribute('name');
        if (element.type === 'checkbox') {
          formObject[name] = element.checked;
        } else {
          formObject[name] = (element.name === 'id' || element.name === 'inventory') ? parseInt(element.value, 10) : element.value;
        }
      }
    }
    return formObject;
  }

  updateCurrentWidget(response) {
    let {router} = this.context;
    let {ok, data} = response;

    if (ok) {
      this.setState({widget: JSON.parse(data)}, () => {
        let {widget} = this.state;
        let newRouteParams = {
          id: widget.id,
          widgetName: widget.name
        };
        if (router.getCurrentParams().widgetName !== widget.name) {
          router.replaceWith('widgetsdetail', newRouteParams);
        }
        this.handleIsEditToggle();
      });
    }
  }

  renderWidgetAttributes(widget) {
    let widgetColor = {backgroundColor: widget.color};
    return (
      <ul className="clearfix">
        <li className="text-center">
          <span ref="widgetColor" className="WidgetsDetail-color" style={widgetColor}></span>
          <p>color</p>
          <hr />
        </li>
        <li>
          <p className="text-right col-lg-6">Price:</p>
          <p className="col-lg-6">{widget.price}</p>
        </li>
          <p className="text-right col-lg-6">Inventory:</p>
          <p className="col-lg-6">{widget.inventory}</p>
        <li>
          <p className="text-right col-lg-6">Melts:</p>
          <p className="col-lg-6">{widget.melts ? 'Yes' : 'No'}</p>
        </li>
      </ul>
    );
  }

  renderWidgetEditForm(widget) {
    return (
      <ul className="clearfix">
        <li className="WidgetsDetail-listItem clearfix">
          <label className="WidgetsDetail-label col-lg-4">Color: </label>
          <input className="WidgetsDetail-input col-lg-8" type="text" name="color" defaultValue={widget.color} />
        </li>
        <li><hr /></li>
        <li className="WidgetsDetail-listItem clearfix">
          <label className="WidgetsDetail-label col-lg-4">Price: </label>
          <input className="WidgetsDetail-input col-lg-8" type="text" name="price" defaultValue={widget.price} />
        </li>
        <li className="WidgetsDetail-listItem clearfix">
          <label className="WidgetsDetail-label col-lg-4">Inventory: </label>
          <input className="WidgetsDetail-input col-lg-8" type="text" name="inventory" defaultValue={widget.inventory} />
        </li>
        <li className="WidgetsDetail-listItem clearfix">
          <label className="WidgetsDetail-label col-lg-4">Melts: </label>
          <input className="WidgetsDetail-input WidgetsDetail-checkbox col-lg-8" type="checkbox" name="melts" defaultChecked={widget.melts} />
        </li>
        <li className="text-right">
          <button className="btn btn-success" type="submit">Save</button>
        </li>
      </ul>
    );
  }

  renderWidgetNameAttribute(widget) {
    return (
      <h1 className="text-center">
        <small><sup className="u-lightGrey">{widget.id}</sup></small>
        {widget.name}
      </h1>
    );
  }

  renderWidgetNameEditFrom(widget) {
    return (
      <div className="WidgetsDetail-editMode clearfix">
        <label className="WidgetsDetail-label col-lg-4">Name: </label>
        <input className="WidgetsDetail-input col-lg-8" type="text" name="name" defaultValue={widget.name} />
      </div>
    );
  }

  renderEditModeActions() {
    // TODO: Hook these actions up to the router if time will allow it
    if (this.state.isEdit) {
      return (<span className="btn btn-link" onClick={this.handleIsEditToggle}>Cancel</span>);
    }
    return (<span className="btn btn-primary" onClick={this.handleIsEditToggle}>Edit Widget</span>);
  }

  render() {
    let {widget, isEdit} = this.state;

    // Again, wait for the data object to be ready before rendering
    if (!widget.id) { return null; }

    let recommendations = Constants.RECOMMENDATIONS;
    let recommend = recommendations[Math.floor(Math.random() * recommendations.length)];

    return (
      <div className="WidgetsDetail">
        <Header paneName={['Widgets', widget.name]} />
        <div className="col-lg-8 col-lg-push-1">
        </div>
        <form action="#" onSubmit={this.handleWidgetEditForm} encType="multipart/form-data" name="widgetForm">
          <input type="hidden" name="id" value={widget.id} />
          <div className="col-lg-3">
            <div className="text-right">
              {this.renderEditModeActions()}
            </div>
            { isEdit ? this.renderWidgetNameEditFrom(widget) : this.renderWidgetNameAttribute(widget) }
            <hr />
            { isEdit ? this.renderWidgetEditForm(widget) : this.renderWidgetAttributes(widget) }
            <hr />
            <div className="text-center">
              <small>Random User Recommendation</small>
              <p className="WidgetsDetail-recommend"><em>{recommend}</em></p>
            </div>
          </div>
        </form>
      </div>
    );
  }

}

WidgetsDetail.contextTypes = {
  router: PropTypes.func.isRequired
};

export default WidgetsDetail;
