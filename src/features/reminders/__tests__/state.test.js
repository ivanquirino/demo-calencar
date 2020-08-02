import { validate } from "uuid";

import reducer, {
  add,
  edit,
  submit,
  deleteAll,
} from "features/reminders/state";

describe("Reminders state", () => {
  const secondEvent = {
    id: "1",
    reminder: "of something",
    hour: 12,
    minute: 30,
    city: "Jampa",
    color: "#000000",
    timestamp: "timestamp2",
  };

  const firstEvent = {
    id: "2",
    reminder: "or someone",
    hour: 11,
    minute: 15,
    city: "Jampa",
    color: "#332211",
    timestamp: "timestamp1",
  };

  const dateKey = "2020-08-01";

  test("addReminder action", () => {
    const initialState = {};

    let state = reducer(initialState, add({ dateKey, values: secondEvent }));

    state = reducer(state, add({ dateKey, values: firstEvent }));

    expect(state).toEqual({
      [dateKey]: [firstEvent, secondEvent],
    });
  });

  test("editReminder action", () => {
    const initialState = { [dateKey]: [firstEvent, secondEvent] };

    const event = { ...firstEvent, hour: 14, minute: 50 };

    const state = reducer(initialState, edit({ dateKey, values: event }));

    expect(state).toEqual({ [dateKey]: [secondEvent, event] });
  });

  test("deleteAll action", () => {
    const initialState = { [dateKey]: [firstEvent, secondEvent] };
    const date = new Date(2020, 7, 1);
    const state = reducer(initialState, deleteAll(date));

    expect(state).toEqual({ [dateKey]: [] });
  });
});

describe("submitReminder action creator", () => {
  const event = {
    reminder: "of something",
    hour: 12,
    minute: 30,
    city: "Jampa",
    color: "#000000",
  };

  test("creates add action", () => {
    const date = new Date(2020, 7, 1);

    const action = submit(date, event);

    expect(validate(action.payload.values.id)).toBe(true);
    expect(action.payload.values.timestamp).toEqual(
      expect.stringContaining("2020-08-01T12:30:00")
    );

    expect(action).toEqual({
      type: add.type,
      payload: {
        dateKey: "2020-08-01",
        values: {
          ...event,
          id: expect.any(String),
          timestamp: expect.any(String),
        },
      },
    });
  });
});
