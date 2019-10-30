export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter(days => {
    return days.name === day;
  });
  let results = [];

  if (filteredDay[0] !== undefined) {
    for (let appointment of filteredDay[0].appointments) {
      results.push(state.appointments[appointment]);
    }
    return results;
  } else return results;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const newInterview = { ...interview };
  for (const interviewer in state.interviewers) {
    if (state.interviewers[interviewer].id === newInterview.interviewer) {
      newInterview.interviewer = state.interviewers[interviewer];
      return newInterview;
    }
  }
}

export function getInterviewersForDay(state, day) {
  const filteredDay = state.days.filter(days => {
    return days.name === day;
  });

  let results = [];

  if (filteredDay.length === 0) {
    return results;
  }

  for (const interviewer of filteredDay[0].interviewers) {
    results.push(state.interviewers[interviewer]);
  }
  return results;
}
