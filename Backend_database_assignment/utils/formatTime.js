import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
function formatIsoDate(isoDate) {
  return format(new Date(isoDate), "yyyy/MM/dd");
}

function formatIsoDateToTime(isoDate) {
  // console.log(format(new Date(isoDate), "HH:mm:ss"));
  const zonedData = toZonedTime(isoDate, "UTC");
  return format(zonedData, "HH:mm:ss");
}

export { formatIsoDate, formatIsoDateToTime };
