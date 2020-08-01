import reducer, { nextMonth, previousMonth, setMonthFromDate } from "../state";

const initialState = {
  year: 2020,
  month: 11,
  date: 0,
};

describe("Calender state reducer", () => {
  test("nextMonth action", () => {
    const initialState = {
      year: 2020,
      month: 11,
      date: 0,
    };

    const state = reducer(initialState, nextMonth());

    expect(state).toEqual({ ...initialState, month: 0, year: 2021 });
  });

  test("previousMonth action", () => {
    const initialState = {
      year: 2020,
      month: 0,
      date: 0,
    };

    const state = reducer(initialState, previousMonth());

    expect(state).toEqual({ ...initialState, year: 2019, month: 11 });
  });

  test("currentMonth action", () => {
    const initialState = {
      year: 2019,
      month: 0,
      date: 0,
    };

    const dateToSet = new Date(2020, 7);

    const state = reducer(initialState, setMonthFromDate(dateToSet));

    expect(state).toEqual({ ...initialState, year: 2020, month: 7 });
  });
});
