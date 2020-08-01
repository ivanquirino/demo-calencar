import reducer, { addReminder, editReminder } from "features/reminders/state";

describe("Reminders state", () => {
  const secondEvent = {
    id: "1",
    reminder: "of something",
    hour: 12,
    minute: 30,
    city: "Jampa",
    color: "#000000",
  };

  const firstEvent = {
    id: "2",
    reminder: "or someone",
    hour: 11,
    minute: 15,
    city: "Jampa",
    color: "#332211",
  };

  test("addReminder action", () => {
    const initialState = {};
    const date = new Date(2020, 7, 1);

    let state = reducer(initialState, addReminder(date, secondEvent));

    state = reducer(state, addReminder(date, firstEvent));

    expect(state).toEqual({
      "2020-08-01": [firstEvent, secondEvent],
    });
  });

  test("editReminder action", () => {
    const date = new Date(2020, 7, 1);
    const initialState = { "2020-08-01": [firstEvent, secondEvent] };

    const event = { ...firstEvent, hour: 14, minute: 50 };

    const state = reducer(initialState, editReminder(date, event));

    expect(state).toEqual({ "2020-08-01": [secondEvent, event] });
  });
});
