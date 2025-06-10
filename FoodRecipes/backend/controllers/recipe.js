const Recipes = require("../modules/recipe");

// Get all recipes
const getRecipes = async (req, res) => {
  try {
    const allRecipes = await Recipes.find();
    return res.status(200).json(allRecipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return res.status(500).json({ message: "Server error while fetching recipes" });
  }
};

// Add a new recipe
const addRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions, time } = req.body;

    if (!title || !ingredients || !instructions) {
      return res.status(400).json({ message: "Required fields can't be empty" });
    }

    const newRecipe = await Recipes.create({
      title,
      ingredients,
      instructions,
      time,
    });

    return res.status(201).json(newRecipe);
  } catch (error) {
    console.error("Error adding recipe:", error);
    return res.status(500).json({ message: "Server error while adding recipe" });
  }
};

// Edit a recipe
const editRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, ingredients, instructions, time } = req.body;

    const updatedRecipe = await Recipes.findByIdAndUpdate(
      id,
      { title, ingredients, instructions, time },
      { new: true }
    );

    if (!updatedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    return res.status(200).json(updatedRecipe);
  } catch (error) {
    console.error("Error editing recipe:", error);
    return res.status(500).json({ message: "Server error while editing recipe" });
  }
};

// Delete a recipe
const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRecipe = await Recipes.findByIdAndDelete(id);

    if (!deletedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    return res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    return res.status(500).json({ message: "Server error while deleting recipe" });
  }
};

module.exports = {
  getRecipes,
  addRecipe,
  editRecipe,
  deleteRecipe,
};
