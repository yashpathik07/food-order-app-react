import logo from '../assets/logo.jpg';
import Button from './UI/Button';
import { CartContext } from '../store/CartContext';
import { UserProgressContext } from '../store/UserProgressContext';
import { useContext } from 'react';

export default function Header() {
    const { items } = useContext(CartContext);
    const { showCart } = useContext(UserProgressContext);

    //...Reduce method converts an array into a single value/number.
    //...Reduce method takes 2 arguments.1st argument is the function and 2nd is the starting value.
    //...The 1st argument which is the function also takes 2 arguments by default.
    //...1st argument is the final value and 2nd is every item on items array on which reduce method has to work.

    const totalCartItems = items.reduce((totalNoOfItems, item) => {
        return totalNoOfItems + item.quantity;
    }, 0);

    function handleShowCart() {
        showCart();
    }

    return (
        <header id="main-header">
            <div id="title">
                <img src={logo} alt="A Restaurant" />
                <h1>ReactFood</h1>
            </div>
            <nav>
                <Button textOnly onClick={handleShowCart}>
                    Cart ({totalCartItems})
                </Button>
            </nav>
        </header>
    );
}
