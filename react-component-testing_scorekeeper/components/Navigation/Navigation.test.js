import { render, screen } from "@testing-library/react";
import Link from "next/link";
import Navigation from ".";

jest.mock("next/router", () => ({
  useRouter() {
    return { pathname: jest.fn() };
  },
}));

test("renders with two links 'Play' and 'History'", () => {
  render(<Navigation />);

  const playLink = screen.getByRole("link", { name: "Play" });
  const historyLink = screen.getByRole("link", { name: "History" });

  expect(playLink).toBeInTheDocument();
  expect(historyLink).toBeInTheDocument();
});
