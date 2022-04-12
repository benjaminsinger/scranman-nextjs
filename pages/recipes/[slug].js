import Image from 'next/image'
import { gql } from "@apollo/client";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { getPlaiceholder } from "plaiceholder";
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
            url(transform: {format: WEBP})
            width
            height
            title
          }
        }
      }
    }
    `
  })

  const {img, base64} = await getPlaiceholder(item.data.recipeCollection.items[0].featuredImage.url, {size: 4})

  return {
    props: {
      recipe: item.data.recipeCollection.items[0],
      placeholder: {
        img,
        base64
      }
    }
  }
}


export default function RecipeDetails({ recipe, placeholder }) {
  const { title, ingredients, featuredImage, cookingTime, method } = recipe
  console.log('placeholder', placeholder);
  return (
    <div>
      <div className="banner">
        <Image
          placeholder='blur'
          blurDataURL={`${placeholder.base64}`}
          alt={title}
          src={placeholder.img.src}
          width={featuredImage.width}
          height={featuredImage.height} />
        <h1>{title}</h1>
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
        .banner h1 {
          margin: 0;
          background: #fff;
          display: inline-block;
          padding: 1rem 20px;
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