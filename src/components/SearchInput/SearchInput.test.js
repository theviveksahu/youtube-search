import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { SearchInput } from "./SearchInput";
import "@testing-library/jest-dom";
import MOCK_DATA from "./../../mocks/data.json";
import SUGGESTIONS from "./../../mocks/suggestions.json";
import { act } from "react-dom/test-utils";

async function mockFetch(url) {
  switch (url) {
    case "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&key=AIzaSyCs8DOtaJl41tVx12SgASCIsFuIRMfQRwM&q=surfing": {
      return Promise.resolve({
        json: () => Promise.resolve(MOCK_DATA),
      });
    }
    case "http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=surfing": {
      return Promise.resolve({
        json: () => Promise.resolve(SUGGESTIONS),
      });
    }
  }
}

beforeAll(() => jest.spyOn(window, "fetch"));
beforeEach(() => window.fetch.mockImplementation(mockFetch));

it("should render search input component", () => {
  render(<SearchInput />);
  const searchInput = screen.getByTestId("search-input");
  expect(searchInput).toBeInTheDocument();
});

it("should render suggstions for searched keyword", async () => {
  await act(async () => render(<SearchInput />));
  const searchInput = screen.getByTestId("search-input");
  fireEvent.change(searchInput, { target: { value: "surfing" } });

  await waitFor(() => {
    expect(screen.getByText("surfing dancing lady")).toBeInTheDocument();
  });
});
