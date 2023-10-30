import { format } from "date-fns";

export default function formatDate(dateString: string) {
  const parsedDate = new Date(dateString);
  return format(parsedDate, "d MMM @h:mm a yyyy");
}