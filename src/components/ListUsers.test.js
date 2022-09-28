import { render, fireEvent, screen, getByTestId, cleanup } from "@testing-library/react";
import ListUsers from "./ListUsers";
import axios from "axios";
import CustomerService from "../services/customer.service";



//test block
describe("Testing List Users Component Rendering", () => {
test("Home Componenet", () => {
// render the component on virtual dom
render(<ListUsers />);

//assert the expected result
expect(screen.getByTestId('List')).toHaveTextContent("User")
    });


});




