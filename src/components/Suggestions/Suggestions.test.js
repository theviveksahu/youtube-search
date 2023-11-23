import SUGGESTIONS from "./../../mocks/suggestions.json";
import { render, screen } from "@testing-library/react";
import { Suggestions } from "./Suggestions";

it("should render the suggestions results correctly", () => {
  render(<Suggestions suggestions={SUGGESTIONS[1]} />);
  expect(screen.getByText("surfing dancing lady")).toBeInTheDocument();
});
