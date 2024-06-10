// import { useState, useEffect } from 'react';
import MealItem from './MealItem';
import useHttp from './hooks/useHttp';
import Error from './error';

const requestConfig = {};

export default function Meals() {
    // const [loadedMeals, setLoadedMeals] = useState([]);

    // useEffect(() => {
    //     async function fetchMeals() {
    //         const response = await fetch('http://localhost:3000/meals');
    //         const meals = await response.json();
    //         setLoadedMeals(meals);
    //     }

    //     fetchMeals();
    // }, []);

    const { data: loadedMeals, isLoading, error } = useHttp('http://localhost:3000/meals', requestConfig, []);

    if (isLoading) {
        return <p className="center">Fetching Meals...</p>;
    }

    if (error) {
        return <Error title="failed to fetch Meals..." message={error} />;
    }

    return (
        <ul id="meals">
            {loadedMeals.map((meal) => (
                <MealItem key={meal.id} meal={meal} />
            ))}
        </ul>
    );
}
