import axios from "axios";
import {
  GET_ERRORS,
  GET_TEACHERS,
  GET_STUDENTS,
  PROFILE_LOADING,
} from "./types";

export const registeradmin = (userData, history) => (dispatch) => {
  axios
    .post("/admin/register", userData)
    .then((res) => history.push("/login"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING,
  };
};

export const getTeachers = () => (dispatch) => {
  //dispatch(setProfileLoading());
  axios
    .get("/admin/teachers")
    .then((res) =>
      dispatch({
        type: GET_TEACHERS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_TEACHERS,
        payload: null,
      })
    );
};
export const getStudents = () => (dispatch) => {
  //dispatch(setProfileLoading());
  axios
    .get("/admin/students")
    .then((res) =>
      dispatch({
        type: GET_STUDENTS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_STUDENTS,
        payload: null,
      })
    );
};
export const removeStudent = (student_id) => (dispatch) => {
  axios
    .post(`/admin/remove-student/${student_id}`)
    .then((res) => dispatch((res) => dispatch(getStudents())))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const removeTeacher = (teacher_id) => (dispatch) => {
  axios
    .post(`/admin/remove-teacher/${teacher_id}`)
    .then((res) => dispatch((res) => dispatch(getTeachers())))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const removeCourseAdmin = (course_id, teacher_id) => (dispatch) => {
  axios
    .post(`/admin/remove-course/${course_id}/${teacher_id}`)
    .then((res) => dispatch((res) => dispatch(getTeachers())))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
export const removeWaitingAdmin = (waiting_id, teacher_id) => (dispatch) => {
  axios
    .post(`/admin/remove-waiting/${waiting_id}/${teacher_id}`)
    .then((res) => dispatch((res) => dispatch(getTeachers())))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
