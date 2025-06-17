import "./App.css";
import { useZero, useQuery } from "@rocicorp/zero/react";
import type { Schema } from "../zero-schema.gen";

function App() {
  const z = useZero<Schema>();
  const mealIngredientsList = useQuery(z.query.mealIngredients);

  const addIngredient = async () => {
    const newIngredient = {
      id: `ing-${Date.now()}`,
      name: `New ingredient at ${new Date().toLocaleTimeString()}`,
    };

    // This will optimistically update the UI and then sync to server
    await z.mutate.mealIngredients.insert(newIngredient);
  };

  return (
    <>
      <div className="card">
        <button onClick={addIngredient}>click to add message </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      {mealIngredientsList[0].map((ingredient) => (
        <div key={ingredient.id} className="message">
          <h2>{ingredient.name}</h2>
        </div>
      ))}
    </>
  );
}

export default App;
