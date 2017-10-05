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

import GCForm from "../../components/general/GCValidation/GCForm/GCForm";

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

  handleChange(value, type) {
    const obj = {};
    obj[type] = value;
    this.setState(obj);
  }

  updateUser(userId) {
    var payload;
    if (this.props.settings.gender_enabled) {
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

    const today = new Date();
    const thisYear = today.getFullYear();
    const minAgeDate = new Date(thisYear - this.props.config.minimumYearsOld, 1, 1);

    const formFields = {
      firstName: {
        type: "text",
        extendedClassNames: "alumni-login-register-panel__input-half",
        title: "First Name",
        required: true,
        stateName: "first_name",
        value: this.state.first_name
      },
      lastName: {
        extendedClassNames: "alumni-login-register-panel__input-half alumni-login-register-panel__input-half--right",
        type: "text",
        title: "Last Name",
        required: true,
        stateName: "last_name",
        value: this.state.last_name
      },
      contactNumber: {
        extendedClassNames: "alumni-login-register-panel__input-half",
        type: "tel",
        title: "Contact Number",
        required: true,
        stateName: "mobile_number",
        value: this.state.mobile_number
      },
      dob: {
        name: "dob",
        type: "date",
        required: true,
        stateName: "birthdate",
        customErrorMessage: `You must be ${this.props.config.minimumYearsOld} or older`,
        minDate: minAgeDate,
        value: this.state.birthdate,
      },
      gender: {
        isVisible: this.props.settings.gender_enabled,
        type: "radio",
        value: this.state.gender_id,
        stateName: "gender_id",
        options: this.props.genders.map( g => {
          return {label: g.name, value: g.id};
        }),
        name: "genders",
      }
    };

    return (
      <div className="alumni-login-register-content">
        <div className="alumni-login-register-panel alumni-login-register-panel--double">
          <h3 className="alumni-login-register-panel__heading">Personal Information</h3>
          <h4 className="alumni-login-register-panel__subheading">Please enter your personal information</h4>

          <GCForm
            data={formFields}
            onSubmit={() => this.updateUser(userId)}
            handleInputChange={(v, t) => this.handleChange(v, t)}>
              {({ fields }) => (
                <div className="alumni-login-register-panel__content">
                  {fields.firstName}
                  {fields.lastName}
                  {fields.contactNumber}
                  <div className="alumni-login-register-panel__input-half alumni-login-register-panel__input-half--right">
                    <label className="gc-form__label" htmlFor="dob">Date of Birth</label>
                    {fields.dob}
                  </div>

                  <div className="alumni-login-register-panel__input-half">
                    <label className="gc-form__label" htmlFor="genders">Gender</label>
                    {fields.gender}
                  </div>

                  <div className="alumni-login-register-panel__btn-container">
                    <button
                      type="submit"
                      className="btn alumni-login-register-panel__half-btn alumni-login-register-panel__half-btn--right">
                      {this.state.continueButtonText}
                    </button>
                  </div>
                </div>
              )}
            </GCForm>
        </div>
      </div>
    );
  }
}

StudentPersonalInfoForm.propTypes = {
    intl: intlShape.isRequired
};

export default injectIntl(StudentPersonalInfoForm);
