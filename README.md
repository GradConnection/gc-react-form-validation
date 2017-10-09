# GC React form-validation

This library has two components
1. Input
2. Form

Input can be used separately from the Form component, while the Form component makes use of the Input component.

Form checks to see whether all the Inputs have been passed validation and submits the form accordingly. At the moment custom inputs are not supported, as form data needs to be in the object to be validated.

Input

## Installation

```
npm install gc-react-form-validation

```

## Usage
To use Form Component.
```js
import { Form } from 'gc-react-form-validation';

...

constructor(props) {
  super(props);
  this.state = {
    name: '',
    email: '',
    birthdate: '',
    favoriteAnimal: '',
    multi: ['pheonix', 'goldfish'],
  }
}

handleChange(value, stateName) {
  // Receives input value and state name
  this.setState({[stateName]: value});
}

formSubmitted() {
  // Stuff to do once form is successfully validated
}

render() {
  const today = new Date();
  const thisYear = today.getFullYear();
  const minAgeDate = new Date(thisYear - 5, 1, 1);

  // Form data object. 
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
      isVisible: false // Replace with conditional statement to show particular field
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

  // Can add divs to place form objects
  return (
    <div>
      <Form
        data={formFields}
        onSubmit={() => this.formSubmitted()}
        handleInputChange={(v, t) => this.handleChange(v, t)}>
          {({ fields }) => (
            <div>
              {fields.name}
              {fields.email}
              <div className="float-left">
                {fields.birthdate}
              </div>
              {fields.favoriteAnimal}
              {fields.multi}
              <button>Submit Form</button>
            </div>
          )}
      </Form>
    </div>
  );
}

```

If you want to use the Input component separately

```js

import { Input } from 'gc-react-form-validation';

...

<Input
  onChange={val => this.handleChange(val, 'text')}
  value={this.state.text}
  name="nameTxt"
  placeholder="Type something that starts with a 'W'."
  customRegex={/\bW/g}
  customErrorMessage="Must start with uppercase W"
  type="text"
/>
```

### Props
Some more props you can use.

| Property | Definition                             | Required | Options   |
|----------|:---------------------------------------|:---------|:----------|
| type     | Determines the type of validation and type of input to render | Required | text, email, password, date, range, name, textarea, select |
| stateName | Accepts state variables to change the input | Required | |
| onChange | Pass function to control value. | Required | |
| extendedClass | CSS class for adding custom styling. | Not required | |
| value |  Accepts values for input | Not required | |
| disabled | When disabled is `false` the input field is disabled | Not required |  true, false|
| name | Requirement for input element | Not required for component render |  |
| placeholder | Placeholder text | Not required | |
| maxLength | Maximum character length | Not required | |
| minLength | Minimum character length | Not required | |
| maxDate   | Latest date, accepts date object | Not required  | |
| minDate   | Earliest date, accepts date object | Not required | |
| max       | Highest accepted number | Not required | |
| min       | Lowest accepted number | Not required |  |
