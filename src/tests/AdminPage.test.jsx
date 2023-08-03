/* eslint-disable testing-library/no-wait-for-side-effects */
/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable testing-library/no-node-access */
import { render, screen, waitFor } from "./CustomContextProvider";
import "@testing-library/jest-dom";
import AdminPage from "../pages/AdminPage";
import AdminNavBar from "../components/AdminNavBar";
import Footer from "../components/Footer";
import userEvent from "@testing-library/user-event";

const mockUsersResponse = [
  {
    _id: "64c5f6c56c4774d72373ea59",
    username: "tom",
    email: "tom@gmail.com",
    password: "$2b$10$9YscLy0/p1Pq4N26wUPLFOxJ6JviQ.5giI50MRFirPnm1v9biVRpS",
    roleId: "64c5f6c56c4774d72373ea55",
    notifications: [],
    __v: 0
  },
  {
    _id: "64c5f6c56c4774d72373ea5a",
    username: "eddy",
    email: "eddy@gmail.com",
    password: "$2b$10$DkM2IpL9F41pwkex9TvPjuVC.s/yyFGPcxLwNLq/6FRdpIdOYC8uS",
    roleId: "64c5f6c56c4774d72373ea55",
    notifications: [],
    __v: 0
  }
];

const mockPostsResponse = {
  data: [
    {
      _id: "64c5f6c56c4774d72373ea64",
      title: "Lina",
      species: "Dog",
      breed: "Dachshund",
      color: "Black",
      description:
        "Lina is a small black Dachshund with a heartwarming personality. Her wagging tail and soulful eyes can melt anyone's heart. She's not just a pet; she's a cherished member of our family, and her absence is deeply felt. We are offering a substantial reward as a token of our gratitude to anyone who assists in bringing Lina back to us. Your help and kindness will be forever appreciated. If you have any information or have found a dog matching Lina's description, please don't hesitate to contact us.",
      photos: ["https://pawsreunite.s3.ap-southeast-2.amazonaws.com/Dachshund1.jpg"],
      suburb: "SYDNEY 2000",
      contactInfo: "(02) 8948 3827",
      status: "lost",
      userId: "64c5f6c56c4774d72373ea5b",
      createdAt: "2023-07-30T05:36:05.414Z"
    },
    {
      _id: "64c5f6c56c4774d72373ea67",
      title: "Rabbit Missing",
      species: "Rabbit",
      breed: "Other",
      color: "Grey",
      description:
        "grey rabbit has gone missing, and we are desperately seeking your help to bring our furry friend back home. This situation is urgent, and we are reaching out to the community for assistance.",
      photos: ["https://pawsreunite.s3.ap-southeast-2.amazonaws.com/Rabbit1.jpg"],
      suburb: "SYDNEY 2000",
      contactInfo: "(02) 8999 3847",
      status: "lost",
      userId: "64c5f6c56c4774d72373ea5b",
      createdAt: "2023-07-30T05:36:05.414Z"
    }
  ]
};

describe("Admin page", () => {
  it("can renders all elements correctly received from the backend", async () => {
    // Mock fetch API responses for posts, notifications and user data
    jest.spyOn(global, "fetch").mockImplementation((url) => {
      if (url.endsWith("/users/all")) {
        return Promise.resolve({
          json: () => Promise.resolve(mockUsersResponse)
        });
      } else if (url.endsWith("/posts")) {
        return Promise.resolve({
          json: () => Promise.resolve(mockPostsResponse)
        });
      }
    });

    render(
      <>
        <AdminNavBar />
        <AdminPage />
        <Footer />
      </>
    );

    await waitFor(() => {
      // check if all elements are rendered
      const userManageBtn = screen.getByText("Users Management");
      expect(userManageBtn).toBeInTheDocument();

      const postManageBtn = screen.getByText("Posts Management");
      expect(postManageBtn).toBeInTheDocument();

      // click user management button and check if user list is rendered
      userEvent.click(userManageBtn);
      const userList = document.querySelectorAll(".admin-page-list-lg .admin-page-edit-list-item");
      expect(userList.length).toBe(mockUsersResponse.length);

      // click post management button and check if post list is rendered
      userEvent.click(postManageBtn);
      const postList = document.querySelectorAll(".admin-page-list-lg .admin-page-edit-list-item");
      expect(postList.length).toBe(mockPostsResponse.data.length);
    });
  });
});
