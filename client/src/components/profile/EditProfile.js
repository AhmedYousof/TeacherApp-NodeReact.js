import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import isEmpty from "../../validation/is-empty";

import InputGroup from "../common/InputGroup";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";

const courses = ["english", "math", "physicis"];

const cities = [
  "القاهره",
  "الجيزة",
  "السادس من أكتوبر",
  "الشيخ زايد",
  "كرداسة",
  "الأسكندرية",
  "برج العرب",
  "بنها",
  "قليوب",
  "شبرا الخيمة",
  "القناطر الخيرية",
  "العبور",
  "شبين القناطر",
  "دمنهور",
  "بدر",
  "مرسى مطروح",
  "سيوة",
  "دمياط",
  "دمياط الجديدة",
  "رأس البر",
  "المنصورة",
  "طلخا",
  "طنطا",
  "المحلة الكبرى",
  "الشهداء",
  "الزقازيق",
  "العاشر من رمضان",
  "بلبيس",
  "بورسعيد",
  "بورفؤاد",
  "الإسماعيلية",
  "فايد",
  "السويس",
  "العريش",
  "الفيوم",
  "أسيوط",
  "الغردقة",
  "سوهاج",
  "أسوان",
];

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,

      name: "",
      email: "",
      course: "",
      city: "",
      address: "",
      phone: "",
      sallary: "",
      website: "",

      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
      if (nextProps.profile.profile) {
        const profile = nextProps.profile.profile;

        profile.website = !isEmpty(profile.website) ? profile.website : "";

        profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
        profile.social = !isEmpty(profile.social) ? profile.social : {};
        profile.twitter = !isEmpty(profile.social.twitter)
          ? profile.social.twitter
          : "";
        profile.facebook = !isEmpty(profile.social.facebook)
          ? profile.social.facebook
          : "";
        profile.linkedin = !isEmpty(profile.social.linkedin)
          ? profile.social.linkedin
          : "";
        profile.youtube = !isEmpty(profile.social.youtube)
          ? profile.social.youtube
          : "";
        // Set component fields state
        this.setState({
          name: profile.name,
          email: profile.email,
          course: profile.course,
          city: profile.city,
          address: profile.address,
          phone: profile.phone,
          sallary: profile.sallary,
          bio: profile.bio,
          website: profile.website,
          bio: profile.bio,
          twitter: profile.twitter,
          facebook: profile.facebook,
          linkedin: profile.linkedin,
          youtube: profile.youtube,
        });
      }
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const profileData = {
      name: this.state.name,
      email: this.state.email,
      course: this.state.course,
      city: this.state.city,
      address: this.state.address,
      phone: this.state.phone,
      sallary: this.state.sallary,
      website: this.state.website,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      errors: {},
    };
    this.props.createProfile(profileData, this.props.history);
  }
  render() {
    const { user } = this.props.auth;
    const { errors, displaySocialInputs } = this.state;
    let socialInputs;
    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />
          <InputGroup
            placeholder="Facebook Page URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />

          <InputGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />

          <InputGroup
            placeholder="YouTube Channel URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />
        </div>
      );
    }

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit Your Profile</h1>
              <small className="d-block pd-3"> * = required fields </small>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.name,
                    })}
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>
                {user.role === "teacher" ? (
                  <div>
                    <div className="form-group">
                      <select
                        name="course"
                        className={classnames(
                          "custom-select custom-select-lg",
                          {
                            "is-invalid": errors.course,
                          }
                        )}
                        onChange={this.onChange}
                        value={this.state.course}
                      >
                        <option selected value="">
                          {" "}
                          Choose your course{" "}
                        </option>
                        {courses.map((course) => (
                          <option key={course.id} value={course}>
                            {course}
                          </option>
                        ))}
                      </select>
                      {errors.course && (
                        <div className="invalid-feedback">{errors.course}</div>
                      )}
                      <small className="form-text text-muted">
                        Select your specialized course...
                      </small>
                    </div>
                    <div className="form-group">
                      <input
                        type="number"
                        className={classnames("form-control form-control-lg", {
                          "is-invalid": errors.sallary,
                        })}
                        placeholder="Set Your Init sallary"
                        name="sallary"
                        value={this.state.sallary}
                        onChange={this.onChange}
                      />
                      {errors.sallary && (
                        <div className="invalid-feedback">{errors.sallary}</div>
                      )}
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className={classnames("form-control form-control-lg", {
                          "is-invalid": errors.bio,
                        })}
                        placeholder="Enter your detailed bio"
                        name="bio"
                        value={this.state.bio}
                        onChange={this.onChange}
                      />
                      {errors.bio && (
                        <div className="invalid-feedback">{errors.bio}</div>
                      )}
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className={classnames("form-control form-control-lg", {
                          "is-invalid": errors.website,
                        })}
                        placeholder="Enter your website"
                        name="website"
                        value={this.state.website}
                        onChange={this.onChange}
                      />
                      {errors.website && (
                        <div className="invalid-feedback">{errors.website}</div>
                      )}
                    </div>
                  </div>
                ) : null}

                <div className="form-group">
                  <select
                    name="city"
                    value={this.state.city}
                    className={classnames("custom-select custom-select-lg", {
                      "is-invalid": errors.city,
                    })}
                    onChange={this.onChange}
                  >
                    <option selected value="">
                      Select your city
                    </option>
                    {cities.map((city) => (
                      <option key={city._id} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  {errors.city && (
                    <div className="invalid-feedback">{errors.city}</div>
                  )}
                  <small className="form-text text-muted">
                    Select your City...
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.address,
                    })}
                    placeholder="Adress"
                    name="address"
                    value={this.state.address}
                    onChange={this.onChange}
                  />
                  {errors.address && (
                    <div className="invalid-feedback">{errors.address}</div>
                  )}
                  <small className="form-text text-muted">
                    Enter your address in details...
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.phone,
                    })}
                    placeholder="Phone number"
                    name="phone"
                    value={this.state.phone}
                    onChange={this.onChange}
                  />
                  {errors.phone && (
                    <div className="invalid-feedback">{errors.phone}</div>
                  )}
                </div>

                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState((prevState) => ({
                        displaySocialInputs: !prevState.displaySocialInputs,
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Add Social Netowork Links
                  </button>
                  <span className="text-muted"> Optional </span>
                </div>
                {socialInputs}

                <input
                  type="submit"
                  className="btn btn-info btn-block mt-4"
                  value="Save"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,

  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
