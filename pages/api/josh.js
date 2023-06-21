// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const name = "Ashok";

export default function handler(req, res) {
  console.log('requestarrived')
  res.status(200).json({ name: name }) 
}
