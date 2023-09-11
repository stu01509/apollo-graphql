# apollo-graphql

## Get receipe

```gql
query getRecipe($id: ID!) {
    getRecipe(ID: $id) {
        name
    }
}
```

```gql
{
    "id": "64faf579cdc0bfb8d29cfefe"
}
```

## Get all receipes

```gql
query getRecipes {
    getRecipes {
        id
        name
        description
    }
}
```

## Create receipe

```gql
mutation CreateRecipe($recipeInput: RecipeInput) {
    createRecipe(recipeInput: $recipeInput) {
        name
        description
        thumbsUp
        thumbsDown
    }
}
```

```gql
{
    "recipeInput": {
        "name": "Coke",
        "description": "It's Coke"
    }
}
```

## Update receipe

```gql
mutation updateRecipe($id: ID!, $recipeInput: RecipeInput) {
    updateRecipe(ID: $id, recipeInput: $recipeInput)
}
```

```gql
{
    "id": "64faf579cdc0bfb8d29cfefe",
    "recipeInput": {
        "name": "YoYo",
        "description": "YO YO YO"
    }
}
```

## Delete receipe

```gql
mutation deleteRecipe($id: ID!) {
    deleteRecipe(ID: $id)
}
```

```gql
{
    "id": "64faf579cdc0bfb8d29cfefe"
}
```