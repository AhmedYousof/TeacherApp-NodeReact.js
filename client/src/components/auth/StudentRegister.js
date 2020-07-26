import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import classnames from "classnames";
import { connect } from "react-redux";

import { registerstudent } from "../../actions/authActions";

export const cities = [
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
  "الخصوص",
  "شبين القناطر",
  "دمنهور",
  "كفر الدوار",
  "إدكو",
  "بدر",
  "وادي النطرون",
  "مرسى مطروح",
  "العلمين",
  "سيوة",
  "دمياط",
  "دمياط الجديدة",
  "رأس البر",
  "المنصورة",
  "طلخا",
  "طنطا",
  "المحلة الكبرى",
  "منوف",
  "تلا",
  "الشهداء",
  "الزقازيق",
  "العاشر من رمضان",
  "بلبيس",
  "الإبراهيمية",
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

class StudentRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      city: "",
      address: "",
      phone: "",
      password: "",
      confirmpassword: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    //  this.props.getCourses();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      city: this.state.city,
      address: this.state.address,
      phone: this.state.phone,
      password: this.state.password,
      confirmpassword: this.state.confirmpassword,
    };
    this.props.registerstudent(newUser, this.props.history);
  }
  render() {
    const { errors } = this.props;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h3 className="display-4 text-center">
                <b className="text-info">Student Registeration</b>
              </h3>
              <div className="text-center m-5">
                <h5>
                  Register As
                  <Link to="/teachers/register" className="btn btn-info ml-2">
                    Teacher
                  </Link>{" "}
                  Instead
                </h5>
              </div>
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
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.email,
                    })}
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small>
                </div>
                <div className="form-group">
                  <select
                    name="city"
                    className={classnames("custom-select custom-select-lg", {
                      "is-invalid": errors.city,
                    })}
                    value={this.state.city}
                    onChange={this.onChange}
                  >
                    <option selected value="">
                      Select your city
                    </option>
                    {cities.map((city) => (
                      <option value={city}>{city}</option>
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
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password,
                    })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.confirmpassword,
                    })}
                    placeholder="Confirm Password"
                    name="confirmpassword"
                    value={this.state.confirmpassword}
                    onChange={this.onChange}
                  />
                  {errors.confirmpassword && (
                    <div className="invalid-feedback">
                      {errors.confirmpassword}
                    </div>
                  )}
                </div>

                <input
                  type="submit"
                  className="btn btn-info btn-block mt-4"
                  value="Register Now"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

StudentRegister.propTypes = {
  registerstudent: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerstudent })(
  withRouter(StudentRegister)
);
