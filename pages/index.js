import { gql } from "@apollo/client";
import { client } from '../api/helpers'
import RecipeCard from "../components/RecipeCard";

export async function getStaticProps() {

  const { data } = await client.query({
    query: gql`
    query {
      recipeCollection {
        total
        items {
          title
          slug
          cookingTime
          thumbnail {
            width
            height
            title
            url(transform:{format: WEBP})
            size
          }
        }
      }
    }
    `
  })

  return {
    props: {
      data
    }
  };
}

export default function App({ data }) {
  const {items: foods} = data.recipeCollection;
  return (
    <div className="recipe-list">
      {foods.map((recipe, i) =>( 
        <RecipeCard recipe={recipe} key={i} className="recipe" />
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