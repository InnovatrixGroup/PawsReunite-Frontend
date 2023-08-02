/* eslint-disable testing-library/no-node-access */
import { render, screen } from "./CustomContextProvider";
import "@testing-library/jest-dom";
import SigninPage from "../pages/SigninPage";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

const mockLoginSuccessResponse = {
  userId: "64c5f6c56c4774d72373ea5b",
  JWTtoken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
};

const mockLoginFailResponse = {
  error: "Password is incorrect"
};

const testSigninPage = async ({ fetchMockImplementation, success }) => {
  // intercept fetch request
  jest.spyOn(global, "fetch").mockImplementation(fetchMockImplementation);

  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    render(<SigninPage />);
  });

  // check if all elements are rendered
  const email = screen.getByPlaceholderText("email@gmail.com");
  const password = screen.getByPlaceholderText("password");
  const submitBtn = screen.getByText("Sign In");

  // check if user can type in email and password
  userEvent.type(email, "ji@gmail.com");
  userEvent.type(password, "123456");
  userEvent.click(submitBtn);

  // check if the appropriate message is rendered
  if (success) {
    let welcomeText = await screen.findByText("Sign in successfully. Redirecting to home page...");
    expect(welcomeText).toBeInTheDocument();
  } else {
    let errorText = await screen.findByText("Invalid email or password");
    expect(errorText).toBeInTheDocument();
  }
};

describe("Signin page...", () => {
  it("can render success message if getting success response", async () => {
    await testSigninPage({
      fetchMockImplementation: () =>
        Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(mockLoginSuccessResponse)
        }),
      success: true
    });
  });

  it("can render error message successfully if getting error response", async () => {
    await testSigninPage({
      fetchMockImplementation: () =>
        Promise.resolve({
          ok: false,
          status: 400,
          json: () => Promise.resolve(mockLoginFailResponse)
        }),
      success: false
    });
  });
});
