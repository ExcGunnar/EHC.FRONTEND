import CartService from './cart.service';
import axios from "axios";
import http from "../http-common"


// jest.mock('axios')
let url = ''
let body = {}


jest.mock("axios", () => ({
    get: jest.fn((_url, _body) => { 
      return new Promise((resolve) => {
        url = _url
        body = _body
        resolve(true)
      })
    })
  }));


  jest.mock("http", () => ({
    create: jest.fn((_url, _body) => { 
      return new Promise((resolve) => {
        url = _url
        body = _body
        resolve(true)
      })
    })
  }));
  const mockConfig = {
    headers:{
      Authorization: `Bearer 132456798sdfsdfsdfTest`,
    }
  };


describe("Testing getAllProducts function", () => {
        test("Successful getAllProducts call", () => {

            //arr
            const mockRes ={data: {name:"testmed", companyName:"gCorp", price:"1.23", quantity: "1",imageUrl: "https://picsum.photos/536/354", uses:"testUse", expireDate: "soon"}}
            axios.get.mockResolvedValue(mockRes)

            //act

            CartService.getAllProducts();

            //assert

            expect(axios.get).toHaveBeenCalled()
            expect(axios.get).toHaveBeenCalledWith("http://localhost:5000/Ehc/Medicine/GetAllMedicine", mockConfig)
        });

        test('Error: an error occurred', () => {
            const errorMessage = 'Error';
            axios.post.mockImplementationOnce(() =>
              Promise.reject(new Error(errorMessage))
            );
});
});

// describe("Testing register function", () => {
//     test("mocking external endpoint in axios register", () => {

//         //arr
//         const mockRes ={data: {email:"test@test.com", firstName:"gunnar", lastName:"humphrey", accessToken: "123456asdfasd",id: "1", isAdmin:"false"}}
//         axios.get.mockResolvedValue(mockRes)

//         const calledWith = {"address": "asdf", "dateOfBirth": "03/23/1999", "email": "test@test.com", "firstName": "gunnar", "id": 0, "isAdmin": false, "lastName": "humphrey", "password": "123456", "phone": "2142142144"}
//         //act

//         AuthService.register("gunnar", "humphrey", "test@test.com", "123456", "03/23/1999", "2142142144", "asdf");

//         //assert

//         expect(axios.post).toHaveBeenCalled()
//         expect(axios.post).toHaveBeenCalledWith("http://localhost:5000/Ehc/User/SignUp", calledWith)
//     });

//     test('Error: an error occurred', () => {
//         const errorMessage = 'Error';
//         axios.post.mockImplementationOnce(() =>
//           Promise.reject(new Error(errorMessage))
//         );
// });
// });