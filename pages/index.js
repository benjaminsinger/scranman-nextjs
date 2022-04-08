import { createClient } from "contentful"

export async function getStaticProps() {
  const client = createClient({
    space: `gdlvgw0n17wb`,
    accessToken: `g8nwxn5bl-mUUB-YPoqTWIy6uizUIHnGbEIA6Hb1tlY`,
  }) 
}

export default function Recipes() {
  return (
    <div className="recipe-list">
      Recipe List
    </div>
  )
}