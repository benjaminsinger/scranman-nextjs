export default async function handler(req, res) {

    // check request type
    if (req.method !== 'POST') {
        res
        .status(400)
        .json({error: "invalid HTTP method - only POST requests are allowed"});
    }

    // check for secret 
    if (req.query.secret !== process.env.REACT_APP_CONTENTFUL_ACCESS_KEY) {
        return res
        .status(401)
        .json({message: "invalid token"})
    }

    // check body is not empty
    try {

        if (!req.body) {
            res.status(400).send("Bad request (no body)");
            return;
        }
        
        // get the slug to revalidate from body
        const slugToRevalidate = body.slugToRevalidate
        if (slugToRevalidate) {
            await res.unstable_revalidate(`/recipe/${slugToRevalidate}`)
            return res.json({ revalidated: true })
        } 

    } catch (err) {
        // if there is an error Next JS will continue
        // to show the last successfully generated page
        return res.status(500).send("error revalidating")
    }

}