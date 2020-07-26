import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import { cities } from "../auth/StudentRegister";
import { getProfiles } from "../../actions/profileActions";
class Profiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      courseSearch: "",
      citySearch: "",
      activeSearch: false,
    };
  }
  updateSearch(event) {
    this.setState({
      search: event.target.value.substr(0, 20),
      activeSearch: true,
      courseSearch: "",
      citySearch: "",
    });
  }
  updateCourseSearch(event) {
    this.setState({
      courseSearch: event.target.value.substr(0, 20),
      activeSearch: true,
      search: "",
      citySearch: "",
    });
  }
  updateCitySearch(event) {
    this.setState({
      citySearch: event.target.value,
      activeSearch: true,
      search: "",
      courseSearch: "",
    });
  }

  onBlur() {
    if (this.state.search === "") {
      this.setState({ activeSearch: false });
    }
  }
  componentDidMount() {
    this.props.getProfiles();
  }

  render() {
    const { user } = this.props.auth;
    const { profiles, loading } = this.props.profile;
    let profileItems;
    let searchedProfiles;

    if (profiles === null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length > 0 && this.state.activeSearch === false) {
        profileItems = profiles.map((profile) => (
          <div className="col-sm-4 p-1">
            <div
              key={profile._id}
              className="card p-1"
              style={{ backgroundColor: "whitesmoke" }}
            >
              <Link to={`/profile/${profile._id}`}>
                {" "}
                <img
                  className="card-img-top"
                  src={profile.avatar}
                  alt="Teacher"
                />
              </Link>
              <div className="card-body">
                <h3>
                  Name:
                  <strong className="card-title text-info ml-1">
                    {profile.name}
                  </strong>
                </h3>
                <h4>
                  Course:
                  <strong className="card-text text-info ml-1">
                    {profile.course}
                  </strong>
                </h4>
                <h4>
                  City:
                  <strong className="card-text text-info ml-1">
                    {profile.city}
                  </strong>
                </h4>
                <h4 className=" card-text m-2 text-primary">
                  Sallary: <b> {profile.sallary}$</b>
                </h4>
                <Link
                  to={`/teachers/teacher/${profile._id}`}
                  className="btn btn-info"
                >
                  Join Request
                </Link>
              </div>
            </div>
          </div>
        ));
      } else if (this.state.activeSearch === true) {
        if (this.state.search !== "") {
          searchedProfiles = profiles.filter((profile) => {
            return (
              profile.name
                .toLowerCase()
                .indexOf(this.state.search.toLowerCase()) !== -1
            );
          });
        } else if (this.state.courseSearch !== "") {
          searchedProfiles = profiles.filter((profile) => {
            return (
              profile.course
                .toLowerCase()
                .indexOf(this.state.courseSearch.toLowerCase()) !== -1
            );
          });
        } else if (this.state.citySearch !== "") {
          searchedProfiles = profiles.filter((profile) => {
            return (
              profile.city
                .toLowerCase()
                .indexOf(this.state.citySearch.toLowerCase()) !== -1
            );
          });
        }
        if (searchedProfiles != null) {
          profileItems = searchedProfiles.map((profile) => (
            <div key={profile._id} className="card card-body bg-light mb-3">
              <div className="row">
                <div className="col-2">
                  <Link to={`/profile/${profile._id}`}>
                    {" "}
                    <img
                      className="rounded-circle"
                      src={profile.avatar}
                      alt=""
                    />
                  </Link>
                </div>
                <div className="col-sm-6">
                  <h2>
                    Name:
                    <strong className=" text-info ml-1">{profile.name}</strong>
                  </h2>
                  <h4>
                    Course:
                    <strong className=" text-info ml-1">
                      {profile.course}
                    </strong>
                  </h4>
                  <h4>
                    City:
                    <strong className=" text-info ml-1">{profile.city}</strong>
                  </h4>
                  <h2 className="m-2 text-primary">
                    Sallary: <b> {profile.sallary}$</b>
                  </h2>
                </div>
                <div className="col-4 d-flex flex-column justify-content-center">
                  <div>
                    <Link
                      to={`/teachers/teacher/${profile._id}`}
                      className="btn btn-info"
                    >
                      Join Request
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ));
        }
      } else {
        profileItems = <h6>No profiles found ...</h6>;
      }
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Teachers</h1>
              <p className="lead text-center">
                Search and Find The Best Teachers
              </p>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={this.state.search}
                  onChange={this.updateSearch.bind(this)}
                  onBlur={this.onBlur.bind(this)}
                  placeholder="Search to find the best teachers"
                />
                <div className="input-group-append"></div>
              </div>
              <div className="input-group mb-3">
                <form>
                  <select
                    name="courses"
                    className="custom-select m-2"
                    value={this.state.courseSearch}
                    onChange={this.updateCourseSearch.bind(this)}
                  >
                    <option selected value="">
                      Search by course
                    </option>
                    <option value="math">math</option>
                    <option value="English">English</option>
                    <option value="history">history</option>
                    <option value="physicis">physicis</option>
                  </select>
                </form>
                <form>
                  <select
                    name="city"
                    value={this.state.citySearch}
                    className="custom-select m-2"
                    onChange={this.updateCitySearch.bind(this)}
                  >
                    <option selected value="">
                      Search by City
                    </option>
                    {cities.map((city) => (
                      <option value={city}>{city}</option>
                    ))}
                  </select>
                </form>
              </div>
              <div className="row">{profileItems}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired,
};

const mapStatetoProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStatetoProps, { getProfiles })(Profiles);
