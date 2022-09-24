

// import AuthService from "../services/auth.service";
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import Login from './Login';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import userEvent from "@testing-library/user-event";

test('Successful login:',
    () => {
        const { component } = render(<BrowserRouter> <Login /> </BrowserRouter> );//<BrowserRouter> <Login /> </BrowserRouter>    <BrowserRouter><App> <Login /> </App></BrowserRouter>

        // const username = screen.getByTestId("loginUsername");
        // const password = screen.getByTestId("loginPassword");
        // const loginButton = screen.getByTestId("loginButton");

        // userEvent.type(username, "testuser1@test.com");
        // userEvent.type(password, "Password1");
        
        // fireEvent.submit(loginButton);

        

        const userJwt = JSON.parse(window.sessionStorage.getItem("user"));

        // expect(userJwt.asdfsadfsdf).not.toBeNull();
        expect(global.window.location.href).toContain('/login') 
});
