import { format, formatDistanceToNow, isAfter, isPast } from "date-fns";

export default {
  data() {
    return {
      formatDistanceToNow,
      isAfter,
      isPast,
    };
  },
  methods: {
    timeDistance(date, startTime, timeZone) {
      if (date && startTime) {
        let dateTime = new Date(`${date}, ${startTime} ${timeZone}`);
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
    deadlinePassed(deadline, timeZone) {
      if (deadline) {
        let dateDeadline = new Date(`${deadline} 23:59 ${timeZone}`)

        // If deadline to sign up has passed, then chip is red
        if (isPast(dateDeadline)) {
          return 'red';
        } else {
          return 'green';
        }
      }
    },
    startTimePassed(startDate, startTime, timeZone) {
      if (startDate && startTime) {
        let dateStart = new Date(`${startDate} ${startTime} ${timeZone}`)

        // If deadline to sign up has passed, then chip is red
        if (isPast(dateStart)) {
          return true;
        } else {
          return false;
        }
      }
    },
    // Input is timestamp, ex: 2000-01-01T00:00:00.000Z
    shortDate(date) {
      if (date) {
        return format(new Date(date), "MMM do, yyyy");
      } else {
        return "No Date";
      }
    },
    // Input is date in ISO format, ex: 2000-01-01
    shortISODate(date) {
      if (date) {
        return format(new Date(`${date} 00:00`), "MMM do, yyyy");
      } else {
        return "No Date";
      }
    },
    // Input is timestamp, ex: 2000-01-01T00:00:00.000Z
    fullDate(date) {
      if (date) {
        return format(new Date(date), "MMMM do, yyyy");
      } else {
        return "No Date";
      }
    },
    // Input is timestamp, ex: 2000-01-01T00:00:00.000Z
    longDate(date) {
      if (date) {
        return format(new Date(date), "EEEE, MMMM do, yyyy");
      } else {
        return "No Date";
      }
    },
    // Input is date in ISO format, ex: 2000-01-01
    longISODate(date) {
      if (date) {
        return format(new Date(`${date} 00:00`), "EEEE, MMMM do, yyyy");
      } else {
        return "No Date";
      }
    },
  },
};