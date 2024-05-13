const dateFormatter = require("./unitTestingTask");
const moment = require("moment");

describe("negative cases", () => {
  it("should throw invalid format Error", () => {
    expect(() => {
      dateFormatter(null);
    }).toThrow(TypeError);
  });

  it("should throw error for invalid date argument", () => {
    expect(() => {
      dateFormatter("YYYY-MM-dd", null);
    }).toThrow(TypeError);
  });
});

describe("valid cases", () => {
  it("should return current date in ISODate format with empty args", () => {
    const result = dateFormatter("ISODate");
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
  it("should return current date in custom format if format is provided", () => {
    const result = dateFormatter("YYYY-MM-dd", new Date("2024-06-05"));
    expect(result).toBe("2024-06-05");

    const customRegister = dateFormatter.register(
      "longestDate",
      "MMMM d HH:mm a"
    );
    const newFormat = customRegister(new Date("2024-06-05T16:45:30"));
    expect(newFormat).toBe("June 5 16:45 pm");
  });

  it("should return formatted date for inbuilt formats", () => {
    expect(dateFormatter("ISODate", new Date("2024-12-03"))).toBe("2024-12-03");
    expect(dateFormatter("ISOTime", new Date("2024-12-03T08:00:00"))).toBe(
      "08:00:00"
    );
    expect(dateFormatter("H:mm", new Date("2024-12-03T08:00:00"))).toBe("8:00");
    expect(dateFormatter("ISODateTime", new Date("2024-12-03T08:00:00"))).toBe(
      "2024-12-03T08:00:00"
    );
    const dateString = "2024-12-03T08:00:00";
    const date = moment(dateString).format("YYYY-MM-DDThh:mm:ssZ").toString();
    expect(dateFormatter("ISODateTimeTZ", new Date(dateString))).toMatch(
      /2024-12-03T08:00:00/i
    );
  });
});

describe("time verification", () => {
  it("should return expected time", () => {
    const dateString = "2024-12-03T08:00:00.000+05:30";
    const formattedDate = dateFormatter(
      "YYYY-MMMM-dd hh:mm:ff A",
      new Date(dateString)
    );
    expect(formattedDate).toBe("2024-December-03 08:00:000 AM");
  });
});

describe("time and zone verification", () => {
  it("should return expected time", () => {
    const dateString = "2024-12-03T08:00:00.000+05:30";
    const formattedDate = dateFormatter(
      "YYYY-MMMM-dd hh:mm:ff ZZ",
      new Date(dateString)
    );
    expect(formattedDate).toMatch(/2024-December-03 08:00:000/);
  });
  it("should return expected time", () => {
    const dateString = "2024-12-03T08:00:00.000+05:30";
    const formattedDate = dateFormatter(
      "YYYY-MMMM-dd hh:mm:ff Z",
      new Date(dateString)
    );
    expect(formattedDate).toMatch("2024-December-03 08:00:000");
  });
  it("should return expected time", () => {
    const dateString = "2024-12-03T08:25:50.350+05:30";
    const formattedDate = dateFormatter(
      "YYYY-M-dd,DDD h:m:s.f",
      new Date(dateString)
    );
    expect(formattedDate).toMatch("2024-12-03,Tuesday 8:25:50.350");
  });
});

describe("custom date formatting", () => {
  it("should return valid russian date", () => {
    dateFormatter.lang("ru");
    const customRegister = dateFormatter.register("defualt", "MMMM dd A");
    const newFormat = customRegister(new Date("2024-06-05T16:45:30"));
    expect(newFormat).toBe("июнь 05 дня");
  });
  it("should return valid russian date", () => {
    dateFormatter.lang("en");
    const customRegister = dateFormatter.register("defualt", "MMMM dd A");
    const newFormat = customRegister(new Date("2024-06-05T16:45:30"));
    expect(newFormat).toBe("June 05 PM");
  });
  dateFormatter.noConflict();
});
