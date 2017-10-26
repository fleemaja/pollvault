import * as UsersStorage from '../utils/users';

import { setAuthorizationToken } from '../utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode';

export const SET_CURRENT_USER = "SET_CURRENT_USER";

export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user
});

export const apiSignupUser = (user) => dispatch => (
  UsersStorage
    .signup(user)
    .then(res => {
        const token = res.data.token;
        localStorage.setItem('jwtToken', token);
        setAuthorizationToken(token);
        dispatch(setCurrentUser(jwtDecode(token)));
        return res
      }
    )
);

export const apiLoginUser = (user) => dispatch => (
  UsersStorage
    .login(user)
    .then(res => {
        const token = res.data.token;
        localStorage.setItem('jwtToken', token);
        setAuthorizationToken(token);
        dispatch(setCurrentUser(jwtDecode(token)));
        return res
      }
    )
);

export const apiLogoutUser = () => dispatch => {
  UsersStorage
    .logout()
    .then(res => {
      localStorage.removeItem('jwtToken');
      setAuthorizationToken(false);
      dispatch(setCurrentUser({}));
      return res
    })
}

export const apiUpdateUserAvatar = (photo) => dispatch => (
  UsersStorage
    .updateUserAvatar(photo)
    .then(response => dispatch(setCurrentUser(response.data.user)))
)
