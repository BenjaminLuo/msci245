import * as React from 'react';

const App = () => {

  const initialRecipes = [
    {
      title: 'Fruit salad',
      difficulty: '2',
      ingredients: ['apple', 'banana', 'blueberries', 'raisins', 'walnuts'],
      calories: "200",
      instructions: "Wash fresh fruit. Slice fruit into pieces. Mix all ingredients in a bowl.",
      recipeID: 1
    }, {
      title: 'Avocado wrap',
      difficulty: '3',
      ingredients: ['avocado', 'spinach', 'pine nuts', 'mayo', 'apple', 'tortilla bread'],
      calories: "400",
      instructions: "Wash all fruits and vegetables. Slice avocados and apples. Mix all ingredients and wrap them in a tortilla bread.",
      recipeID: 2
    },
  ];


  const [recipes, setRecipes] = React.useState(initialRecipes);
  const [ingredientSearchTerm, setIngredientSearchTerm] = React.useState('');
  const [difficultyLevel, setDifficultyLevel] = React.useState('');


  const handleRemoveRecipe = (item) => {

    // delete item["ingredients"];

    const newRecipes = recipes.filter(
      (recipe) => item.ingredients !== recipe.ingredients);
    
    setRecipes(newRecipes);
  };

  React.useEffect(() => {
    console.log("recipes " + recipes[0].title);
  }, []);



  const handleIngredientSearch = (event) => {
    setIngredientSearchTerm(event.target.value);
  };

  const handleDifficultyLevelSearch = (event) => {
    setDifficultyLevel(event.target.value);
  };

  const foundRecipesByIngredients = recipes.filter(function (recipe) {
    if (ingredientSearchTerm) {
      return recipe.ingredients.includes(ingredientSearchTerm);
    } else {
      return recipe;
    }
  });

  const foundRecipesByDifficulty = foundRecipesByIngredients.filter(function (recipe) {
    if (difficultyLevel) {
      return recipe.difficulty <= difficultyLevel;
    } else {
      return recipe;
    }
  });


  return (
    <div>
      <h1>
        Recipe finder
      </h1>
      

      <Search
        label="Search by ingredient: "
        onSearch={handleIngredientSearch}
      />

      <Search
        label="Search by max difficulty level: "
        onSearch={handleDifficultyLevelSearch}
      />

      <p>
        Containing ingredient: <strong>{ingredientSearchTerm}</strong>.
      </p>

      <p>
        Max difficulty level: <strong>{ingredientSearchTerm}</strong>.
      </p>

      <hr />


      <List
        list={recipes}
        onRemoveItem={handleRemoveRecipe}
      />
  

    </div>
  );
}

const Search = (props) => (
  <div>
    <label htmlFor="search">{props.label}</label>
    <input
      id="search"
      type="text"
      onChange={props.onSearch}
    />

  </div>
);



const List = ({ list, onRemoveItem }) => {
  return (
    <ul>
      {list.map((item) => {
        return (
          <Item
            item={item}
            onRemoveItem={onRemoveItem}
          />
        );
      })}
    </ul>

  )
}


const Item = ({ item, onRemoveItem }) => {
  const handleRemoveItem = () => {
    onRemoveItem(item);
    // return (
    //   <div>
    //     <p>
    //       <button type="button">
    //         Reveal
    //       </button>
    //     </p>
    //   </div>
    // )
  };

  return (
    <li>
      <p> {"Title: " + item.title}</p>
      <p> {"Difficulty: " + item.difficulty}</p>
      <p>Ingredients: </p>
      <ul>
        {item.ingredients.map((ingredient) => (<li>{ingredient}</li>))}
      </ul>
      <p>{"Instructions: " + item.instructions}</p>
      <p>{"Calories: " + item.calories}</p>
      <p>
        <button type="button" onClick={handleRemoveItem}>
          Dismiss
        </button>
      </p>
    </li>
  )
}



export default App;