import * as React from 'react';
import { Component } from 'react';
import _ from 'lodash';

import { GCForm } from 'validation-library'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      birthdate: '',
      favoriteAnimal: '',
      multi: ['pheonix', 'goldfish'],
      range: [],
    }
  }

  handleChange(value, type) {
    if(_.has(this.state, type)){
      this.setState({[type]: value});
    } else {
      console.error("Unable to find stateName");
    }
  }

  formSubmitted() {
    alert('Yay! The form was successfully submitted');
  }

  render() {
    const today = new Date();
    const thisYear = today.getFullYear();
    const minAgeDate = new Date(thisYear - 5, 1, 1);

    const formFields = {
      name: {
        name: 'name', // Required
        stateName: 'name', // Required
        type: 'text', // Required
        title: 'Name',
        value: this.state.name, // Required
        required: true
      },
      email: {
        name: 'emailAddress',
        stateName: 'email',
        type: 'email',
        title: 'Email Address',
        value: this.state.email,
        customRegex: '/asdf@*/',
        required: true
      },
      birthdate: {
        name: 'birthdate',
        stateName: 'birthdate',
        type: 'date',
        title: 'Date of Birth',
        value: this.state.birthdate,
        customErrorMessage: 'User must be at least 5 years old',
        maxDate: minAgeDate,
      },
      favoriteAnimal: {
        name: 'favoriteAnimal',
        stateName: 'favoriteAnimal',
        type: 'select',
        title: 'Favorite Animal',
        search: true,
        required: true,
        value: this.state.favoriteAnimal,
        options: [{
            label: 'Unicorn',
            value: 'unicorn'
          }, {
            label: 'Pheonix',
            value: 'pheonix'
          }, {
            label: 'Dragon',
            value: 'dragon'
          }, {
            label: 'Goldfish',
            value: 'goldfish'
        }]
      },
      range: {
        name: 'range',
        stateName: 'range',
        type: 'range',
        title: 'Range label',
        value: this.state.range,
        min: 30,
        max: 50,
      },
      multi: {
        name: 'multi',
        stateName: 'multi',
        type: 'select',
        title: 'Muliple Select Label',
        value: this.state.multi,
        multi: true,
        search: true,
        options: [{
            label: 'Unicorn',
            value: 'unicorn'
          }, {
            label: 'Pheonix',
            value: 'pheonix'
          }, {
            label: 'Dragon',
            value: 'dragon'
          }, {
            label: 'Goldfish',
            value: 'goldfish'
        }]
      }
    };

    return(
      <div className="app-wrapper">
        <header className="app-header">
          <h1>validation-tutorial-solution</h1>
        </header>
        <GCForm
          data={formFields}
          onSubmit={() => this.formSubmitted()}
          handleInputChange={(v, t) => this.handleChange(v, t)}>
            {({ fields }) => (
              <div>
                {fields.name}
                {fields.email}
                {fields.birthdate}
                {fields.favoriteAnimal}
                {fields.range}
                {fields.multi}
                <button>Submit Form</button>
              </div>
            )}
        </GCForm>
      </div>
    );
  }
}
