# GC React form-validation

This library has two components

1.  Input
2.  Form

Input can be used separately from the Form component, while the Form component
makes use of the Input component.

Form checks to see whether all the Inputs have been passed validation and
submits the form accordingly. At the moment custom inputs are not supported, as
form data needs to be in the object to be validated.

## Installation

```
npm install gc-react-form-validation
```

## Usage

### Styles

gc-react-form-validation exposes the stylesheets as both the original scss form
(`lib/scss`) and the processed css form (`lib/main.css`). Import either
in whichever way makes sense for your own project (e.g. via a webpack loader, or
via a scss entry point).

Below are variables available to override colour pallette:

```scss
$gc-form-light-grey: #e2e2e2;
$gc-form-grey: #f3f3f3;
$gc-form-med-grey: #cfcfcf;
$gc-form-dark-grey: #909090;
$gc-form-black: #44474b;

$gc-form-red: #c46e6b;
$gc-form-input-bg: #ffffff;
$gc-form-primary-colour: #e8bddb;
```

To change the font edit this variable:

```scss
$gc-form-font: 'Andale Mono', Tahoma !default;
```

### Scripts

To use Form Component.

```js
import { Form } from 'gc-react-form-validation';

...

constructor(props) {
  super(props);
  this.state = {
    serverErrors: [],
    name: '',
    lastName: '',
    email: '',
    birthdate: '',
    favoriteAnimal: '',
    multi: ['pheonix', 'goldfish'],
  }
}

handleChange(value, name) {
  // Receives input value and state name
  this.setState({[name]: value});
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
    firstName: {
      name: 'name', // Required
      stateName: 'name', // Optional if missing name of object will be used e.g. firstName
      type: 'text', // Required or validation
      label: 'Name',
      value: this.state.name, // Required
      required: true
    },
    lastName: { // Minimum fields
      type: 'text',
      label: 'Surname',
      value: this.state.lastName
    },
    email: {
      type: 'email',
      label: 'Email Address',
      value: this.state.email,
      customRegex: '/asdf@*/',
      required: true
    },
    birthdate: {
      type: 'date',
      label: 'Date of Birth',
      value: this.state.birthdate,
      customErrorMessage: 'User must be at least 5 years old',
      maxDate: minAgeDate,
    },
    favoriteAnimal: {
      type: 'select',
      label: 'Favourite Animal',
      search: true,
      required: true,
      hidden: false,
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
      type: 'select',
      label: 'Muliple Select Label',
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
        extendedClassNames="custom-classes"
        submissionErrorMessages={this.state.serverErrors} // For displaying errors after submission
        onSubmit={() => this.formSubmitted()}
        onInputChange={(v, t) => this.handleChange(v, t)}>
          {({ fields }) => (
            <div>
              {fields.firstName}
              {fields.lastName}
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

### Using Custom Input Components

There are two ways of adding custom input components to the Form, ie. adding it to the Form template or adding it via the `customComponent` input field object property if you are using a wrapper of some sort

#### Via Template

To add custom UI Components to Form via the template, put the custom component inside the template with a reference to the field below it. The reference represents where the error validation message would appear.

In the field object add the prop `customUI: true` to prevent the library UI from rendering.

The input would be validated everytime the input value changes.

```js

customDatePicker: {
  ...
  customUI: true,
  type: 'date'
  ...
}
...

{({ fields }) => (
  <div>
    <CustomDatePicker/>
    {fields.customDatePicker}
    {fields.email}
    <button>Submit Form</button>
  </div>
)}

...
```

#### Via `customComponent`
To add a custom input component via the `customComponent` callback. The custom input component will be passed all the input properties including `handleInputChange` and `handleInputValidation` callbacks.

This method is best when dealing with more complicated form structures like when wrapping the form in its own wrapper to handle state and fields are created dynamically.

```js

customDatePicker: {
  ...
  customComponent: ({
    value,
    handleInputChange,
    handleInputValidation
  }) => (
    <CustomDatePicker
    date={value}
    onChange={ newValue => handleInputChange(newValue)}
    onBlur={() => handleInputValidation(value)} />
  ),
  type: 'date'
  ...
}
...

{({ fields }) => (
  <div>
    {fields.customDatePicker}
    {fields.email}
    <button>Submit Form</button>
  </div>
)}

...
```

### Input Props

Some more props you can use.

| Property | Definition | Required | Options |
| --- | :--- | :--- | :--- |
| type | Determines the type of validation and type of input to render | Required                          | text, email, password, date, range, name, textarea, select |
| stateName | Accepts state variables to change the input _name of input field object_ | Optional | |
| customUI | Accepts boolean value | Optional| true, false (_default_) |
| onChange | Pass function to handle state changes when input value is changed| Required |                                                            |
| extendedClassNames | CSS class for adding custom styling. | Optional | |
| value | Accepts values for input | Required | |
| disabled | When disabled is `false` the input field is disabled | Optional | true, false (_default_)|
| maxLength | Maximum character length | Optional ||
| minLength | Minimum character length | Optional ||
| maxDate | Latest date, accepts date object |Optional||
| minDate | Earliest date, accepts date object | Optional ||
| max | Highest accepted number | Optional | |
| min | Lowest accepted number | Optional | |
| autocomplete | Information for browser autocomplete | Optional | |                                                           |
| multi | When used with 'select' type allows for a multiple select list | Optional | |

### Translations

To add translations to the validation messages pass a translation object to the `translations` prop of either the Form or Input component. If no translation object is found then default translations will be used.

Each key/value pair corresponds to text in the library and must return a function.

Here is an example of the expected translation object:

```js
const translationsExample = {
  invalidEmailAddress: () => 'This email address is invalid',
  maxCharLength: max => `May not contain more than ${max} characters`,
  minCharLength: min => `May not contain less than ${min} characters`,
  invalidURL: () => 'This URL is invalid',
  minPasswordCharLength: min => `Password may not contain less than ${min} characters`,
  dateRange: (fromDate, toDate) => `Choose a date between ${fromDate.toDateString()} and ${toDate.toDateString()}`,
  maxDateRange: toDate => `Choose a date earlier than ${toDate}`,
  minDateRange: fromDate => `Choose a date later than ${fromDate}`,
  maxNumber: max => `Choose a number lower than ${max}`,
  minNumber: min => `Choose a number higher than ${min}`,
  maxSelectOptions: max => `May not select more than ${max} options`,
  minSelectOptions: min => `May not select less than ${min} options`,
  requiredField: () => 'This is a required field',
  defaultInvalidInput: () => 'Invalid input'
}

...

<Form
  ...
  translations={translationsExample}
  ...
>
...
```

## Updates
Gc-react-form-validation recently underwent an update with a few breaking changes.

The ui has also changed. Floating labels was removed in favour of bordered input containers.

### Property name changes
- `handleInputChange` on the Form component becomes `onInputChange`.
- `isVisible` on the Input component is no longer used instead use `hidden`.
- `title` on the Input component is no longer used instead use `label`.

### New features
- `stateName` is no longer required, instead input field object name will be used when no `stateName` is provided.
- `onInputValidationSuccess` and `onFormValidationSuccess` are callbacks that can be passed to the Input and Form components, respectively, that get triggered when they are successfully validated. Useful for disabling submission buttons.
- `onInputValidationFailure` and `onFormValidationFailure` are callbacks that can be passed to Input and Form components respectively that are triggered when the Input or Form component fails validation. `onInputValidationFailure` returns an error message relative to the input. `onFormValidationFailure` returns an error object with all the errors in the Form component.


Last stable release before update: 0.7.83

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)
