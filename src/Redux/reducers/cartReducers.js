import * as actionTypes from '../constants/cartConstants'; 

export const cartReducers = ( state = { cartItems: [] }, action ) => {
       switch (action.type){
           case actionTypes.ADD_TO_CART:
             const item = action.payload;

             const existItem = state.cartItems.find((x) => x.ProductName === item.ProductName);

             if(existItem){
                 return{
                     ...state,
                     cartItems: state.cartItems.map((x) => x.ProductName === existItem.ProductName ? item : x)
                 }
             }else{
                 return {
                     ...state,
                     cartItems: [...state.cartItems, item],
                 }
             } 
             
           case actionTypes.REMOVE_FROM_CART:
               return {
                   ...state,
                   cartItems: state.cartItems.filter((item) => item.ProductName !== action.payload.ProductName)
               }

           case actionTypes.ADJUST_QTY:
               return {
                   ...state,
                   cartItems : state.cartItems.map( item => item.ProductName === action.payload.ProductName ? {...item, quantity: action.payload.quantity} : item)
               }
 
           default:
               return state; 
       }
}