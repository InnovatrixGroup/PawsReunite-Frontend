import React from "react";
import { render } from "@testing-library/react";
import FilterProvider from "../contexts/FilterContext";
import UserPostProvider from "../contexts/UserPostContext";
import { BrowserRouter } from "react-router-dom";

function RenderWithContext(props) {
  return (
    <BrowserRouter>
      <UserPostProvider>
        <FilterProvider>{props.children}</FilterProvider>
      </UserPostProvider>
    </BrowserRouter>
  );
}

const customerRender = (ui, options) => render(ui, { wrapper: RenderWithContext, ...options });

export * from "@testing-library/react";
export { customerRender as render };
