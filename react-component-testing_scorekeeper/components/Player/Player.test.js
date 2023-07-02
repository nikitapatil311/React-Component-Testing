import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Player from ".";

test("renders player information and two buttons", () => {
  render(
    <Player
      name="John Doe"
      score={0}
      onIncreaseScore={() => {}}
      onDecreaseScore={() => {}}
    />
  );

  const playerInfoElement = screen.getByText((content, element) => {
    return (
      element.tagName.toLowerCase() === "section" &&
      content.includes("Player: John Doe")
    );
  });
  const scoreElement = screen.getByText("Score: 0");
  const buttons = screen.getAllByRole("button");

  expect(playerInfoElement).toBeInTheDocument();
  expect(scoreElement).toBeInTheDocument();
  expect(buttons).toHaveLength(2);
});

test("calls callbacks when increasing or decreasing score", () => {
  const onIncreaseScoreMock = jest.fn();
  const onDecreaseScoreMock = jest.fn();
  render(
    <Player
      name="John Doe"
      score={0}
      onIncreaseScore={onIncreaseScoreMock}
      onDecreaseScore={onDecreaseScoreMock}
    />
  );

  const increaseButton = screen.getByLabelText("Increase Score");
  const decreaseButton = screen.getByLabelText("Decrease Score");

  userEvent.click(increaseButton);
  userEvent.click(decreaseButton);

  expect(jest.fn()).toHaveBeenCalledTimes(1);
  expect(jest.fn()).toHaveBeenCalledTimes(1);
});
