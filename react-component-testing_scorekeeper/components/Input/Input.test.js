import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from ".";

test("renders a label and an input with the correct attributes", () => {
  const placeholder = "Enter your name";
  const name = "username";
  render(<Input placeholder={placeholder} name={name} onChange={() => {}} />);

  const inputElement = screen.getByPlaceholderText(placeholder);

  expect(inputElement).toBeInTheDocument();
  expect(inputElement).toHaveAttribute("name", name);
});
test("calls callback on every user input", async () => {
  const onChangeMock = jest.fn();
  render(
    <Input
      placeholder="Enter your name"
      name="username"
      onChange={onChangeMock}
    />
  );

  const inputElement = screen.getByPlaceholderText("Enter your name");
  const inputValue = "John Doe";

  await userEvent.type(inputElement, inputValue);

  expect(onChangeMock).toHaveBeenCalledTimes(inputValue.length);
});
