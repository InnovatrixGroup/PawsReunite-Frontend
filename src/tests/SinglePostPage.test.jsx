/* eslint-disable testing-library/no-wait-for-side-effects */
/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable testing-library/no-node-access */
import { render, screen, waitFor } from "./CustomContextProvider";
import "@testing-library/jest-dom";
import SinglePostPage from "../pages/pets/SinglePostPage";
import Navbar from "../components/NavbarNew";
import Footer from "../components/Footer";
import userEvent from "@testing-library/user-event";

const mockPostsResponse = {
  data: {
    _id: "64c5f6c56c4774d72373ea64",
    title: "Lina",
    species: "Dog",
    breed: "Dachshund",
    color: "Black",
    description:
      "Lina is a small black Dachshund with a heartwarming personality. Her wagging tail and soulful eyes can melt anyone's heart. She's not just a pet; she's a cherished member of our family, and her absence is deeply felt. We are offering a substantial reward as a token of our gratitude to anyone who assists in bringing Lina back to us. Your help and kindness will be forever appreciated. If you have any information or have found a dog matching Lina's description, please don't hesitate to contact us.",
    photos: [
      "https://pawsreunite.s3.ap-southeast-2.amazonaws.com/Dachshund1.jpg",
      "https://pawsreunite.s3.ap-southeast-2.amazonaws.com/Dachshund1.jpg",
      "https://pawsreunite.s3.ap-southeast-2.amazonaws.com/Dachshund1.jpg"
    ],
    suburb: "SYDNEY 2000",
    contactInfo: "(02) 8948 3827",
    status: "lost",
    userId: "64c5f6c56c4774d72373ea5b",
    createdAt: "2023-07-30T05:36:05.414Z"
  }
};

const mockCommentsResponse = {
  data: [
    {
      _id: "64c5f6c56c4774d72373ea6b",
      content: "this dog",
      userId: {
        _id: "64c5f6c56c4774d72373ea5a",
        username: "eddy",
        email: "eddy@gmail.com",
        password: "$2b$10$DkM2IpL9F41pwkex9TvPjuVC.s/yyFGPcxLwNLq/6FRdpIdOYC8uS",
        roleId: "64c5f6c56c4774d72373ea55",
        notifications: []
      },
      postId: "64c5f6c56c4774d72373ea64",
      createdAt: "2023-07-30T05:36:05.120Z"
    },
    {
      _id: "64c5f6c56c4774d72373ea6c",
      content: "test",
      userId: {
        _id: "64c5f6c56c4774d72373ea5a",
        username: "eddy",
        email: "eddy@gmail.com",
        password: "$2b$10$DkM2IpL9F41pwkex9TvPjuVC.s/yyFGPcxLwNLq/6FRdpIdOYC8uS",
        roleId: "64c5f6c56c4774d72373ea55",
        notifications: []
      },
      postId: "64c5f6c56c4774d72373ea64",
      createdAt: "2023-07-30T05:36:05.120Z"
    }
  ]
};

describe("Single post page", () => {
  it("can renders all elements correctly received from the backend", async () => {
    // Mock fetch API responses for posts and comments
    jest.spyOn(global, "fetch").mockImplementation((url) => {
      if (url.includes("/posts?postId=")) {
        return Promise.resolve({
          json: () => Promise.resolve(mockPostsResponse)
        });
      } else if (url.includes("/comments?postId=")) {
        return Promise.resolve({
          json: () => Promise.resolve(mockCommentsResponse)
        });
      }
    });

    render(
      <>
        <Navbar />
        <SinglePostPage />
        <Footer />
      </>
    );

    // check if all elements are rendered
    await waitFor(() => {
      // post related
      const petImages = screen.getAllByAltText("pet pictures");
      expect(petImages).toHaveLength(mockPostsResponse.data.photos.length);

      const petDescription = document.querySelector(".description");
      expect(petDescription.textContent.trim).toBe(mockPostsResponse.data.description.trim);

      // comments related
      const comments = document.querySelectorAll(".comment");
      expect(comments).toHaveLength(mockCommentsResponse.data.length);

      const commentInput = screen.getByPlaceholderText("Leave a comment...");
      expect(commentInput).toBeInTheDocument();

      const commentBtn = document.querySelector(".single__post_comment_btn");
      expect(commentBtn).toBeInTheDocument();
    });
  });
});
