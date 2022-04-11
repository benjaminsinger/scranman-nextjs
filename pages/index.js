// import { createClient } from "contentful"
import {
  ApolloClient,
  InMemoryCache,
  gql
} from "@apollo/client";

import RecipeCard from "../components/RecipeCard";

export async function getStaticProps() {

  const client = new ApolloClient({
    uri: 'https://graphql.contentful.com/content/v1/spaces/gdlvgw0n17wb/',
    cache: new InMemoryCache(),
    // Enable sending cookies over cross-origin requests
    credentials: 'include',
    headers: {
      authorization: `Bearer ${process.env.REACT_APP_CONTENTFUL_ACCESS_KEY}`
    }
  });

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

export default function App(
  {
    data: {
      recipeCollection
    }
  }
) {
  // console.log(recipeCollection.total);
  return (
    <div className="recipe-list">
      {recipeCollection.items.map((recipe, i) =>( 
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
  
  // console.log(recipes);
  // return (
  //   <div className="recipe-list">
  //     {recipes.map(recipe =>( 
  //       <RecipeCard recipe={recipe} className="recipe" key={recipe.sys.id} />
  //     ))
  //   }
  //   <style jsx>{`
  //     .recipe-list {
  //       display:grid;
  //       grid-template-columns: 1fr;
  //       grid-gap: 20px 60px;
  //     }
  //     @media (min-width: 640px) {
  //       .recipe-list {
  //         grid-template-columns: 1fr 1fr;
  //       }
  //     }
  //     @media (min-width:1024px) {
  //       .recipe-list {
  //         grid-template-columns: 1fr 1fr 1fr;
  //       }
  //     }
  //   `}</style>
  //   </div>
  // )
}