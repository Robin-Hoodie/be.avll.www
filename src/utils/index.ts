import dayjs from "dayjs";

export function formatDateFull(date: string | number) {
  return dayjs(date).format("D MMM YYYY");
}

export function clipLink(link: string, maxLength: number) {
  return link.length <= maxLength ? link : `${link.slice(0, maxLength - 2)}..`;
}
