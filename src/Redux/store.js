import { createStore, combineReducers } from 'redux';
import { cartReducers } from './reducers/cartReducers';
import  { carTotalReducers }  from './reducers/carTotalReducers';
import { userDidlog } from './reducers/userDidlog';


const reducer = combineReducers ({
       cart : cartReducers,
       cartTotal : carTotalReducers,
       userlogged : userDidlog,
})


const store =  createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store; 