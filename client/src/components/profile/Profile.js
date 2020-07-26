import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import isEmpty from "../../validation/is-empty";

import { getProfileById } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMobileAlt,
  faMapMarkerAlt,
  faEnvelope,
  faDollarSign,
  faMapMarked,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faLinkedinIn,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.profile_id) {
      this.props.getProfileById(this.props.match.params.profile_id);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push("/not-found");
    }
  }
  render() {
    const { profile, loading } = this.props.profile;

    let ProfileContent;
    if (profile === null || loading) {
      ProfileContent = <Spinner />;
    } else {
      ProfileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link
                to="/teachers/profiles"
                className="btn btn-light mb-3 float-left"
              >
                Back to Profiles
              </Link>
            </div>
            <div className="col-md-6"></div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="card card-body bg-info text-white mb-3">
                <div className="row">
                  <div className="col-4 col-md-3 m-auto">
                    <img
                      className="rounded-circle"
                      src={profile.avatar}
                      alt=""
                    />
                  </div>
                </div>
                <div className="text-center">
                  <h2 className="text-center">{profile.name}</h2>
                  <p className="lead text-center">
                    {"  "}
                    {profile.course}
                    {"  "}
                    {profile.role === "teacher" ? "Teacher" : null}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faMapMarked} size="lg" />
                    {"  "}
                    {profile.city}, {profile.address}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="card card-body bg-light mb-3">
                <hr />
                <div className="d-flex flex-wrap justify-content-center align-items-center">
                  <div className="p-3">
                    <FontAwesomeIcon icon={faMobileAlt} size="lg" />{" "}
                    {profile.phone}
                  </div>
                  <div className="p-3">
                    <FontAwesomeIcon icon={faMapMarkerAlt} size="lg" />{" "}
                    {profile.city}
                  </div>
                  <div className="p-3">
                    <FontAwesomeIcon icon={faEnvelope} size="lg" />{" "}
                    {profile.email}
                  </div>
                  <div className="p-3">
                    <FontAwesomeIcon icon={faDollarSign} size="lg" />{" "}
                    {profile.sallary}
                  </div>
                </div>
                <hr />

                <div className="d-flex flex-wrap justify-content-center align-items-center">
                  <p className=" p-3">
                    {isEmpty(profile.website) ? null : (
                      <a className="" href={profile.website} target="_blank">
                        <FontAwesomeIcon icon={faGlobe} size="2x" />
                      </a>
                    )}
                    {isEmpty(
                      profile.social && profile.social.twitter
                    ) ? null : (
                      <Link
                        className=" text-dark p-3 "
                        to={profile.social.twitter}
                        target="_balnk"
                      >
                        <FontAwesomeIcon icon={faTwitter} size="2x" />
                      </Link>
                    )}

                    {isEmpty(
                      profile.social && profile.social.facebook
                    ) ? null : (
                      <Link
                        className=" text-dark p-3 "
                        to={profile.social.facebook}
                        target="_balnk"
                      >
                        <FontAwesomeIcon icon={faFacebook} size="2x" />
                      </Link>
                    )}
                    {isEmpty(
                      profile.social && profile.social.linkedin
                    ) ? null : (
                      <Link
                        className=" text-dark p-3 "
                        to={profile.social.linkedin}
                        target="_balnk"
                      >
                        <FontAwesomeIcon icon={faLinkedinIn} size="2x" />
                      </Link>
                    )}
                    {isEmpty(
                      profile.social && profile.social.youtube
                    ) ? null : (
                      <Link
                        className=" text-dark p-3 "
                        href={profile.social.youtube}
                        target="_balnk"
                      >
                        <FontAwesomeIcon icon={faYoutube} size="2x" />
                      </Link>
                    )}
                  </p>
                </div>
                <hr />
                <h3 className="text-center text-info">{profile.name}'s Bio</h3>
                <p className="lead">
                  {isEmpty(profile.bio) ? (
                    <span>{profile.name} dosen't have a bio!</span>
                  ) : (
                    <span>{profile.bio}</span>
                  )}
                </p>
                <hr />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="d-flex flex-wrap justify-content-start align-items-left">
                <h4>
                  {profile.role === "teacher" ? (
                    <h4> Number of students: {profile.courses.length} </h4>
                  ) : (
                    <h4>
                      Number of enrolled courses: {profile.courses.length}{" "}
                    </h4>
                  )}{" "}
                </h4>
              </div>
            </div>

            <table className="table table-striped table-hover">
              <thead>
                <tr className="bg-warning">
                  <th scope="col">
                    <h6>Name</h6>
                  </th>
                  <th scope="col">
                    <h6>Course</h6>
                  </th>
                  <th scope="col">
                    <h6>City</h6>
                  </th>
                </tr>
              </thead>
              <tbody>
                {profile.courses.map((course) => (
                  <tr>
                    <th scope="col">
                      <h6>{course.name}</h6>
                    </th>
                    <th scope="col">
                      <h6>{course.course}</h6>
                    </th>

                    <th scope="col">
                      <h6>{course.address}</h6>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{ProfileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileById: PropTypes.func.isRequired,
};

const mapStatetoProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStatetoProps, {
  getProfileById,
})(Profile);
