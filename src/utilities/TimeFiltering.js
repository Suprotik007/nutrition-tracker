
export function isTimeBetween(date, startHour, startMin, endHour, endMin) {
  const timeInMinutes = date.getHours() * 60 + date.getMinutes();
  const startInMinutes = startHour * 60 + startMin;
  const endInMinutes = endHour * 60 + endMin;

  if (startInMinutes <= endInMinutes) {
    return timeInMinutes >= startInMinutes && timeInMinutes <= endInMinutes;
  } else {
    return timeInMinutes >= startInMinutes || timeInMinutes <= endInMinutes;
  }
}
