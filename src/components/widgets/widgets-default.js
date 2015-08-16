'use strict';

import React from 'react';
import Header from '../header';
import WidgetsCard from './widgets-card';
import WidgetsCreate from './widgets-create';
import WidgetsList from './widgets-list';
import Utility from '../utilities';

class WidgetsIndex extends React.Component {

  _bind(...handlers) {
    handlers.forEach(handler => this[handler] = this[handler].bind(this));
  }

  constructor() {
    super();
    this._bind(
      'handleIsNewModeToggle',
      'updateNewWidget',
      'handleNewWidgetCreate',
      'handleShouldSearchFilterResetOff'
    );
    this.state = {
      isNewMode: false,
      formError: false,
      shouldSearchFilterReset: false
    };
  }

  handleIsNewModeToggle() {
    this.setState({isNewMode: !this.state.isNewMode, formError: false});
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
    let {resetToDefaultSettings, updateAllWidgetsList} = this.props;

    if (ok) {
      resetToDefaultSettings(true);
      updateAllWidgetsList(data);
      this.handleIsNewModeToggle();
      this.setState({shouldSearchFilterReset: true}, this.handleShouldSearchFilterResetOff);
    }

  }

  handleShouldSearchFilterResetOff() {
    this.setState({shouldSearchFilterReset: false});
  }

  render() {
    let {widgets, widgetsCount, handleSearchFilter, isSearching} = this.props;
    let {isNewMode, formError, shouldSearchFilterReset} = this.state;

    return (
      <div id="content-wrapper">
        <Header paneName="Widgets" />
        <div className="row">
          <WidgetsCard widgetsCount={widgetsCount} gridClassName="col-lg-12" />
        </div>
        <div className="row">
          <WidgetsCreate
            isNewMode={isNewMode}
            handleIsNewModeToggle={this.handleIsNewModeToggle}
            handleNewWidgetCreate={this.handleNewWidgetCreate}
            formError={formError} />
        </div>
        <div className="row">
          <WidgetsList
            widgets={widgets}
            handleSearchFilter={handleSearchFilter}
            shouldSearchFilterReset={shouldSearchFilterReset}
            isSearching={isSearching}
            gridClassName="col-lg-12" />
        </div>
      </div>
    );
  }

}

export default WidgetsIndex;
