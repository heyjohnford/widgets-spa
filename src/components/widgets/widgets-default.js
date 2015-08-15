'use strict';

import React from 'react';
import Header from '../header';
import WidgetsCard from './widgets-card';
import WidgetsCreate from './widgets-create';
import WidgetsList from './widgets-list';
import Utility from '../utilities';

class WidgetsIndex extends React.Component {

  constructor() {
    super();
    this.handleIsNewModeToggle = this.handleIsNewModeToggle.bind(this);
    this.updateNewWidget = this.updateNewWidget.bind(this);
    this.handleNewWidgetCreate = this.handleNewWidgetCreate.bind(this);
    this.state = {
      isNewMode: false,
      formError: false
    };
  }

  handleIsNewModeToggle() {
    this.setState({isNewMode: !this.state.isNewMode});
  }

  handleNewWidgetCreate(event) {
    event.preventDefault();
    let form = event.target;
    let formData = Utility.getFormElements(form);
    let newConfig = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=utf-8'
      },
      method: 'post',
      body: JSON.stringify(formData)
    };
    let formErrorAnimation = () => {
      if (this.state.formError === true) {
        let toggleClass = () => form.querySelector('.error').classList.toggle('pulse');
        toggleClass();
        setTimeout(toggleClass, 3500);
      }
    };

    for (let key in formData) {
      let value = formData[key];
      if (value === '') {
        formErrorAnimation();
        return this.setState({formError: true});
      }

      if (key === 'inventory' && isNaN(value)) {
        formErrorAnimation();
        return this.setState({formError: true});
      }
    }

    this.setState({formError: false});
    Utility.goFetch('/widgets/new', newConfig, 'newwidget', this.updateNewWidget);
  }

  updateNewWidget(response) {
    let {ok, data} = response;

    if (ok) {
      this.props.updateAllWidgetsList(data);
      this.handleIsNewModeToggle();
    }

  }

  render() {
    let {widgets, widgetsCount} = this.props;
    return (
      <div id="content-wrapper">
        <Header paneName="Widgets" />
        <div className="row">
          <WidgetsCard widgetsCount={widgetsCount} gridClassName="col-lg-12" />
        </div>
        <div className="row">
          <WidgetsCreate
            isNewMode={this.state.isNewMode}
            handleIsNewModeToggle={this.handleIsNewModeToggle}
            handleNewWidgetCreate={this.handleNewWidgetCreate}
            formError={this.state.formError} />
        </div>
        <div className="row">
          <WidgetsList widgets={widgets} gridClassName="col-lg-12" />
        </div>
      </div>
    );
  }

}

export default WidgetsIndex;
