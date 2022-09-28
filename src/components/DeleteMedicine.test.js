import { render, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { act } from 'react-dom/test-utils';
import DeleteMedicine from "./DeleteMedicine";




let url = ''
let body = {}
let auth = ''
let authorization = "Bearer undefined"

let header = {"headers": {"Authorization": authorization}};


jest.mock("axios", () => ({
    delete: jest.fn((_url, _body, _auth) => { 
      return new Promise((resolve) => {
        url = _url
        body = _body
        resolve(true)
      })
    })
  }));

//test block
describe("Testing Deleting Medicine Component", () => {
test("increments counter", () => {
// render the component on virtual dom
render(<DeleteMedicine />);
axios.delete.mockResolvedValue(body, header, {status: 200})//{"headers": {"Authorization": authorization}}


//select the elements you want to interact with

const id = screen.getByTestId("id");

const submit = screen.getByTestId("submit");

userEvent.type(id, "1");

//interact with those elements

act(() => {
    fireEvent.click(submit);
  });

//assert the expected result
expect(axios.delete).toHaveBeenCalled();
expect(axios.delete).toHaveBeenCalledWith("http://localhost:30499/Ehc/Medicine/DeleteMedicineById/undefined", header)//{"headers": {"Authorization": authorization}}
    });


test('Error: an error occurred', () => {
    const errorMessage = 'Error';
    axios.delete.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );
});
});
