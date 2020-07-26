import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";

import { getProfile, joinCourse } from "../../actions/profileActions";

class CourseInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      joined: false,
    };
  }

  componentDidMount() {
    if (this.props.match.params.teacher_id) {
      this.props.getProfile(this.props.match.params.teacher_id);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push("/not-found");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onJoinClick(id) {
    this.props.joinCourse(id);
    this.setState({ joined: true });
    if (!this.props.errors) {
      this.props.history.push("/");
    }
  }
  render() {
    const { profile, loading } = this.props.profile;
    const { errors } = this.props;
    const { user } = this.props.auth;
    let ProfileContent;

    if (profile === null || loading) {
      ProfileContent = <Spinner />;
    } else if (user.role === "teacher" || !user) {
      ProfileContent = (
        <div>
          <h2 className="text-danger m-4">
            Ops!, You have to be student to enter this page :(
          </h2>
          <Link to="/" className="btn btn-lg btn-warning m-5">
            GO Back
          </Link>
        </div>
      );
    } else {
      ProfileContent = (
        <div class="card card-body bg-light mb-3">
          <div class="row">
            <div class="col-sm-2">
              <img class="rounded-circle" src={profile.avatar} alt="" />
            </div>
            <div class="col-sm-6">
              <h2>
                Name:
                <strong className=" text-info ml-1">{profile.name}</strong>
              </h2>
              <h2>
                Course:
                <strong className=" text-info ml-1">{profile.course}</strong>
              </h2>
              <h2>
                City:
                <strong className=" text-info ml-1">{profile.city}</strong>
              </h2>
              <h2 className="m-2 bg-warning text-primary">
                Sallary: <b> {profile.sallary}$</b>
              </h2>
            </div>
            <div className="col-4 d-flex flex-column justify-content-center">
              {this.state.joined === true ? (
                <div>
                  <button type="button" class="btn btn-disabled">
                    <h4 className="text-muted">
                      Waiting for teacher approve or Enrolled
                    </h4>
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    type="button"
                    onClick={this.onJoinClick.bind(this, profile._id)}
                    class="btn btn-info"
                  >
                    <h4 className="">Join the course</h4>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }
    return <div>{ProfileContent}</div>;
  }
}

CourseInfo.propTypes = {
  getProfile: PropTypes.func.isRequired,
  joinCourse: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStatetoProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
  auth: state.auth,
});

export default connect(mapStatetoProps, { getProfile, joinCourse })(CourseInfo);
