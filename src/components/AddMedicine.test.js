import { render, fireEvent, screen } from "@testing-library/react";
import AddMedicine from "../components/AddMedicine";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { act } from 'react-dom/test-utils';




let url = ''
let body = {}
let authorization = "Bearer undefined"

jest.mock("axios", () => ({
    post: jest.fn((_url, _body, _auth) => { 
      return new Promise((resolve) => {
        url = _url
        body = _body
        authorization = _auth
        resolve(true)
      })
    })
  }));

//test block
describe("Testing Adding Medicine Component", () => {
test("increments counter", () => {
// render the component on virtual dom
render(<AddMedicine />);
axios.post.mockResolvedValue(body, {"headers": {"Authorization": authorization}}, {status: 200})


//select the elements you want to interact with
const name = screen.getByTestId("name");
const companyName = screen.getByTestId("companyName");
const price = screen.getByTestId("price");
const quantity = screen.getByTestId("quantity");
const imageUrl = screen.getByTestId("imageUrl");
const uses = screen.getByTestId("uses");
const expireDate = screen.getByTestId("expireDate");

const submit = screen.getByTestId("submit");

userEvent.type(name, "test name");
userEvent.type(companyName, "companyTest");
userEvent.type(price, "12");
userEvent.type(quantity, "2");
userEvent.type(imageUrl, "testimage.com");
userEvent.type(uses, "test use");
userEvent.type(expireDate, "soon");


//interact with those elements


act(() => {
    fireEvent.click(submit);
  });

//assert the expected result
expect(axios.post).toHaveBeenCalled();
expect(axios.post).toHaveBeenCalledWith("http://localhost:30499/Ehc/Medicine/AddMedicine", body, {"headers": {"Authorization": authorization}})
    });


test('Error: an error occurred', () => {
    const errorMessage = 'Error';
    axios.post.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );
});
});
