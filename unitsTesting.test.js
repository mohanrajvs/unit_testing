const dateFormatter = require("./unitTestingTask");
const moment = require("moment");

beforeEach(() => {
  jest.useFakeTimers("modern");
  jest.setSystemTime(new Date("2024-08-06T06:30:51Z"));
});

afterEach(() => {
  jest.useRealTimers();
});

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

it("should return current date in ISODate format with empty args", () => {
  const result = dateFormatter("ISODate");
  expect(result).toMatch("2024-08-06");
});

it("should return current date in format if format is provided", () => {
  const result = dateFormatter("YYYY-MM-dd", new Date());
  expect(result).toBe("2024-08-06");
});

it("shoulf return cutom date format", () => {
  const customRegister = dateFormatter.register("longestDate", "MMMM d");
  const newFormat = customRegister(new Date());
  expect(newFormat).toBe("August 6");
});

it("should return formatted date for inbuilt formats", () => {
  expect(dateFormatter("ISODate", new Date())).toBe("2024-08-06");
  expect(dateFormatter("ISOTime", new Date())).toBe("06:30:51");
  expect(dateFormatter("H:mm", new Date())).toBe("6:30");
  expect(dateFormatter("ISODateTime", new Date())).toBe("2024-08-06T06:30:51");
  expect(dateFormatter("ISODateTimeTZ", new Date())).toMatch(
    "2024-08-06T06:30:51+00:00"
  );
});

it("should return expected time", () => {
  const formattedDate = dateFormatter("YYYY-MMMM-dd hh:mm:ff A", new Date());
  expect(formattedDate).toBe("2024-August-06 06:30:000 AM");
});

it("should return expected time", () => {
  const formattedDate = dateFormatter("YYYY-MMMM-dd hh:mm:ff ZZ", new Date());
  expect(formattedDate).toMatch("2024-August-06 06:30:000");
});

it("should return expected time", () => {
  const formattedDate = dateFormatter("YYYY-MMMM-dd hh:mm:ff Z", new Date());
  expect(formattedDate).toMatch("2024-August-06 06:30:000");
});

it("should return expected time", () => {
  const formattedDate = dateFormatter("YYYY-M-dd,DDD h:m:s.f", new Date());
  expect(formattedDate).toMatch("2024-8-06,Tuesday 6:30:51.0");
});

it("should return provided date format if provided", () => {
  const formattedDate = dateFormatter("YY-MMM--dd DD", new Date());
  expect(formattedDate).toMatch("24-Aug--06 Tue");
});

it("should return valid russian date", () => {
  dateFormatter.lang("ru");
  const customRegister = dateFormatter.register("defualt", "MMMM dd A");
  const newFormat = customRegister(new Date());
  expect(newFormat).toBe("август 06 утра");
});

it("should return valid russian date", () => {
  dateFormatter.lang("en");
  const customRegister = dateFormatter.register("defualt", "MMMM dd A");
  const newFormat = customRegister(new Date());
  expect(newFormat).toBe("August 06 AM");
});
