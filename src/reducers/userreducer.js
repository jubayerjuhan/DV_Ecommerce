export const registerUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "REGISTER_USER_PENDING":
    case "LOAD_USER_PENIDNG":
    case "LOGIN_USER_PENDING":
      return {
        ...state,
        loading: true,
        success: false,
      };
    case "REGISTER_USER_FULFILLED":
    case "LOGIN_USER_FULFILLED":
      return {
        ...state,
        loading: false,
        isloggedin: true,
        success: action.payload,
      };
    case "RESET_SUCCESS":
      return {
        ...state,
        success: null,
      }
    case "LOAD_USER_FULFILLED":
      return {
        ...state,
        loading: false,
        user: action.payload,
        isloggedin: true,

      };
    case "REGISTER_USER_REJECTED":
    case "LOAD_USER_REJECTED":
    case "LOGIN_USER_REJECTED":
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload
      }

    case "CLEAR_ERROR":
      return {
        ...state,
        error: null
      }

    default:
      return state;
  }
}


export const getAllUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "ALL_USER_PENDING":
      return {
        ...state,
        loading: true,
        success: false,
      };
    case "ALL_USER_FULFILLED":
      return {
        ...state,
        loading: false,
        success: action.payload,
      };
    case "ALL_USER_REJECTED":
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload
      };
    default:
      return state;
  }

}


// forget password reducer
export const forgetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case "FORGET_PASSWORD_PENDING":
    case "RESET_PASSWORD_PENDING":
      return {
        ...state,
        loading: true,
        success: false,
      };
    case "FORGET_PASSWORD_FULFILLED":
    case "RESET_PASSWORD_FULFILLED":
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        message: action.payload?.message,
      };
    case "FORGET_PASSWORD_REJECTED":
    case "RESET_PASSWORD_REJECTED":
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }

}