# GC React form-validation

This library has two components
1. GCInput
2. GCForm

## Installation



## 1. GCInput
---
This is the component that captures user input. It accepts properties that determine the type of input. `GCInput` can also be used outside on the `GCForm`.

### Props
| Property | Definition                             | Required | Options   |
|----------|:---------------------------------------|:---------|:----------|
| type     | Determines the type of validation and type of input to render | Required | text, email, password, date, range, name, textarea |
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
| min       | Lowest accepted number | Not required | |

### Custom Regular Expression
A custom regular expression may be used with input of type `name` and `text`.

``` js
<GCInput
  onChange={val => this.handleChange(val, 'text')}
  value={this.state.text}
  name="nameTxt"
  placeholder="Type something that starts with a 'W'."
  customRegex={/\bW/g}
  customErrorMessage="Must start with uppercase W"
  type="text"
/>
```
### Custom Validation Message
All input types accepts a `customErrorMessage` property which allows for custom validation messages

``` js
<GCInput
  onChange={val => this.handleChange(val, 'email')}
  value={this.state.email}
  name="emailTxt"
  placeholder="name@domain.com"
  type="email"
  customErrorMessage="Please enter a valid email address"
/>
```

## 2. GCForm
---
Used to wrap GCInput and checks that required and filled inputs are valid. If the check returns true then the form will allow submission.

### Usage
Forms accepts an object that represents the form fields using the property name of `data`. To control the UI a template in the form of an anonymous function is passed in as a child. In the GCForm component the lodash method `_.mapValues` is used to render the fields.

```js
handleSubmit() {
  // Do submit stuff here
}

handleChange() {
  // Do stuff here
}

render() {
  // Object with form data
  const formFields = {
    name: {
      value: this.state.name,
      stateName: 'name',
      name: 'nameTxt',
      type: 'name',
      placeholder: 'Please enter your name',
      required: true
    },
    textarea: {
      value: this.state.textarea,
      stateName: 'textarea',
      name: 'textareaTxt',
      type: 'textarea',
      placeholder: 'Tell me more about yourself...',
      required: true,
    },
    email: {
      value: this.state.email,
      stateName: 'email',
      name: 'emailTxt',
      type: 'email',
      placeholder: 'name@domain.com'
    }
  };
  return(
    <GCForm
      data={formFields}
      onSubmit={() => this.handleSubmit()}
      handleInputChange={(v, t) => this.handleChange(v, t)}
    >
      {({ fields }) => (
        <div>
          <label
            htmlFor="nameTxt"
            className="gc-form__label"
          >Name</label>
          {fields.name}

          <label
            htmlFor="textareaTxt"
            className="gc-form__label"
          >Bio</label>
        {fields.textarea}

          <label
            htmlFor="emailTxt"
            className="gc-form__label"
          >Email</label>
          {fields.email}

          <button className="gc-form__submit-btn">Submit</button>
        </div>)}
    </GCForm>
  );
}
```
