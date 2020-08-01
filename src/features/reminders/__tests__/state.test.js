import reducer, { addReminder } from "features/reminders/state";

describe("Reminders state", () => {
  test("addReminder action", () => {
    const initialState = {};

    const date = new Date(2020, 7, 1);
    const secondEvent = {
      reminder: "of something",
      hour: 12,
      minute: 30,
      city: "Jampa",
      color: "#000000",
    };

    let state = reducer(initialState, addReminder(date, secondEvent));

    const firstEvent = {
      reminder: "or someone",
      hour: 11,
      minute: 15,
      city: "Jampa",
      color: "#332211",
    };

    state = reducer(state, addReminder(date, firstEvent));

    expect(state).toEqual({
      "2020-08-01": [firstEvent, secondEvent],
    });
  });
});
