import { isTimeBetween } from "./TimeFiltering";

export function getActiveSection(currentDate = new Date()) {
  if (isTimeBetween(currentDate, 6, 0, 11, 59)) {
    return 'morning';
  } else if (isTimeBetween(currentDate, 12, 0, 17, 59)) {
    return 'noon';
  } else if (isTimeBetween(currentDate, 18, 0, 23, 59)) {
    return 'night';
  }
  else{
    return 'midnight'
  }
}
