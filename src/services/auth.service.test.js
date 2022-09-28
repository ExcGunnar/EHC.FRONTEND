import AuthService from './auth.service';
import axios from "axios";

// jest.mock('axios')
let url = ''
let body = {}


jest.mock("axios", () => ({
    post: jest.fn((_url, _body) => { 
      return new Promise((resolve) => {
        url = _url
        body = _body
        resolve(true)
      })
    })
  }));


describe("Testing login function", () => {
        test("Successful login call", () => {

            //arr
            const mockRes ={data: {email:"test@test.com", firstName:"gunnar", lastName:"humphrey", accessToken: "123456asdfasd",id: "1", isAdmin:"false"}}
            axios.post.mockResolvedValue(mockRes)

            const calledWith = {"IsAdmin": "false", "email": "test@gmail.com", "password": "testPass"}
            //act

            AuthService.login("test@gmail.com", "testPass");

            //assert

            expect(axios.post).toHaveBeenCalled()
            expect(axios.post).toHaveBeenCalledWith("http://localhost:30499/Ehc/User/SignIn", calledWith)
        });

        test('Error: an error occurred', () => {
            const errorMessage = 'Error';
            axios.post.mockImplementationOnce(() =>
              Promise.reject(new Error(errorMessage))
            );
});
});

describe("Testing register function", () => {
    test("mocking external endpoint in axios register", () => {

        //arr
        const mockRes ={data: {email:"test@test.com", firstName:"gunnar", lastName:"humphrey", accessToken: "123456asdfasd",id: "1", isAdmin:"false"}}
        axios.post.mockResolvedValue(mockRes)

        const calledWith = {"address": "asdf", "dateOfBirth": "03/23/1999", "email": "test@test.com", "firstName": "gunnar", "id": 0, "isAdmin": false, "lastName": "humphrey", "password": "123456", "phone": "2142142144"}
        //act

        AuthService.register("gunnar", "humphrey", "test@test.com", "123456", "03/23/1999", "2142142144", "asdf");

        //assert

        expect(axios.post).toHaveBeenCalled()
        expect(axios.post).toHaveBeenCalledWith("http://localhost:5000/Ehc/User/SignUp", calledWith)
    });

    test('Error: an error occurred', () => {
        const errorMessage = 'Error';
        axios.post.mockImplementationOnce(() =>
          Promise.reject(new Error(errorMessage))
        );
});
});