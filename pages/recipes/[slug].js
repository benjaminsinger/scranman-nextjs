import { createClient } from "contentful"
import {
  ApolloClient,
  InMemoryCache,
  gql
} from "@apollo/client";
import Image from 'next/image'
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

const client = new ApolloClient({
  uri: 'https://graphql.contentful.com/content/v1/spaces/gdlvgw0n17wb/',
  cache: new InMemoryCache(),
  // Enable sending cookies over cross-origin requests
  credentials: 'include',
  headers: {
    authorization: `Bearer ${process.env.REACT_APP_CONTENTFUL_ACCESS_KEY}`
  }
});

// export const getStaticPaths = async () => {
//   const res = await client.getEntries({ content_type: 'recipe' })

//   const paths = res.items.map(item => {
//     return {
//       params: { slug: item.fields.slug }
//     }
//   })
  
//   return {
//     paths,
//     fallback: false,
//   }
// }


export async function getStaticPaths() {

  const { data } = await client.query({
    query: gql`
      query {
        recipeCollection {
          items {
            title
            slug
            cookingTime
          }
        }
      }
    `
  })
    
  const paths = data.recipeCollection.items.map(recipe => ({
     params: { slug: recipe.slug },
  }));

  return {
     paths,
     fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const pageSlug = params.slug;
  const item = await client.query({
    query: gql`
    query {
      recipeCollection(where: {slug:"${pageSlug}"}) {
        items {
          title
          slug
          cookingTime
        }
      }
    }
    `
  })

  return {
    props: {
      recipe: item
    }
  }
}


export default function RecipeDetails({ recipe }) {
  // const { title, ingredients } = recipe
  console.log(recipe);
  return (
    <div className="recipedetails">lcontent here</div>
  )
  // return (
  //   <div>
  //     <div className="banner">
  //       <Image 
  //         src={`https:${featuredImage.url}`}
  //         width={featuredImage.width}
  //         height={featuredImage.height}
  //       />
  //       <h2>{title}</h2>
  //     </div>
  //     <div className="info">
  //       <p>Take about {cookingTime} mins to prepare</p>
  //       <h3>Ingredients:</h3>
  //       <ul>
  //       {ingredients.map((ingredient, i)=>(
  //         <li key={ingredient} data-key={ingredient}>{ingredient}</li>
  //       ))}
  //       </ul>
  //     </div>
  //     <div className="method">
  //       <h3>Method</h3>
  //       {documentToReactComponents(method)}
  //     </div>
  //     <style jsx>{`
  //       h2,h3 {
  //         text-transform: uppercase;
  //       }
  //       .banner h2 {
  //         margin: 0;
  //         background: #fff;
  //         display: inline-block;
  //         padding: 20px;
  //         position: relative;
  //         top: -60px;
  //         left: -10px;
  //         transform: rotateZ(-1deg);
  //         box-shadow: 1px 3px 5px rgba(0,0,0,0.1);
  //       }
  //       .info p {
  //         margin: 0;
  //       }
  //       .info span::after {
  //         content: ", ";
  //       }
  //       .info span:last-child::after {
  //         content: ".";
  //       }
  //     `}</style>
  //   </div>
  // )
}