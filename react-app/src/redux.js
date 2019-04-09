import {
    createStore,
} from 'redux';
import update from 'react-addons-update';

export const setProductList = (payload) => ({
   
    type:"SET_PRODUCT_LIST",
    payload
});
export const updateNinjaDetails = (payload) => ({
});


export const ppmReducer=(state =initialState, action)=>{
    console.log("reducer state",state,action.type,action.payload);
    switch (action.type) {
        
      case 'SET_PRODUCT_LIST':
            return Object.assign({},
                                state,
                                {productList:action.payload})
     
      
       default:
             return state;
    }

}



const initialState = { 
    productList:[]
};

export function configureStore(initialState = initialState) { // initialState = initialState | {}
    const store = createStore(ppmReducer,initialState);
    return store;
};

export const store = configureStore();
