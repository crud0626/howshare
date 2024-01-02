import EmptyState from "./EmptyState"
import getCurrentUser from "./actions/getCurrentUser"
import getListings, { IListingsParams } from "./actions/getListings"
import Container from "./components/Container"
import ListingCard from "./components/listings/ListingCard"

interface HomeProps {
  searchParams: IListingsParams
}

export const dynamic = "force-dynamic"

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams)
  const currentUser = await getCurrentUser()

  if (listings.length === 0) {
    return <EmptyState showReset={Object.keys(searchParams).length !== 0} />
  }

  return (
    <Container>
      <div className=" pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {listings.map(list => {
          return <ListingCard key={list.id} data={list} currentUser={currentUser} />
        })}
      </div>
    </Container>
  )
}

export default Home
