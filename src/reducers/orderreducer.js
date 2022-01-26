export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_USER_ORDER_PENDING':
      return {
        ...state,
        loading: true,
      }
    case 'GET_USER_ORDER_FULFILLED':
      return {
        ...state,
        loading: false,
        success: true,
        orders: action.payload,
      }
    case 'SUCCESS_RESET':
      return {
        ...state,
        success: false,
      }

    case 'GET_USER_ORDER_REJECTED':
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    default:
      return state;
  }
}

export const placeOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case 'PLACE_ORDER_PENDING':
      return {
        ...state,
        loading: true,
      }
    case 'PLACE_ORDER_FULFILLED':
      return {
        ...state,
        loading: false,
        success: true,
      }
    case 'SUCCESS_RESET_ORDER':
      return {
        ...state,
        success: false,
      }
    case 'PLACE_ORDER_REJECTED':
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    default:
      return state;
  }
}


export const getAllOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case "ALL_ORDER_PENDING":
      return {
        ...state,
        loading: true,
        success: false,
      };
    case "ALL_ORDER_FULFILLED":
      return {
        ...state,
        loading: false,
        success: true,
        orders: action.payload,
      };
    case "ALL_ORDER_REJECTED":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}



export const deleteOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case 'DELETE_ORDER_PENDING':
      return {
        ...state,
        loading: true,
      }
    case 'DELETE_ORDER_FULFILLED':
      return {
        ...state,
        loading: false,
        success: true,
      }
    case 'DELETE_ORDER_REJECTED':
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state;
  }
}


// orderstatus 
export const orderStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_ORDER_STATUS_PENDING':
      return {
        ...state,
        loading: true,
      }
    case 'UPDATE_ORDER_STATUS_FULFILLED':
      return {
        ...state,
        loading: false,
        success: true,

      }
    case 'UPDATE_ORDER_STATUS_REJECTED':
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state;
  }
}


export const getSingleOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_SINGLE_ORDER_PENDING":
      return {
        ...state,
        loading: true,
        success: false,
      };
    case "GET_SINGLE_ORDER_FULFULLED":
      return {
        ...state,
        loading: false,
        success: true,
        order: action.payload,
      };
    case "GET_SINGLE_ORDER_REJECTED":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}