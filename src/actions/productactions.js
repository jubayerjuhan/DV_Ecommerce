// add product to the server
import { authaxios, instance } from "./../utils/axios";

export const addproduct = (productdata) => async (dispatch) => {
  console.log(productdata, 'odododod')
  try {
    dispatch({ type: "ADD_PRODUCT_PENDING" })
    const { data } = await authaxios.post("/admin/product/new", productdata);
    dispatch({ type: "ADD_PRODUCT_FULFILLED", payload: data.success })

  } catch (err) {
    dispatch({ type: "ADD_PRODUCT_REJECTED", error: err.response.data.message || err.message })
  }
}


// get all products from the server
export const getallProducts = (keyword = '', ratings = 0, gte = 1, lte = 26009, page = 1,) => async (dispatch) => {
  try {
    dispatch({ type: "ALL_PRODUCTS_PENDING" })
    const { data } = await instance.get(`/products?ratings[gte]=${ratings}&price[gte]=${gte}&price[lte]=${lte}&page=${page}&keyword=${keyword}`);
    dispatch({ type: "ALL_PRODUCTS_FULFILLED", payload: data.products })
  } catch (err) {
    dispatch({ type: "ALL_PRODUCTS_REJECTED", error: err.response.data.message || err.message })

  }
}


// get single products from the server

export const getSingleProduct = (product_id) => async (dispatch) => {
  try {
    dispatch({ type: "SINGLE_PRODUCT_PENDING" })
    const { data } = await instance.get(`/product/${product_id}`);
    dispatch({ type: "SINGLE_PRODUCT_FULFILLED", payload: data.product })
  }
  catch (err) {
    dispatch({ type: "SINGLE_PRODUCT_REJECTED", error: err.response.data.message || err.message })
  }
}