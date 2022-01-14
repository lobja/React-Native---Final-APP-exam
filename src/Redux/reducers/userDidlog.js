import * as actionTypes from '../constants/cartConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';

//const initialState = AsyncStorage.getItem('TokenKey');

// const initialState = {
//     TokenKey: AsyncStorage.getItem('TokenKey'),
//  }

export const userDidlog = (state = "" , action)=>{
        switch(action.type){
            case actionTypes.USER_IN:
               return  action.payload  
            case actionTypes.USER_OUT:
                return action.payload  
            default:
                return state;
        }   
         
}
         
    
