/* eslint-disable no-unused-vars */
import { createContext, useReducer } from 'react';

export const CartContext = createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (id) => {},
    clearCart: () => {},
});

function cartReducer(state, action) {
    if (action.type === 'ADD_ITEM') {
        //....update the state to add item logic
        //...findIndex runs on every item in the array like a map function and returns true if the conditions are met and get index of that item.
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id);

        const updatedItems = [...state.items];

        //...findIndex will return -1 if does not find the item i.e. the item does not exist still in items array.
        //...So here value > -1 means the item is already existing in the items array, so instead of adding the existing item we update the quantity of that item in the items array.
        if (existingCartItemIndex > -1) {
            const existingItem = state.items[existingCartItemIndex];
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1, //adding new property quan. to item.Using quan.
            };
            //updating the existing item in to the array
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            //initializing quantity to 1 that is added above
            //adding new item in to the array
            updatedItems.push({ ...action.item, quantity: 1 }); //defining quantity
        }
        return { ...state, items: updatedItems };
    }

    if (action.type === 'REMOVE_ITEM') {
        //....update the state to remove item logic
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id);

        const existingItem = state.items[existingCartItemIndex];

        const updatedItems = [...state.items];

        // if quantity is 1 we remove the entire item or else wu just decrease the quantity
        if (existingItem.quantity === 1) {
            updatedItems.splice(existingCartItemIndex, 1);
        } else {
            const updatedItem = { ...existingItem, quantity: existingItem.quantity - 1 };
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        return { ...state, items: updatedItems };
    }

    if (action.type === 'CLEAR_CART') {
        return { ...state, items: [] };
    }

    return state;
}

// eslint-disable-next-line react/prop-types
export function CartContextProvider({ children }) {
    const [cart, dispatchCart] = useReducer(cartReducer, { items: [] });

    function addItemToCart(item) {
        dispatchCart({
            type: 'ADD_ITEM',
            item: item, //item in white color is the item property we use in existingCartItemIndex to find the index
        });
    }

    function removeItemFromCart(id) {
        dispatchCart({
            type: 'REMOVE_ITEM',
            id: id,
        });
    }

    function clearCart() {
        dispatchCart({
            type: 'CLEAR_CART',
        });
    }

    const cartContext = {
        items: cart.items,
        addItem: addItemToCart,
        removeItem: removeItemFromCart,
        clearCart,
    };
    console.log(cartContext);

    return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>;
}
