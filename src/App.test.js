import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "./app/store";
import App from "./App";
import { getDateTitle } from "./features/calendar/functions";
import userEvent from "@testing-library/user-event";

jest.mock("uuid", () => ({ v4: jest.fn(() => "1") }));

const mount = () => {
  const store = createStore();

  return render(
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const addReminder = async () => {
  const dateText = getDateTitle(new Date());

  userEvent.click(screen.getByTitle(dateText));

  const reminder = screen.getByLabelText("Remind me of");
  userEvent.type(reminder, "Dinner with friends");

  const hour = screen.getByLabelText("Hour");
  userEvent.type(hour, "18");

  const minute = screen.getByLabelText("Minute");
  userEvent.type(minute, "30");

  const city = screen.getByLabelText("City");
  userEvent.type(city, "João Pessoa");

  const color = screen.getByLabelText("Color");
  fireEvent.change(color, { target: { value: "#333333" } });

  userEvent.click(screen.getByText("Add Reminder"));

  await screen.findByText("Dinner with friends on 18:30 at João Pessoa");
};

test("Add a reminder", async () => {
  mount();

  await addReminder();
  expect(
    screen.getByText("Dinner with friends on 18:30 at João Pessoa")
  ).toBeInTheDocument();
});

test("Edit a reminder", async () => {
  mount();

  await addReminder();

  userEvent.click(screen.getByTestId("edit-1"));

  const reminder = screen.getByLabelText("Remind me of");

  userEvent.clear(reminder);
  userEvent.type(reminder, "Lunch with parents");

  const hour = screen.getByLabelText("Hour");
  userEvent.clear(hour);
  userEvent.type(hour, "11");

  const minute = screen.getByLabelText("Minute");
  userEvent.clear(minute);
  userEvent.type(minute, "45");

  const city = screen.getByLabelText("City");
  userEvent.clear(city);
  userEvent.type(city, "Rio de Janeiro");

  const color = screen.getByLabelText("Color");
  fireEvent.change(color, { target: { value: "#444444" } });

  userEvent.click(screen.getByText("Edit Reminder"));

  await screen.findByText("Lunch with parents on 11:45 at Rio de Janeiro");
});

test("Should not add a reminder with more than 30 characters", async () => {
  mount();

  const dateText = getDateTitle(new Date());

  userEvent.click(screen.getByTitle(dateText));

  const reminder = screen.getByLabelText("Remind me of");
  userEvent.type(
    reminder,
    "Dinner with friends and a very long text to make it fail"
  );

  const hour = screen.getByLabelText("Hour");
  userEvent.type(hour, "18");

  const minute = screen.getByLabelText("Minute");
  userEvent.type(minute, "30");

  const city = screen.getByLabelText("City");
  userEvent.type(city, "João Pessoa");

  const color = screen.getByLabelText("Color");
  fireEvent.change(color, { target: { value: "#333333" } });

  userEvent.click(screen.getByText("Add Reminder"));

  try {
    await waitFor(() =>
      screen.getByText("Dinner with friends on 18:30 at João Pessoa")
    );
  } catch (e) {
    expect(
      screen.queryByText("Dinner with friends on 18:30 at João Pessoa")
    ).not.toBeInTheDocument();
  }
});
