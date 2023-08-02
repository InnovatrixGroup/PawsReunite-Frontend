/* eslint-disable testing-library/no-node-access */
import { render, screen, fireEvent } from "./CustomContextProvider";
import "@testing-library/jest-dom";
import HeroSection from "../components/HeroSection";

describe("Hero section", () => {
  it("can render right content", async () => {
    render(<HeroSection />);
    const paragraph = screen.getByText("Stay Updated and Help Reunite Beloved Companions");
    expect(paragraph).toBeInTheDocument();

    // Check if the description paragraph is rendered correctly
    const descriptionElement = screen.getByText(
      "Hey there, pet lover! We know how heart-wrenching it can be when your furry friend goes missing. But fret not, because we're here to lend a helping paw! Click on the link below to uncover a treasure trove of recent found pet posts."
    );
    expect(descriptionElement).toBeInTheDocument();
  });

  it("contain link and redirect to /pets", async () => {
    render(<HeroSection />);
    // Check if the "Find More" button is rendered correctly
    const findMoreButton = screen.getByRole("button", { name: "Find More" });
    expect(findMoreButton).toBeInTheDocument();

    // Check if the "Find More" button redirects to "/pets"
    expect(findMoreButton.closest("a")).toHaveAttribute("href", "/pets");
  });
});
