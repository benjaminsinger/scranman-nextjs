import { createClient } from "contentful"
import RecipeCard from "../components/RecipeCard";

export async function getStaticProps() {

  const client = createClient({
    space: `${process.env.REACT_APP_CONTENTFUL_SPACE_ID}`,
    accessToken: `${process.env.REACT_APP_CONTENTFUL_ACCESS_KEY}`
  })
  
  const res = await client.getEntries({ content_type: 'recipe' });

  return {
    props: {
      recipes: res.items,
    }
  }

}

export default function Recipes( { recipes } ) {
  console.log(recipes);
  return (
    <div className="recipe-list">
      {recipes.map(recipe =>( 
        <RecipeCard recipe={recipe} className="recipe" recipe={recipe} key={recipe.sys.id} />
      ))
    }
    <style jsx>{`
      .recipe-list {
        display:grid;
        grid-template-columns: 1fr;
        grid-gap: 20px 60px;
      }
      @media (min-width: 640px) {
        .recipe-list {
          grid-template-columns: 1fr 1fr;
        }
      }
      @media (min-width:1024px) {
        .recipe-list {
          grid-template-columns: 1fr 1fr 1fr;
        }
      }
    `}</style>
    </div>
  )
}