import { useReducer, useEffect } from "react";
import axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return {
        ...state,
        day: action.value
      };
    case SET_APPLICATION_DATA:
      return {
        ...state,
        ...action.value
      };
    case SET_INTERVIEW: {
      const appointment = {
        ...state.appointments[action.id],
        interview: { ...action.interview }
      };
      const appointments = {
        ...state.appointments,
        [action.id]: appointment
      };

      for (const day of { ...state }.days) {
        if (day.name === state.day) {
          day.spots += action.spot;
        }
      }
      return {
        ...state,
        appointments
      };
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

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
