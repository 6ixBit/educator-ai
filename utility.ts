import { format } from "date-fns";

export function formatDate(dateString: string) {
  const parsedDate = new Date(dateString);
  return format(parsedDate, "do MMM yy @h:mm a");
}