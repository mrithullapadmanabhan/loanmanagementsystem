import React from 'react'
import { withRouter } from './withRouter'
import AuthUserContext from './AuthUserContext' //using provider's context api
import { getUserByToken } from '../service/api'

// To handle App level access
const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    state = {
      authUser: null,
    }

    async componentDidMount() {
      console.log("logic for authentication")
      const user = await getUserByToken()
      if (user) {
        console.log("from WithAuthentication",user);
        this.setState({ authUser: user })
        const path = window.location.pathname.split('/')[1]
        console.log(path);
        if (path === 'register' || path === 'login') {
          this.props.router.navigate('/');
        }
      }
       else {
        const path = window.location.pathname.split('/')[1]
        console.log(path);
        if (path === 'login') {
          this.props.router.navigate('/login');
        } else {
          this.props.router.navigate('/register');
        }
      }
    }

    render() {
      const { authUser } = this.state
      return (
        //   passing down the authUser value, so other components can consume it
        <AuthUserContext.Provider value={authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      )
    }
  }

  return withRouter(WithAuthentication);
}

export default withAuthentication;
