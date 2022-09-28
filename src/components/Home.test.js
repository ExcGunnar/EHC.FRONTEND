import { render, fireEvent, screen, getByTestId } from "@testing-library/react";
import Home from "./Home";
import axios from "axios";

//test block
describe("Testing Home Component Renders", () => {
test("Home Componenet", () => {
// render the component on virtual dom
render(<Home />);

//assert the expected result
expect(screen.getByTestId('jumbo')).toHaveTextContent("Welcome to the E-Healthcare Portal! Please sign in or sign up.")
    });

});
