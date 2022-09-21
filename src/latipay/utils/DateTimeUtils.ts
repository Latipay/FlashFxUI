import moment from "moment-timezone";

export class DateTimeUtils {
  static readonly NZ_TIMEZONE = "Pacific/Auckland";

  static parseDateTime = (utcDate) => {
    if (utcDate) {
      return moment(utcDate)
        .tz(DateTimeUtils.NZ_TIMEZONE)
        .format("DD/M/YYYY hh:mm:ss a");
    } else {
      return "";
    }
  };

  static parseHourAndMinute = (utcDate) => {
    if (utcDate) {
      return moment(utcDate).tz(DateTimeUtils.NZ_TIMEZONE).format("HH:mm");
    } else {
      return "";
    }
  };

  static parseMonth = (utcDate, readable = false) => {
    if (utcDate) {
      return moment(utcDate)
        .tz(DateTimeUtils.NZ_TIMEZONE)
        .format(readable ? "MMM" : "MM");
    } else {
      return "";
    }
  };

  static parseYearAndMonth = (utcDate, readable = false) => {
    if (utcDate) {
      return moment(utcDate)
        .tz(DateTimeUtils.NZ_TIMEZONE)
        .format(readable ? "MMM YYYY" : "MM/yyyy");
    } else {
      return "";
    }
  };

  static isToday = (utcDate) => {
    if (utcDate) {
      const utcDateMt = moment(utcDate).tz(DateTimeUtils.NZ_TIMEZONE);
      const todayDateMt = moment().tz(DateTimeUtils.NZ_TIMEZONE);
      return utcDateMt.format("YYYY-MM-DD") == todayDateMt.format("YYYY-MM-DD");
    } else {
      return false;
    }
  };
}
