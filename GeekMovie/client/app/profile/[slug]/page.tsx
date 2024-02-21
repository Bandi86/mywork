export default function profilePage({ params }: { params: { slug: string } }) {
  return (
    <>
    <h1>My Page</h1>
    <p>My slug is {params.slug}</p>
    </>
  )
}
