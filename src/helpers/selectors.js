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
