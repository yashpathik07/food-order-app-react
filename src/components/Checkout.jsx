import Modal from './UI/Modal';
import { CartContext } from '../store/CartContext';
import { UserProgressContext } from '../store/UserProgressContext';
import { useContext } from 'react';
import { currencyFormatter } from '../util/formatting';
import Input from './UI/Input';
import Button from './UI/Button';
import useHttp from './hooks/useHttp';
import Error from './error';

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
};

export default function Checkout() {
    const { items, clearCart } = useContext(CartContext);
    const { progress, hideCheckOut } = useContext(UserProgressContext);

    const {
        data,
        isLoading: isSending,
        error,
        sendRequest,
        clearData,
    } = useHttp('http://localhost:3000/orders', requestConfig);

    const cartTotal = items.reduce((totalPrice, item) => {
        return totalPrice + item.quantity * item.price;
    }, 0);

    function handleCloseCheckout() {
        hideCheckOut();
    }

    function handleFinish() {
        hideCheckOut();
        clearCart();
        clearData();
    }

    function handleSubmit(event) {
        event.preventDefault();

        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());

        sendRequest(
            JSON.stringify({
                order: {
                    items: items,
                    customer: customerData,
                },
            })
        );

        // fetch('http://localhost:3000/orders', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         order: {
        //             items: items,
        //             customer: customerData,
        //         },
        //     }),
        // });
    }

    let actions = (
        <>
            <Button onClick={handleCloseCheckout} type="button" textOnly>
                Close
            </Button>
            <Button>Place Order</Button>
        </>
    );

    if (isSending) {
        actions = <span>Sending order data...</span>;
    }

    if (data && !error) {
        return (
            <Modal open={progress === 'checkout'} onClose={handleFinish}>
                <h2>Success</h2>
                <p>Your order was placed successfully</p>
                <p>Order tracking details will be sent to your registered email</p>
                <p className="modal-actions">
                    <Button onClick={handleFinish}>Okay</Button>
                </p>
            </Modal>
        );
    }

    return (
        <Modal open={progress === 'checkout'} onClose={handleCloseCheckout}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>TotalAmount: {currencyFormatter.format(cartTotal)}</p>
                <Input label="Full name" type="text" id="name" />
                <Input label="E-mail Address" type="email" id="email" />
                <Input label="Street" type="text" id="street" />
                <div className="control-row">
                    <Input label="City" type="text" id="city" />
                    <Input label="Postal Code" type="text" id="postal-code" />
                </div>
                {error && <Error title="Failed to send order" message={error} />}
                <p className="modal-actions">{actions}</p>
            </form>
        </Modal>
    );
}
