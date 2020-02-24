import React from "react";
import style from "./recipe.module.css";
interface RecipeProps {
  title: string;
  calories: number;
  image: string;
  ingredients: any[];
}
interface IngredientType {
  text: string;
  weight: number;
}
const Recipe: React.SFC<RecipeProps> = ({
  title,
  calories,
  image,
  ingredients
}) => {
  return (
    <div className={style.recipe}>
      <h1>{title}</h1>
      <ol>
        {ingredients.map((ingredient: IngredientType, index: number) => (
          <li key={index}>{ingredient.text}</li>
        ))}
      </ol>
      <p>{calories}</p>
      <img className={style.image} src={image} alt="" />
    </div>
  );
};

export default Recipe;
