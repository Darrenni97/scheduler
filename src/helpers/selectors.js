export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter(days => {
    return days.name === day;
  });
  let results = [];

  if (filteredDay[0] !== undefined) {
    for (let appointment of filteredDay[0].appointments) {
      results.push(state.appointments[appointment]);
    }
  }
  return results;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviews = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  };
  return interviews;
}

export function getInterviewersForDay(state, day) {
  const filteredDay = state.days.filter(days => {
    return days.name === day;
  });

  let results = [];

  if (filteredDay[0] === undefined) {
    return results;
  }

  for (const interviewer of filteredDay[0].interviewers) {
    results.push(state.interviewers[interviewer]);
  }
  return results;
}
