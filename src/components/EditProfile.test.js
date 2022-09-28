import { render, fireEvent, screen } from "@testing-library/react";
import EditProfile from "../components/EditProfile";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { act } from 'react-dom/test-utils';




let url = ''
let body = {}
let authorization = "Bearer undefined"

jest.mock("axios", () => ({
    put: jest.fn((_url, _body, _auth) => { 
      return new Promise((resolve) => {
        url = _url
        body = _body
        authorization = _auth
        resolve(true)
      })
    })
  }));

//test block
describe("Testing Successful Edit Profile Component", () => {
test("Edit Profile", () => {
// render the component on virtual dom
render(<EditProfile />);
axios.put.mockResolvedValue(body, {"headers": {"Authorization": authorization}}, {status: 200})


//select the elements you want to interact with
const firstName = screen.getByTestId("firstName");
const lastName = screen.getByTestId("lastName");
const email = screen.getByTestId("email");
const password = screen.getByTestId("password");
const dateOfBirth = screen.getByTestId("dateOfBirth");
const phone = screen.getByTestId("phone");
const address = screen.getByTestId("address");

const submit = screen.getByTestId("submit");

userEvent.type(firstName, "testFirstName");
userEvent.type(lastName, "testLastName");
userEvent.type(email, "me@test.com");
userEvent.type(password, "123456");
userEvent.type(dateOfBirth, "03/23/1999");
userEvent.type(phone, "2132132133");
userEvent.type(address, "123 test street");


//interact with those elements


act(() => {
    fireEvent.click(submit);
  });

//assert the expected result
expect(axios.put).toHaveBeenCalled();
expect(axios.put).toHaveBeenCalledWith("http://localhost:30499/Ehc/User/UpdateUser", body, {"headers": {"Authorization": authorization}})
    });


test('Error: an error occurred', () => {
    const errorMessage = 'Error';
    axios.put.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );
});
});
