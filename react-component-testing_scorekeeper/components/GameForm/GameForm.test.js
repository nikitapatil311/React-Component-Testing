import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GameForm from "./index";

jest.mock("next/router", () => ({
  useRouter() {
    return { push: jest.fn() };
  },
}));

test("renders two input fields and a button", () => {
  render(<GameForm onCreateGame={() => {}} />);

  const nameInput = screen.getByLabelText("Player Name");
  const colorInput = screen.getByLabelText("Player Color");
  const button = screen.getByRole("button", { name: "Start Game" });

  expect(nameInput).toBeInTheDocument();
  expect(colorInput).toBeInTheDocument();
  expect(button).toBeInTheDocument();
});

test('renders a form with the accessible name "Create a new game"', () => {
  render(<GameForm onCreateGame={() => {}} />);

  const form = screen.getByRole("form", { name: "Create a new game" });

  expect(form).toBeInTheDocument();
});

test("submits the correct form data when every field is filled out", async () => {
  const onCreateGameMock = jest.fn();
  render(<GameForm onCreateGame={onCreateGameMock} />);

  const nameInput = screen.getByLabelText("Player Name");
  const colorInput = screen.getByLabelText("Player Color");
  const button = screen.getByRole("button", { name: "Start Game" });

  const playerName = "John Doe";
  const playerColor = "Red";

  userEvent.type(nameInput, playerName);
  userEvent.type(colorInput, playerColor);

  userEvent.click(button);

  expect(onCreateGameMock).toHaveBeenCalledWith({
    name: playerName,
    color: playerColor,
  });
});

test("does not submit form if one input field is left empty", async () => {
  const onCreateGameMock = jest.fn();
  render(<GameForm onCreateGame={onCreateGameMock} />);

  const nameInput = screen.getByLabelText("Player Name");
  const colorInput = screen.getByLabelText("Player Color");
  const button = screen.getByRole("button", { name: "Start Game" });

  const playerName = "John Doe";

  userEvent.type(nameInput, playerName);

  userEvent.click(button);

  expect(onCreateGameMock).not.toHaveBeenCalled();
});
