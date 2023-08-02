/* eslint-disable testing-library/no-wait-for-side-effects */
/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable testing-library/no-node-access */
import { render, screen, waitFor } from "./CustomContextProvider";
import "@testing-library/jest-dom";
import HomePage from "../pages/HomePage";

// Mock fetch API responses
const mockSpeciesResponse = {
  data: ["Dog", "Cat"]
};

const mockColorsResponse = {
  data: ["Black", "White"]
};

const mockSuburbsResponse = {
  data: ["Melbourne 3000", "Sydney 2000"]
};

const mockCommentsResponse = {
  data: ["comment1", "comment2"]
};

const mockPostsResponse = {
  data: [
    {
      title: "Lost dog1",
      species: "Dog",
      breed: "Samoyed",
      color: "White",
      description:
        "Johnny is a friendly and energetic Samoyed who went missing on July 10, 2023. He is a male dog with a white coat and a white patch on his chest. Max is around 2 years old and has a medium build. He is wearing a red collar with a tag that has his name and our contact information. If you see Max or have any information about his whereabouts, please contact us immediately. We miss him dearly, and any help in finding him would be greatly appreciated. Max is a beloved member of our family, and we are anxious to have him back home with us.",
      photos: [
        "https://pawsreunite.s3.ap-southeast-2.amazonaws.com/samoyed1.jpg",
        "https://pawsreunite.s3.ap-southeast-2.amazonaws.com/samoyed2.jpg"
      ],
      suburb: "MOSMAN 2088",
      contactInfo: "0433512626",
      status: "lost",
      userId: 1
    },
    {
      title: "Lost dog2",
      species: "Dog",
      breed: "Pug",
      color: "Black",
      description:
        "Our beloved Pug named Max went missing on July 10th, 2023, in the Elmwood Avenue area of Anytown. Max is a friendly and well-trained dog with a golden coat and a distinctive white patch on his chest. He is medium-sized and approximately 2 years old. Max was last seen wearing a blue collar with an identification tag.",
      photos: ["https://pawsreunite.s3.ap-southeast-2.amazonaws.com/pug1.jpg"],
      suburb: "LINDFIELD 2070",
      contactInfo: "+61(02)8867 8576",
      status: "lost",
      userId: 2
    }
  ]
};

describe("Home page", () => {
  it("can render all elements successfully", async () => {
    render(<HomePage />);

    // Check if all elements are rendered
    const heroSection = await document.querySelector(".hero-container");
    const filterContainer = await document.querySelector(".filter-container");
    const postsContainer = await document.querySelector(".posts-container");

    expect(heroSection).toBeInTheDocument();
    expect(filterContainer).toBeInTheDocument();
    expect(postsContainer).toBeInTheDocument();
  });

  it("can renders filters and posts correctly received from the backend", async () => {
    // Mock fetch API responses for filters and posts
    jest.spyOn(global, "fetch").mockImplementation((url) => {
      if (url.endsWith("/posts/filter?status=species")) {
        return Promise.resolve({
          json: () => Promise.resolve(mockSpeciesResponse)
        });
      } else if (url.endsWith("/posts/filter?status=color")) {
        return Promise.resolve({
          json: () => Promise.resolve(mockColorsResponse)
        });
      } else if (url.endsWith("/posts/filter?status=suburb")) {
        return Promise.resolve({
          json: () => Promise.resolve(mockSuburbsResponse)
        });
      } else if (url.includes("/comments?postId")) {
        return Promise.resolve({
          json: () => Promise.resolve(mockCommentsResponse)
        });
      } else if (url.includes("/posts?status=lost")) {
        return Promise.resolve({
          json: () => Promise.resolve(mockPostsResponse)
        });
      }
    });

    render(<HomePage />);

    await waitFor(() => {
      // Check if filter select options are loaded
      const speciesFilter = screen.getByText("Species");
      expect(speciesFilter).toBeInTheDocument();
      expect(document.querySelector("option[value='Dog']")).toBeInTheDocument();
      expect(document.querySelector("option[value='Cat']")).toBeInTheDocument();

      const breedFilter = screen.getByText("Breed");
      expect(breedFilter).toBeInTheDocument();

      const colorFilter = screen.getByText("color");
      expect(colorFilter).toBeInTheDocument();
      expect(document.querySelector("option[value='Black']")).toBeInTheDocument();
      expect(document.querySelector("option[value='White']")).toBeInTheDocument();

      const suburbFilter = screen.getByText("suburb");
      expect(suburbFilter).toBeInTheDocument();
      expect(document.querySelector("option[value='Melbourne 3000']")).toBeInTheDocument();
      expect(document.querySelector("option[value='Sydney 2000']")).toBeInTheDocument();

      // Check if posts are rendered
      const post1 = screen.getByText("Lost dog1");
      expect(post1).toBeInTheDocument();

      const post2 = screen.getByText("Lost dog2");
      expect(post2).toBeInTheDocument();

      // Check if "No posts found" message is not displayed
      const noPostsMessage = screen.queryByText("No posts found");
      expect(noPostsMessage).not.toBeInTheDocument();
    });
  });
});
