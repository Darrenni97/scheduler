export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

export default function reducer(state, action) {
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

      const days = state.days.map(day => {
        if (day.name === state.day) {
          return {
            ...day,
            spots: day.spots + action.spot
          };
        }
        return day;
      });

      return { ...state, days, appointments };
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}
