import { authaxios, instance } from '../utils/axios.js';


// create user after signup info provided

export const registerUser = (registerinfo) => async (dispatch) => {
  console.log('registerinfo', registerinfo);
  try {
    dispatch({ type: 'REGISTER_USER_PENDING' });
    const { data } = await instance.post('/register', registerinfo);

    dispatch({ type: 'REGISTER_USER_FULFILLED', payload: data.success });
    localStorage.setItem('token', JSON.stringify({ expiry: Date.now() + 3 * 24 * 60 * 60 * 1000, token: data.token }));
  }
  catch (err) {
    console.log(err.response)
    dispatch({
      type: 'REGISTER_USER_REJECTED', payload: err.response.data.message
    })
  }
}

// load user after successful login and register

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: 'LOAD_USER_PENDING' });
    const { data } = await authaxios.get('/me');
    dispatch({ type: 'LOAD_USER_FULFILLED', payload: data.user });
    dispatch({ type: "RESET_SUCCESS" });
  }
  catch (err) {
    console.log(err)
    dispatch({ type: 'LOAD_USER_REJECTED', payload: err?.response?.data?.message || err.message });
  }
}


export const loginUser = (logindata) => async (dispatch) => {
  try {
    dispatch({ type: 'LOGIN_USER_PENDING' })
    const { data } = await instance.post('/login', logindata);
    dispatch({ type: 'LOGIN_USER_FULFILLED', payload: data.success });
    localStorage.setItem('token', JSON.stringify({ expiry: Date.now() + 3 * 24 * 60 * 60 * 1000, token: data.token }));
  } catch (err) {
    dispatch({ type: 'LOGIN_USER_REJECTED', payload: err?.response?.data?.message || err.message })
  }
}


export const forgetPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: 'FORGET_PASSWORD_PENDING' })
    const { data } = await instance.post('/forget-password', email);
    dispatch({ type: 'FORGET_PASSWORD_FULFILLED', payload: data });
  } catch (error) {
    dispatch({ type: 'FORGET_PASSWORD_REJECTED', payload: error?.response?.data?.message || error.message })
  }
}


export const resetPassword = (resetdata, token) => async (dispatch) => {
  try {
    dispatch({ type: 'RESET_PASSWORD_PENDING' })
    const { data } = await instance.put(`/reset-password/${token}`, resetdata, {

    });
    dispatch({ type: 'RESET_PASSWORD_FULFILLED', payload: data });
  } catch (error) {
    dispatch({ type: 'RESET_PASSWORD_REJECTED', payload: error?.response?.data?.message || error.message })
  }
}