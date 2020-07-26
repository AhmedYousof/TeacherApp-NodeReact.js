import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getCurrentProfile,
  joinApprove,
  refuseStudent,
  removeCourse,
} from "../../actions/profileActions";
import {
  getStudents,
  getTeachers,
  removeStudent,
  removeTeacher,
  removeCourseAdmin,
  removeWaitingAdmin,
} from "../../actions/adminActions";
import Spinner from "../common/Spinner";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
    };
  }
  componentDidMount() {
    this.props.getStudents();
    this.props.getTeachers();
    this.props.getCurrentProfile();
  }

  onApproveClick(id, e) {
    this.props.joinApprove(id);
    e.preventDefault();
    if (!this.props.errors) {
      this.props.history.push("/");
    }
  }
  onRefuseClick(id, e) {
    this.props.refuseStudent(id);
    e.preventDefault();
    if (!this.props.errors) {
      this.props.history.push("/");
    }
  }
  onRemoveClick(id, e) {
    this.props.removeCourse(id);
    e.preventDefault();
    if (!this.props.errors) {
      this.props.history.push("/");
    }
  }
  onRemoveCourseClick(course_id, teacher_id, e) {
    this.props.removeCourseAdmin(course_id, teacher_id);
    e.preventDefault();
    if (!this.props.errors) {
      this.props.history.push("/");
    }
  }
  onRemoveWaitingClick(waiting_id, teacher_id, e) {
    this.props.removeWaitingAdmin(waiting_id, teacher_id);
    e.preventDefault();
    if (!this.props.errors) {
      this.props.history.push("/");
    }
  }
  onRemoveStudentClick(id, e) {
    this.props.removeStudent(id);
    e.preventDefault();
    if (!this.props.errors) {
      this.props.history.push("/");
    }
  }
  onRemoveTeacherClick(id, e) {
    this.props.removeTeacher(id);
    e.preventDefault();
    if (!this.props.errors) {
      this.props.history.push("/");
    }
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading, teachers, students } = this.props.profile;
    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      if (Object.keys(profile).length > 0 && profile.role === "admin") {
        dashboardContent = (
          <div className="container">
            <h3 className="text-info p-3">
              {" "}
              <b>Welcome on admin panel</b>{" "}
            </h3>
            <div className="row">
              <h4 className="text-danger">Student list:</h4>
              <table className="table table-striped table-hover col-sm-12">
                <thead>
                  <tr className="bg-warning">
                    <th scope="col">
                      <h6>Name</h6>
                    </th>
                    <th scope="col">
                      <h6>Email</h6>
                    </th>
                    <th scope="col">
                      <h6>Phone</h6>
                    </th>
                    <th scope="col">
                      <h6>Adress</h6>
                    </th>
                    <th scope="col">
                      <h6>City</h6>
                    </th>

                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr>
                      <th scope="col">
                        <h6>{student.name}</h6>
                      </th>
                      <th scope="col">
                        <h6>{student.email}</h6>
                      </th>
                      <th scope="col">
                        <h6>{student.phone}</h6>
                      </th>
                      <th scope="col">
                        <h6>{student.address}</h6>
                      </th>
                      <th scope="col">
                        <h6>{student.city}</h6>
                      </th>
                      <th scope="col">
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={this.onRemoveStudentClick.bind(
                            this,
                            student._id
                          )}
                        >
                          Remove
                        </button>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
              <h4 className="text-danger">Teacher list:</h4>

              <table className="table table-striped table-hover col-sm-12">
                <thead>
                  <tr className="bg-warning">
                    <th scope="col">
                      <h6>Name</h6>
                    </th>
                    <th scope="col">
                      <h6>Email</h6>
                    </th>
                    <th scope="col">
                      <h6>Phone</h6>
                    </th>
                    <th scope="col">
                      <h6>Adress</h6>
                    </th>
                    <th scope="col">
                      <h6>City</h6>
                    </th>

                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map((teacher) => (
                    <tr>
                      <th scope="col">
                        <h6>{teacher.name}</h6>
                      </th>
                      <th scope="col">
                        <h6>{teacher.email}</h6>
                      </th>
                      <th scope="col">
                        <h6>{teacher.phone}</h6>
                      </th>
                      <th scope="col">
                        <h6>{teacher.city}</h6>
                      </th>
                      <th scope="col">
                        <h6>{teacher.address}</h6>
                      </th>

                      <th scope="col">
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={this.onRemoveTeacherClick.bind(
                            this,
                            teacher._id
                          )}
                        >
                          Remove
                        </button>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
              <br className="br" />
              <h2 className="text-danger">
                {" "}
                Courses Enrolled with the following teachers{" "}
              </h2>
              <br className="br" />
              {teachers.map((teacher) => (
                <div className="col-sm-12">
                  <h4 className="text-primary">
                    Teacher:{"  "}
                    {teacher.name},{"  "} {teacher.courses.length} student
                  </h4>
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr className="bg-warning">
                        <th scope="col">
                          <h6>Student name</h6>
                        </th>
                        <th scope="col">
                          <h6>Course name</h6>
                        </th>
                        <th scope="col">
                          <h6>Adress</h6>
                        </th>
                        <th scope="col">
                          <h6>Sallary</h6>
                        </th>
                        <th scope="col">
                          <h6>Starting date</h6>
                        </th>

                        <th scope="col"></th>
                      </tr>
                    </thead>

                    <tbody>
                      {teacher.courses.map((course) => (
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
                          <th scope="col">
                            <h6>{course.sallary}</h6>
                          </th>
                          <th scope="col">
                            <h6>{course.date}</h6>
                          </th>

                          <th scope="col">
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={this.onRemoveCourseClick.bind(
                                this,
                                teacher._id,
                                course.courseId
                              )}
                            >
                              Remove Course
                            </button>
                          </th>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
              <br className="br" />
              <h2 className="text-danger">
                Courses Waiting for teacher Aprrove
              </h2>
              <br className="br" />
              {teachers.map((teacher) => (
                <div className="col-sm-12">
                  <h4 className="text-primary ">
                    Teacher:{"  "}
                    {teacher.name} {"  "}, {teacher.waitings.length} student
                  </h4>
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr className="bg-warning">
                        <th scope="col">
                          <h6>Student name</h6>
                        </th>
                        <th scope="col">
                          <h6>Course name</h6>
                        </th>
                        <th scope="col">
                          <h6>Request date</h6>
                        </th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {teacher.waitings.map((waiting) => (
                        <tr>
                          <th scope="col">
                            <h6>{waiting.name}</h6>
                          </th>
                          <th scope="col">
                            <h6>{waiting.course}</h6>
                          </th>

                          <th scope="col">
                            <h6>{waiting.date}</h6>
                          </th>
                          <th scope="col">
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={this.onRemoveWaitingClick.bind(
                                this,
                                teacher._id,
                                waiting.user
                              )}
                            >
                              Remove waiting
                            </button>
                          </th>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        );
      } else {
        dashboardContent = (
          <div>
            <h2 className="display-4">Dashboard</h2>
            <p className="lead text-muted">
              <h4>
                Welcome
                <Link to={`/profile/${profile._id}`}> {profile.name}</Link>
              </h4>
              <Link className="btn btn-primary m-3" to="/edit-profile">
                Edit profile
              </Link>
            </p>
            <div style={{ marginBottom: "10px" }}>
              <h4 className="text-danger">Your waiting list:</h4>
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
                    <h6>Request Date</h6>
                  </th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {profile.waitings.map((waiting) => (
                  <tr>
                    <th scope="col">
                      <h6>{waiting.name}</h6>
                    </th>
                    <th scope="col">
                      <h6>{waiting.course}</h6>
                    </th>
                    <th scope="col">
                      <h6>{waiting.date}</h6>
                    </th>
                    {profile.role === "teacher" ? (
                      <th scope="col">
                        <button
                          className="btn btn-sm btn-success"
                          onClick={this.onApproveClick.bind(this, waiting.user)}
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={this.onRefuseClick.bind(this, waiting.user)}
                        >
                          Refuse
                        </button>
                      </th>
                    ) : (
                      <th scope="col">
                        <h6 className="text-danger">
                          Waiting for teacher approve
                        </h6>
                      </th>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginBottom: "10px" }}>
              {user.role === "teacher" ? (
                <h4 className="text-danger">Your Student list: </h4>
              ) : (
                <h4 className="text-danger">Your courses list:</h4>
              )}
            </div>
            <table className="table table-striped table-hover">
              <thead className="bg-info ">
                <tr>
                  <th scope="col">
                    <h6>Name</h6>
                  </th>
                  <th scope="col">
                    <h6>Course</h6>
                  </th>
                  <th scope="col">
                    <h6>Join Date</h6>
                  </th>
                  <th scope="col">
                    <h6>Address</h6>
                  </th>
                  <th scope="col">
                    <h6>Sallary</h6>
                  </th>
                  <th scope="col"></th>
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
                      <h6>{course.date}</h6>
                    </th>
                    <th scope="col">
                      <h6>{course.address}</h6>
                    </th>
                    <th scope="col">
                      <h6>{course.sallary}</h6>
                    </th>
                    {profile.role === "teacher" ? (
                      <th scope="col">
                        <button
                          type="button"
                          className="btn btn-sm btn-danger"
                          onClick={this.onRemoveClick.bind(
                            this,
                            course.courseId
                          )}
                        >
                          Remove student
                        </button>
                      </th>
                    ) : (
                      <th scope="col">
                        <button
                          type="button"
                          className="btn btn-sm btn-danger"
                          onClick={this.onRemoveClick.bind(
                            this,
                            course.courseId
                          )}
                        >
                          Unenroll
                        </button>
                      </th>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{dashboardContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  joinApprove: PropTypes.func.isRequired,
  refuseStudent: PropTypes.func.isRequired,
  removeCourse: PropTypes.func.isRequired,
  getTeachers: PropTypes.func.isRequired,
  getStudents: PropTypes.func.isRequired,
  removeStudent: PropTypes.func.isRequired,
  removeTeache: PropTypes.func.isRequired,
  removeCourseAdmin: PropTypes.func.isRequired,
  removeWaitingAdmin: PropTypes.func.isRequired,
};

const mapStatetoProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStatetoProps, {
  getCurrentProfile,
  joinApprove,
  refuseStudent,
  removeCourse,
  getTeachers,
  getStudents,
  removeStudent,
  removeTeacher,
  removeCourseAdmin,
  removeWaitingAdmin,
})(Dashboard);
