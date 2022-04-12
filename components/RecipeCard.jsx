import { FaRegClock } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

function RecipeCard({ recipe }) {
  const {title, slug, cookingTime, thumbnail} = recipe;
  return (
      <div className='card'>
          <div className="featured">
              { thumbnail && 
              <Image
                width={thumbnail.width}
                height={thumbnail.height} 
                src={`${thumbnail.url}`} 
                alt={thumbnail.title} /> }
          </div>
          <div className="content">
              <div className="info">
                  <h2>{title}</h2>
                  <p>Takes approx {cookingTime} mins to make</p>
                  <FaRegClock style={{position: 'absolute', borderRadius: '10em', padding: '.5em', marginTop:'.5em', color: '#000', background:'#f4e640', boxShadow: '0px 2px 0 0 #dace44' }} />
              </div>
              <div className="actions">
                  <Link href={`/recipes/${slug}`} >
                      <a>Cook this</a>
                  </Link>
              </div>
          </div>

  <style jsx>{`
      .card {
        transform: rotateZ(-1deg);
      }
      .content {
        background: #fff;
        box-shadow: 1px 3px 5px rgba(0,0,0,0.1);
        margin: 0;
        position: relative;
        top: -40px;
        left: -10px;
      }
      .info {
        padding: 16px;
      }
      .info h4 {
        margin: 4px 0;
        text-transform: uppercase;
      }
      .info p {
        margin: 0;
        color: #777;
      }
      .actions {
        margin-top: 20px;
        display: flex;
        justify-content: flex-end;
      }
      .actions a {
        color: #fff;
        background: #f01b29;
        padding: 16px 24px;
        text-decoration: none;
        transition: all .2s ease;
      }
      .actions a:hover {
        color: #fff;
        background: #b30c17;
        padding: 16px 24px;
        text-decoration: none;
        transform: scale(1.1);
      }
    `}</style>
          
      </div>
  )
}

export default RecipeCard