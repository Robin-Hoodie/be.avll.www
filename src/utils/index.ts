import dayjs from "dayjs";

export function formatDateFull(date: string | number) {
  return dayjs(date).format("D MMM YYYY");
}
