/* eslint-disable react/prop-types */
import { currencyFormatter } from '../util/formatting';
import Button from '../components/UI/Button';
import { CartContext } from '../store/CartContext';
import { useContext } from 'react';

// eslint-disable-next-line react/prop-types
export default function MealItem({ meal }) {
    const { addItem } = useContext(CartContext);

    function addMealToCart() {
        addItem(meal);
    }

    return (
        <li className="meal-item">
            <article>
                <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
                <div>
                    <h3>{meal.name}</h3>
                    <p className="meal-item-price">{currencyFormatter.format(meal.price)}</p>
                    <p className="meal-item-description">{meal.description}</p>
                </div>
                <p className="meal-item-actions">
                    <Button onClick={addMealToCart}>Add to Cart</Button>
                </p>
            </article>
        </li>
    );
}
