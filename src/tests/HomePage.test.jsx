/* eslint-disable testing-library/no-node-access */
import { render } from "./CustomContextProvider";
import "@testing-library/jest-dom";
import HomePage from "../pages/HomePage";

describe("Home page", () => {
  it("can render all elements successfully", async () => {
    render(<HomePage />);
    const heroSection = await document.querySelector(".hero-container");
    const filterContainer = await document.querySelector(".filter-container");
    const postsContainer = await document.querySelector(".posts-container");

    expect(heroSection).toBeInTheDocument();
    expect(filterContainer).toBeInTheDocument();
    expect(postsContainer).toBeInTheDocument();
  });
});
