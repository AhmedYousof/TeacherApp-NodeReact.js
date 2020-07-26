import axios from "axios";
import { GET_COURSES } from "./types";

export const getCourses = () => dispatch => {
  axios
    .get("/admin/courses")
    .then(res =>
      dispatch({
        type: GET_COURSES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_COURSES,
        payload: null
      })
    );
};
