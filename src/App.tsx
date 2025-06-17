import { useZero, useQuery } from "@rocicorp/zero/react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import type { Schema } from "../zero-schema.gen";

function App() {
  const z = useZero<Schema>();
  const mealIngredientsList = useQuery(z.query.mealIngredients);

  const addIngredient = async () => {
    const newIngredient = {
      id: uuidv4(),
      name: `New ingredient at ${new Date().toLocaleTimeString()}`,
    };

    // This will optimistically update the UI and then sync to server
    await z.mutate.mealIngredients.insert(newIngredient);
  };

  console.log("mealIngredients", mealIngredientsList);

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
