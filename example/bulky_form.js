import React, { Component, PropTypes } from "react";
import {defineMessages, injectIntl, intlShape, FormattedMessage} from 'react-intl';
import _ from "lodash";
import { getErrors, validateEmail } from "../../lib/util";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Loader from "../../components/general/loader";
import * as UserActions from "../../actions/UserActions";
import * as ResourceActions from "../../actions/ResourceActions";
import ErrorMsg from "../../components/general/errormsg";
import InfoMessage from "../../components/general/InfoMessage";
import MaskedInput from "react-maskedinput-cc";
import moment from "moment";
import Meta from "../../views/meta.js";
import reverse from "../../views/reverse";
import Select from "react-select";
import * as constants from "../../constants/ActionTypes";

const messages = defineMessages({
    continue: {
        id: 'studentInfo.Continue',
        defaultMessage: 'Continue'
    },
    errorOverAge: {
        id: 'reformat.errorOverAgeOf',
        defaultMessage: 'Only people over the age of {minAge} are allowed to register'
    },
    dateMonthYear: {
      id: 'alumniLogin.dateMonthYear',
      defaultMessage: 'DD/MM/YYYY'
    },
    firstName: {
      id: 'info.alumniLogin',
      defaultMessage: 'First Name'
    },
    lastName: {
      id: 'alumniLogin.alternativeEmailAddressInfo',
      defaultMessage: 'Last Name'
    },
    gender: {
      id: 'alumniLogin.gender',
      defaultMessage: 'Gender'
    },
    contactNumber: {
      id: 'alumniLogin.contactNumber',
      defaultMessage: 'Contact Number'
    }
});

@connect(state => ({
  error: state.userstore.error,
  first_name: state.userstore.first_name,
  last_name: state.userstore.last_name,
  loading: state.userstore.loading,
  studentid: state.userstore.studentid,
  email: state.userstore.email,
  birthdate: state.userstore.birthdate,
  gender: state.userstore.gender,
  mobile_number: state.userstore.mobile_number,
  genders: state.resourcestore.genders,
  settings: state.settingsstore.settings,
  config: state.configstore.config
}))

class StudentPersonalInfoForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.dispatch = this.props.dispatch;
    this.formElements = [
      "secondary_email",
      "birthdate"
    ];

    this.userActions = {...bindActionCreators(UserActions, this.dispatch)};
    this.resourceActions = {...bindActionCreators(ResourceActions, this.dispatch)};

    this.state = {
      birthdate: "",
      first_name: "",
      last_name: "",
      mobile_number: "",
      secondaryEmail: "",
      birthdateInvalid: false,
      gender_id: "",
      birthdateMinMaxInvalid: false,
      continueButtonText: <FormattedMessage id="moreInfo.buttonContinue" defaultMessage="Continue" />
    };
  }

  static contextTypes = {
    location: PropTypes.object,
    history: PropTypes.object
  };

  componentDidMount() {
    var state = this.state;

    if (this.props.birthdate)
      state.birthdate = moment(this.props.birthdate, "YYYY-MM-DD").format("DD/MM/YYYY");
    this.setState(state);

    if (this.props.settings.gender_enabled) {
      this.resourceActions.loadGenders();
    }
  }

  componentWillReceiveProps(nextProps) {
    var state = this.state;
    if (nextProps.birthdate) {
      state.birthdate = moment(nextProps.birthdate, "YYYY-MM-DD").format("DD/MM/YYYY");
    }

    if (nextProps.first_name) {
      state.first_name = nextProps.first_name;
    }

    if (nextProps.last_name) {
      state.last_name = nextProps.last_name;
    }

    if (nextProps.mobile_number) {
      state.mobile_number = nextProps.mobile_number;
    }

    this.setState(state);
  }

  render() {
    const {formatMessage} = this.props.intl;
    const {loading, error, userId, config, genders} = this.props;
    const {logoAltText} = config;
    var errors = {};
    const { formElements } = this;

    _.assign(errors, this.state.errors);
    if (error) {
        errors = getErrors(formElements, error);
    }
    let genderList;
    if (this.props.settings.gender_enabled){
      genderList = this.props.genders.map((g) => {
        return (
          <div className="alumni-login-register-panel__checkbox-wrapper"
            key={g.id}>
            <input
              type="checkbox"
              className=""
              onChange={(e) => this.updateGender(e)}
              onKeyDown={(e) => this.onKeyDown(e)}
              value={g.id}
              checked={this.state.gender_id === g.id ? true : false} />
            <label>{g.name}</label>
          </div>
        );
      });
    }

    return (
      <div className="alumni-login-register-content">
        <div className="alumni-login-register-panel alumni-login-register-panel--double">
          <h3 className="alumni-login-register-panel__heading">
            <FormattedMessage id="alumniLogin.personalInformation" defaultMessage="Personal Information" /></h3>
          <h4 className="alumni-login-register-panel__subheading">
            <FormattedMessage id="alumniLogin.enterPersonalInfo" defaultMessage="Enter your personal information in order for Employers to better understand who you are" /></h4>

          <div className="alumni-login-register-panel__content">
              <div className="alumni-login-register-panel__input-half">
                <input type="text"
                  className="alumni-login-register-panel__input"
                  onChange={(e) => this.updateFirstName(e)}
                  onKeyDown={(e) => this.onKeyDown(e)}
                  placeholder={formatMessage(messages.firstName)}
                  required="true"
                  value={this.state.first_name} />
                {errors.first_name}
              </div>

              <div className="alumni-login-register-panel__input-half alumni-login-register-panel__input-half--right">
                <input type="text"
                  className="alumni-login-register-panel__input"
                  onChange={(e) => this.updateLastName(e)}
                  onKeyDown={(e) => this.onKeyDown(e)}
                  placeholder={formatMessage(messages.lastName)}
                  required="true"
                  value={this.state.last_name} />
                {errors.last_name}
              </div>

              <div className="alumni-login-register-panel__input-half">
                <input type="text"
                       className="alumni-login-register-panel__input"
                       onChange={(e) => this.updateContactNumber(e)}
                       onKeyDown={(e) => this.onKeyDown(e)}
                       placeholder={formatMessage(messages.contactNumber)}
                       required="true"
                       value={this.state.mobile_number} />
                {errors.mobile_number}
              </div>

              {/* <div className="alumni-login-register-panel__input-half alumni-login-register-panel__input-half--right">
                <input type="email"
                      className="alumni-login-register-panel__input"
                      onChange={(e) => this.updateAlternativeEmail(e)}
                      onKeyDown={(e) => this.onKeyDown(e)}
                      placeholder={formatMessage(messages.alternativeEmail)}
                      required="true"
                      value={this.state.secondaryEmail}
                      autoFocus="true" />
                {errors.secondary_email}
              </div> */}

              <div className="alumni-login-register-panel__input-half alumni-login-register-panel__input-half--right">
                <label className="alumni-login-register-panel__inline-label" htmlFor="gender">Date of Birth</label>
                <div className="alumni-login-register-panel__inline-input">
                  <input
                    name="gender"
                    type="text"
                    className="alumni-login-register-panel__input"
                    placeholder={formatMessage(messages.dateMonthYear)}
                    required="true"
                    value={this.state.birthdate}
                    onChange={(e) => this.updateDateOfBirth(e)}
                    onKeyDown={(e) => this.onKeyDown(e)} />
                </div>
                <br/>
                {errors.birthdate}
              </div>

              <div className="alumni-login-register-panel__checkbox alumni-login-register-panel__input-half">
                <label className="alumni-login-register-panel__checkbox_label">{formatMessage(messages.gender)}</label>
                <div className="alumni-login-register-panel__checkbox-content">
                  {genderList}
                </div>
              </div>
              {errors.gender_id}
            </div>

            <div className="alumni-login-register-panel__btn-container">
              <button
                type="submit"
                className="btn alumni-login-register-panel__half-btn alumni-login-register-panel__half-btn--right"
                onClick={() => this.updateUser(userId)}
                onKeyDown={(e) => this.onKeyDown(e)}>
                {this.state.continueButtonText}
              </button>
            </div>
        </div>
      </div>
    );
  }

  onKeyDown(e) {
    // 'enter' was pressed
    if (e.keyCode === 13) {
      e.preventDefault();
      this.updateUser(this.props.userId);
    }
  }


  _getBirthdayError(state) {
    const {formatMessage} = this.props.intl;
    if (state.birthdate === "" || state.birthdate == null || state.birthdateInvalid)
    {
      return <ErrorMsg msg={<FormattedMessage id="studentInfo.errorEnterValidDateOfBirth" defaultMessage="Please enter valid birth date." />} />;
    }
    if (state.birthdate === "" || state.birthdate == null || (!state.birthdateInvalid && state.birthdateMinMaxInvalid))
    {
      return <ErrorMsg msg={formatMessage(messages.errorOverAge, {minAge: this.props.config.minimumYearsOld})} />;
    }
    return null;
  }

  updateDateOfBirth(e) {
    const {formatMessage} = this.props.intl;
    var state = this.state;
    var enteredDate = moment(e.target.value, "DD/MM/YYYY", true);
    var yearsOld = moment().diff(enteredDate, "years");
    state.birthdateInvalid = !(enteredDate.isValid());
    state.birthdateMinMaxInvalid = (yearsOld < this.props.config.minimumYearsOld) || (yearsOld > this.props.config.maximumYearsOld);
    state.birthdate = e.target.value;
    var errors = state.errors || {};
    errors.birthdate = this._getBirthdayError(state);
    state.errors = errors;
    this.setState(state);
  }

  updateFirstName(e) {
    this.setState({first_name: e.target.value});
  }

  updateFirstName(e) {
    var state = this.state;
    state.first_name = e.target.value;
    this.setState(state);
  }

  updateLastName(e) {
    this.setState({last_name: e.target.value});
  }

  updateContactNumber(e) {
    this.setState({mobile_number: e.target.value});
  }

  updateAlternativeEmail(e) {
    this.setState({secondaryEmail: e.target.value});
  }

  updateGender(e) {
    this.setState({gender_id: e.target.value});
  }

  validateForm() {
    const {formatMessage} = this.props.intl;
    var errors = {};
    var state = this.state;
    let errorMessage = "";

    if (this.state.first_name === "" || this.state.first_name == null)
    {
      errors.first_name = <ErrorMsg msg={<FormattedMessage id="moreInfo.errorEnterFirstName" defaultMessage="Please enter first name" />} />;
    }
    if (this.state.last_name === "" || this.state.last_name == null)
    {
      errors.last_name = <ErrorMsg msg={<FormattedMessage id="moreInfo.errorEnterLastName" defaultMessage="Please enter last name"/>} />;
    }
    if (this.state.mobile_number === "" || this.state.mobile_number == null)
    {
      errors.mobile_number = <ErrorMsg msg={<FormattedMessage id="moreInfo.errorEnterMobileNumber" defaultMessage="Please enter your mobile number"/>} />;
    }
    if(this.state.gender_id === "") {
      errors.gender = <ErrorMsg msg={<FormattedMessage id="studentInfo.errorGender" defaultMessage="Please select a gender" />} />;
    }

    // if (this.state.secondaryEmail && !validateEmail(this.state.secondaryEmail)) {
    //   errors.secondary_email = (
    //     <ErrorMsg msg={(
    //       <FormattedMessage
    //         id="editProfile.errorAlternativeEmail"
    //         defaultMessage="Please enter valid email"
    //       />)}
    //     />
    //   );
    // }

    var birthdate = this._getBirthdayError(state);
    if (birthdate) {
      errors.birthdate = birthdate;
    }

    state.errors = errors;
    this.setState(state);
    return _.size(errors) <= 0;
  }

  updateUser(userId) {
    var formIsValid = this.validateForm();

    if (formIsValid) {
      var payload;

      payload = {
        "date_of_birth": moment(this.state.birthdate, "DD/MM/YYYY").format("YYYY-MM-DD"),
        "first_name": this.state.first_name,
        "last_name": this.state.last_name,
        "mobile_number": this.state.mobile_number,
        "gender_id": this.state.gender_id,
        "id": userId
      };
    } else {
      payload = {
      "date_of_birth": moment(this.state.birthdate, "DD/MM/YYYY").format("YYYY-MM-DD"),
      "first_name": this.state.first_name,
      "last_name": this.state.last_name,
      "mobile_number": this.state.mobile_number,
      "id": userId
      };
    }

    this.userActions.updateUser(payload)
    .then((event) => {
      if (event.type == constants.UPDATE_USER_SUCCESS) {
        this.setState({
          continueButtonText: <FormattedMessage id="moreInfo.buttonContinue" defaultMessage="Continue" />
        })
        if(_.has(event, 'result.data.id'))
        {
          this.setState({
            continueButtonText: <FormattedMessage id="studentInfo.buttonSaving" defaultMessage="Saving..." />
          });
          this.props.incrementStage(event.result.data.id);
        }
        else{
          console.error("could not find user id");
        }
      }
      else {
        console.error("could not update user");
      }
    });
  }
}

StudentPersonalInfoForm.propTypes = {
    intl: intlShape.isRequired
};

export default injectIntl(StudentPersonalInfoForm);
