import { format, formatDistanceToNow, isAfter } from "date-fns";

export default {
  data() {
    return {
      formatDistanceToNow,
      isAfter,
    };
  },
  methods: {
    timeDistance(date, startTime) {
      if (date && startTime) {
        let dateTime = new Date(`${date}, ${startTime} PST`);
        let dateNow = new Date();

        if (isAfter(dateTime, dateNow)) {
          return (
            "Starts " +
            formatDistanceToNow(dateTime, {
              addSuffix: true,
            })
          );
        } else {
          return (
            "Started " +
            formatDistanceToNow(dateTime, {
              addSuffix: true,
            })
          );
        }
      }
    },
    longDate(date) {
      if (date) {
        return format(new Date(`${date} 00:00`), "EEEE, MMMM do, yyyy");
      } else {
        return "No Date";
      }
    },
  },
};
