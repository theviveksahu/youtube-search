import { SearchResults } from "./SearchResults";
import MOCK_DATA from "./../../mocks/data.json";
import { render, screen } from "@testing-library/react";

it("should render the youtube search results correctly", () => {
  render(<SearchResults results={MOCK_DATA["items"]} />);
  expect(screen.getByText("The Best Surfing Moments")).toBeInTheDocument();
});
