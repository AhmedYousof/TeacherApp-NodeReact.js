import axios from "axios";
import {
  GET_PROFILES,
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
} from "./types";

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
  };
};
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING,
  };
};
export const getProfiles = () => (dispatch) => {
  dispatch(setProfileLoading());

  axios
    .get("/teachers/profiles")
    .then((res) =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_PROFILES,
        payload: null,
      })
    );
};
export const getProfile = (teacher_id) => (dispatch) => {
  axios
    .get(`/teachers/teacher/${teacher_id}`)
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_PROFILE,
        payload: null,
      })
    );
};

export const getProfileById = (profile_id) => (dispatch) => {
  axios
    .get(`/profile/${profile_id}`)
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_PROFILE,
        payload: null,
      })
    );
};

export const getCurrentProfile = () => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get("/dashboard")
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_PROFILE,
        payload: {},
      })
    );
};

export const createProfile = (profileData, history) => (dispatch) => {
  axios
    .post("/edit-profile", profileData)
    .then((res) => history.push("/dashboard"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const joinCourse = (teacher_id) => (dispatch) => {
  axios
    .post(`/join-request/${teacher_id}`)
    .then((res) => dispatch((res) => dispatch(getProfiles())))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const joinApprove = (student_id) => (dispatch) => {
  axios
    .post(`/join-course/${student_id}`)
    .then((res) => dispatch((res) => dispatch(getProfiles())))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const refuseStudent = (student_id) => (dispatch) => {
  axios
    .post(`/refuse-course/${student_id}`)
    .then((res) => dispatch((res) => dispatch(getProfiles())))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const removeCourse = (course_id) => (dispatch) => {
  axios
    .post(`/remove-course/${course_id}`)
    .then((res) => dispatch((res) => dispatch(getProfiles())))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
