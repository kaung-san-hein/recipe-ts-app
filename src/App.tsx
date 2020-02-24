import React, { ChangeEvent, FormEvent } from "react";
import "./App.css";
import Recipe from "./Recipe";

interface RecipeType {
  recipe: {
    calories: number;
    label: string;
    image: string;
    ingredients: any[];
  };
}
interface RecipesProps {}
interface RecipesState {
  recipes: any[];
  search: string;
}

const APP_ID: string = "456f4b99";
const APP_KEY: string = "fb3ae75b616dc85f2c98ce4da3544851";

class App extends React.Component<RecipesProps, RecipesState> {
  state = {
    recipes: [],
    search: ""
  };

  async componentDidMount() {
    const response = await fetch(
      `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    const recipes = data.hits;
    this.setState({
      recipes
    });
  }

  handleSearch = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    const search = target.value;
    this.setState({
      search
    });
  };

  handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const search = this.state.search;
    const response = await fetch(
      `https://api.edamam.com/search?q=${search}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    const recipes = data.hits;
    this.setState({
      recipes,
      search: ""
    });
  };

  render() {
    const { recipes, search } = this.state;
    return (
      <div className="App">
        <form className="search-form" onSubmit={this.handleSubmit}>
          <input
            className="search-bar"
            type="text"
            value={search}
            onChange={this.handleSearch}
          />
          <button className="search-button" type="submit">
            Search
          </button>
        </form>
        <div className="recipes">
          {recipes.map((recipe: RecipeType, index: number) => (
            <Recipe
              key={index}
              title={recipe.recipe.label}
              calories={recipe.recipe.calories}
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
