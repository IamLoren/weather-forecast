export function getDayOfWeek(arg) {
    const date = new Date(`${arg}`);
const dayOfWeek = date.getDay();

 let dayName;
switch (dayOfWeek) {
  case 0:
    dayName = "Sunday";
    break;
  case 1:
    dayName = "Monday";
    break;
  case 2:
    dayName = "Tuesday";
    break;
  case 3:
    dayName = "Wednesday";
    break;
  case 4:
    dayName = "Thursday";
    break;
  case 5:
    dayName = "Friday";
    break;
  case 6:
    dayName = "Saturday";
    break;
  default:
    dayName = "Unknown";
}
return dayName;
}

export function fahrenheitToCelsius(fahrenheit) {
  return (+fahrenheit - 32) * 5/9;
}

export function countdownTimer(targetDate) {
  // Парсимо вхідну дату
  const targetTime = new Date(targetDate).getTime();

  // Поточний час
  const currentTime = new Date().getTime();

  // Різниця між поточним часом та цільовим часом в мілісекундах
  let difference = targetTime - currentTime;

  // Перевірка, чи дата в майбутньому
  if (difference < 0) {
      return "The day of the Trip has already arrived!";
  }

  // Розрахунок днів, годин, хвилин та секунд
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  difference %= (1000 * 60 * 60 * 24);

  const hours = Math.floor(difference / (1000 * 60 * 60));
  difference %= (1000 * 60 * 60);

  const minutes = Math.floor(difference / (1000 * 60));
  difference %= (1000 * 60);

  const seconds = Math.floor(difference / 1000);

  return {
      days,
      hours,
      minutes,
      seconds
  };
} 
