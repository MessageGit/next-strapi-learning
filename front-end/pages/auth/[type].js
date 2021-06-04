import Login from '../../components/auth/login/login'
import Signup from '../../components/auth/signup/signup'

const Auth = (props) => {

    const logType = props.type;

    return (
      <>
        {(logType == 'login') ? (<Login />) : (<Signup />)}
      </>
    )
}

export async function getStaticProps({ params }) {
    const logType = params.type;

    return {
      props: { type: logType }
    }
  }
  
  export async function getStaticPaths() {

    return {
      paths: ['/auth/login', '/auth/signup'],
      fallback: false,
    }
  }
  
export default Auth