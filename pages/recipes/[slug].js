import Image from 'next/image'
import { gql } from "@apollo/client";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { client } from '../../api/helpers'


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
  const item = await client.query({
    query: gql`
    query {
      recipeCollection(where: {slug:"${params.slug}"}) {
        items {
          title
          slug
          cookingTime
          ingredients
          method {
            json
          }
          featuredImage {
            url(transform:{format: WEBP})
            width
            height
          }
        }
      }
    }
    `
  })

  return {
    props: {
      recipe: item.data.recipeCollection.items[0]
    }
  }
}


export default function RecipeDetails({ recipe }) {
  const { title, ingredients, featuredImage, cookingTime, method } = recipe

  return (
    <div>
      <div className="banner">
        { featuredImage && 
        <Image
          placeholder="blur"
          blurDataURL={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='}
          src={`${featuredImage.url}`}
          width={featuredImage.width}
          height={featuredImage.height}
        />}
        <h2>{title}</h2>
      </div>
      <div className="info">
        <p>Takes around {cookingTime} mins to prepare</p>
        <h3>Ingredients:</h3>
        <ul>
        {ingredients.map((ingredient, i)=>(
          <li key={ingredient} data-key={ingredient}>{ingredient}</li>
        ))}
        </ul>
      </div>
      <div className="method">
        <h3>Method</h3>
        {documentToReactComponents(method.json)}
      </div>
      <style jsx>{`
        h2,h3 {
          text-transform: uppercase;
        }
        .banner h2 {
          margin: 0;
          background: #fff;
          display: inline-block;
          padding: 20px;
          position: relative;
          top: -60px;
          left: -10px;
          transform: rotateZ(-1deg);
          box-shadow: 1px 3px 5px rgba(0,0,0,0.1);
        }
        .info p {
          margin: 0;
        }
        .info span::after {
          content: ", ";
        }
        .info span:last-child::after {
          content: ".";
        }
      `}</style>
    </div>
  )
}