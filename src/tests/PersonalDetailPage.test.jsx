/* eslint-disable testing-library/no-wait-for-side-effects */
/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable testing-library/no-node-access */
import { render, screen, waitFor } from "./CustomContextProvider";
import "@testing-library/jest-dom";
import PersonalDetailPage from "../pages/PersonalDetailPage";
import Navbar from "../components/NavbarNew";
import Footer from "../components/Footer";

const mockUserDataResponse = {
  _id: "64c5f6c56c4774d72373ea5b",
  username: "ji",
  email: "ji@gmail.com",
  roleId: "64c5f6c56c4774d72373ea56",
  role: "admin"
};

const mockNotificationResponse = {
  data: [
    {
      _id: "64c5f6c56c4774d72373ea72",
      userId: "64c5f6c56c4774d72373ea5b",
      message: "Your pet has been found!",
      postId: "64c5f6c56c4774d72373ea5d",
      createdAt: "2023-07-30T05:36:05.120Z"
    },
    {
      _id: "64c5f6c56c4774d72373ea73",
      userId: "64c5f6c56c4774d72373ea5b",
      message: "Your pet has been found!",
      postId: "64c5f6c56c4774d72373ea66",
      createdAt: "2023-07-30T05:36:05.120Z"
    }
  ]
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

describe("Personal detail page", () => {
  it("can renders all elements correctly received from the backend", async () => {
    // Mock fetch API responses for posts, notifications and user data
    jest.spyOn(global, "fetch").mockImplementation((url) => {
      if (url.endsWith("/posts/user")) {
        return Promise.resolve({
          json: () => Promise.resolve(mockPostsResponse)
        });
      } else if (url.endsWith("/notifications")) {
        return Promise.resolve({
          json: () => Promise.resolve(mockNotificationResponse)
        });
      } else if (url.includes("/users/")) {
        return Promise.resolve({
          json: () => Promise.resolve(mockUserDataResponse)
        });
      }
    });

    render(
      <>
        <Navbar />
        <PersonalDetailPage />
        <Footer />
      </>
    );

    await waitFor(() => {
      // check if all elements are rendered
      const aditProfileBtn = screen.getByText("Edit profile");
      expect(aditProfileBtn).toBeInTheDocument();

      const logoutBtn = Array.from(document.querySelectorAll("button")).find(
        (el) => el.textContent === "Logout"
      );
      expect(logoutBtn).toBeInTheDocument();

      const createPostBtn = screen.getByText("Create Post");
      expect(createPostBtn).toBeInTheDocument();

      const notificationIcon = document.querySelector(".notification-icon");
      expect(notificationIcon).toBeInTheDocument();

      // notification count should be equal to the length of mockNotificationResponse
      const notificationCount = document.querySelector(".notification-text p");
      expect(notificationCount.textContent).toBe(mockNotificationResponse.data.length.toString());

      // Check if posts are rendered
      const post1 = document.querySelector(`img[src="${mockPostsResponse.data[0].photos[0]}"]`);
      expect(post1).toBeInTheDocument();

      const post2 = document.querySelector(`img[src="${mockPostsResponse.data[1].photos[0]}`);
      expect(post2).toBeInTheDocument();
    });
  });
});
