import {Component} from 'react'

import 'mock-local-storage'

// import AuthService from "../services/auth.service";
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import Login from './Login';
import { BrowserRouter } from 'react-router-dom';
import userEvent from "@testing-library/user-event";
global.window = {}

test('Successful login:',
    () => {
        const { component } = render(<BrowserRouter> <Login /> </BrowserRouter>);

        const username = screen.getByTestId("loginUsername");
        const password = screen.getByTestId("loginPassword");
        const loginButton = screen.getByTestId("loginButton");

        userEvent.type(username, "testuser1@test.com");
        userEvent.type(password, "Password1");
        
        fireEvent.click(loginButton);

        const userJwt = JSON.parse(window.sessionStorage.getItem("user"));

        expect(userJwt.asdfsadfsdf).not.toBeNull();
});
