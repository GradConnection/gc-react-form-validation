# GC React form-validation

This library has two components

1.  Input
2.  Form

Input can be used separately from the Form component, while the Form component
makes use of the Input component.

Form checks to see whether all the Inputs have been passed validation and
submits the form accordingly. At the moment custom inputs are not supported, as
form data needs to be in the object to be validated.

Input

## Installation

```
npm install gc-react-form-validation
```

## Usage

### Styles

gc-react-form-validation exposes the stylesheets as both the original scss form
(`lib/styles.scss`) and the processed css form (`lib/styles.css`). Import either
in whichever way makes sense for your own project (e.g. via a webpack loader, or
via a scss entry point).

Below are variables available to override colour pallette:

```scss
$gc-form-primary-colour: #e8bddb;
$gc-form-light-grey: #f2f3f4;
$gc-form-grey: #7a848e;
$gc-form-med-grey: #8e979f;
$gc-form-dark-grey: #43484c;
$gc-form-red: #b80c0c;
$gc-form-light-red: #f59393;
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
        formRef={form => this.formElement = form}
        extendedClassNames="custom-classes"
        submissionErrorMessages={this.state.serverErrors} // For displaying errors after submission
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

### Using Custom UI

To add custom UI to Form, put the custom component inside the template with a reference to the field below it. The reference represents where the error validation message would appear.

In the field object add the prop `customUI: true` to prevent the library UI from rendering.

The input would be validated everytime the input value changes.

Template

```js
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

### Disabling submission button

To control the disabling the submit button you need to pass a function that changes the state of the parent component and use it to control the button's appearance

```js
...

changeBtnState(newState) {
  this.setState({
    isDisabled: newState
  });
}

...

<Form
  data={formFields}
  onSubmit={() => this.formSubmitted()}
  handleInputChange={(v, t) => this.handleChange(v, t)}
  submissionErrorMessages={this.state.error}
  disableSubmitButton={btnState => this.changeBtnState(btnState)}
>
  {({ fields }) => (
    <Fragment>
      <input
        type="text"
        onChange={e => this.handleChange(e.target.value, 'name')}
      />
      {fields.name}
      {fields.email}
      <button disabled={this.state.isDisabled} type="submit">
        Submit Form
      </button>
    </Fragment>
  )}
</Form>
```

### Input Props

Some more props you can use.

| Property           | Definition                                                             | Required                          | Options                                                    |
| ------------------ | :--------------------------------------------------------------------- | :-------------------------------- | :--------------------------------------------------------- |
| type               | Determines the type of validation and type of input to render          | Required                          | text, email, password, date, range, name, textarea, select |
| stateName          | Accepts state variables to change the input                            | Required                          |                                                            |
| customUI           | Accepts boolean value                                                  | Not required                      |                                                            |
| onChange           | Pass function to control value.                                        | Required                          |                                                            |
| extendedClassNames | CSS class for adding custom styling.                                   | Not required                      |                                                            |
| value              | Accepts values for input                                               | Not required                      |                                                            |
| disabled           | When disabled is `false` the input field is disabled                   | Not required                      | true, false                                                |
| name               | Requirement for input element                                          | Not required for component render |                                                            |  |
| maxLength          | Maximum character length                                               | Not required                      |                                                            |
| minLength          | Minimum character length                                               | Not required                      |                                                            |
| maxDate            | Latest date, accepts date object                                       | Not required                      |                                                            |
| minDate            | Earliest date, accepts date object                                     | Not required                      |                                                            |
| max                | Highest accepted number                                                | Not required                      |                                                            |
| min                | Lowest accepted number                                                 | Not required                      |                                                            |
| autocomplete       | Information for browser autocomplete                                   | Not required                      |                                                            |
| accordian          | Activates a little animation for opening and closing select drop-downs | Not required                      |                                                            |
| multi              | When used with 'select' type allows for a multiple select list         | Not required                      |                                                            |

### Translations

To add translations to the validation messages pass a translation object to the `translations` prop of either the Form or Input component. If no translation object is found then default translations will be used.

Each key/value pair corresponds to text in the library and must return a function.

Here is an example of the expected translation object:
```js
const translationExample = {
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
```
