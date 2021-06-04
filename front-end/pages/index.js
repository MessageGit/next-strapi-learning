import PageContainer from '../components/global/pageContainer'
import Meta from '../components/global/meta'
import Navbar from '../components/navbar/navbar'

import { getClientSession } from '../middlewares/session';

const Home = ({ user }) => {

  return (
    <PageContainer>
      <Meta pageName="Accueil - Social project" description="It's a web social project"/>
      <Navbar />
      <main>
        <h1>{user?.username}</h1>
      </main>
    </PageContainer>
  )
};

export const getServerSideProps = getClientSession(({ req }) => {
  return {
    props: {
      user: req.session.get('user') || null,
    }
  }
})

export default Home;