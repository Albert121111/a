export function canCancel(startsAt: Date, minHoursBefore: number, now = new Date()) {
  return startsAt.getTime() - now.getTime() >= minHoursBefore * 60 * 60 * 1000;
}
