import { useReducer, useEffect } from "react";
import axios from "axios";

import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => dispatch({ type: SET_DAY, value: day });

  const bookInterview = function(id, interview) {
    let spot = -1;
    if (state.appointments[id].interview) {
      spot = 0;
    }

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      dispatch({ type: SET_INTERVIEW, id, interview, spot });
    });
  };

  const cancelInterview = function(id) {
    let spot = 1;
    return axios.delete(`/api/appointments/${id}`).then(() => {
      dispatch({ type: SET_INTERVIEW, id, interview: null, spot });
    });
  };

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers"))
    ]).then(
      ([{ data: days }, { data: appointments }, { data: interviewers }]) => {
        dispatch({
          type: SET_APPLICATION_DATA,
          value: {
            days,
            appointments,
            interviewers
          }
        });
      }
    );
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}
