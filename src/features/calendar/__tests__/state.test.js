import reducer, { nextMonth, previousMonth, setMonth, setDate } from "../state";

describe("Calendar state", () => {
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

    const state = reducer(initialState, setMonth(dateToSet));

    expect(state).toEqual({ ...initialState, year: 2020, month: 7 });
  });

  test("setDate action", () => {
    const initialState = { year: 2019, month: 3, date: 5 };
    const date = new Date(2020, 5, 2);

    const state = reducer(initialState, setDate(date));

    expect(state).toEqual({ year: 2020, month: 5, date: 2 });
  });

  test("setMonth action", () => {
    const initialState = { year: 2019, month: 3, date: 5 };
    const date = new Date(2020, 5, 2);

    const state = reducer(initialState, setMonth(date));

    expect(state).toEqual({ year: 2020, month: 5, date: 0 });
  });
});
