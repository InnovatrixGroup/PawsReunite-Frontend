/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-node-access */
import { render, screen } from "./CustomContextProvider";
import "@testing-library/jest-dom";
import SignupPage from "../pages/SignupPage";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

const mock_signup_success_response = {
  userId: "64c5f6c56c4774d72373ea5b",
  JWTtoken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
};

const mock_signup_fail_response = {
  errors: ["Username already exists", "Email already exists"]
};

describe("Signup page", () => {
  it("can render error message if email address is not valid", async () => {
    await act(async () => {
      render(<SignupPage />);
    });
    // get email input and type in invalid email address
    const emailInput = await screen.findByPlaceholderText("email@gmail.com");
    await act(async () => {
      await userEvent.type(emailInput, "test.com");
    });

    // check if error message is rendered
    const errorMsg = await screen.findByText("Email is not valid");
    expect(errorMsg).toBeInTheDocument();
  });

  it("can render error message if password is not valid", async () => {
    render(<SignupPage />);
    // get password input and type in invalid password
    const passwordInput = await screen.findByPlaceholderText("password");
    await act(async () => {
      await userEvent.type(passwordInput, "123456");
    });

    // check if error message is rendered
    const errorMsg = await screen.findByText(
      "At least 8 characters, containing at least 1 uppercase letter and 1 lowercase letter"
    );
    expect(errorMsg).toBeInTheDocument();
  });

  it("can render error message if passwords don't match", async () => {
    render(<SignupPage />);
    // get password input and type in passwords that don't match
    const passwordInput = await screen.findByPlaceholderText("password");
    const confirmPasswordInput = await screen.findByPlaceholderText("confirm password");
    await act(async () => {
      await userEvent.type(passwordInput, "123456aB");
      await userEvent.type(confirmPasswordInput, "123456bA");
    });

    // check if error message is rendered
    const errorMsg = await screen.findByText("Passwords do not match");
    expect(errorMsg).toBeInTheDocument();
  });

  it("can render error message if receive error response from backend", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        ok: false,
        status: 400,
        json: () => Promise.resolve(mock_signup_fail_response)
      })
    );

    render(<SignupPage />);

    // get all input fields
    const usernameInput = await screen.findByPlaceholderText("username");
    const emailInput = await screen.findByPlaceholderText("email@gmail.com");
    const passwordInput = await screen.findByPlaceholderText("password");
    const confirmPasswordInput = await screen.findByPlaceholderText("confirm password");
    const submitBtn = screen.getByText("Sign Up");

    //type in valid data and click submit button
    await act(async () => {
      await userEvent.type(usernameInput, "ji");
      await userEvent.type(emailInput, "ji@gmail.com");
      await userEvent.type(passwordInput, "123456aB");
      await userEvent.type(confirmPasswordInput, "123456aB");
      await userEvent.click(submitBtn);
    });

    // check if error message is rendered
    const errorMsg1 = await screen.findByText("Username already exists");
    const errorMsg2 = await screen.findByText("Email already exists");
    expect(errorMsg1).toBeInTheDocument();
    expect(errorMsg2).toBeInTheDocument();
  });

  it("can render success message if receive success response from backend", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mock_signup_success_response)
      })
    );

    render(<SignupPage />);

    // get all input fields
    const usernameInput = await screen.findByPlaceholderText("username");
    const emailInput = await screen.findByPlaceholderText("email@gmail.com");
    const passwordInput = await screen.findByPlaceholderText("password");
    const confirmPasswordInput = await screen.findByPlaceholderText("confirm password");
    const submitBtn = screen.getByText("Sign Up");

    //type in valid data and click submit button
    await act(async () => {
      await userEvent.type(usernameInput, "ji");
      await userEvent.type(emailInput, "ji@gmail.com");
      await userEvent.type(passwordInput, "123456aB");
      await userEvent.type(confirmPasswordInput, "123456aB");
      await userEvent.click(submitBtn);
    });

    // check if success message is rendered
    const successMsg = await screen.findByText("Sign up successfully. Redirecting to home page...");
    expect(successMsg).toBeInTheDocument();
  });
});
