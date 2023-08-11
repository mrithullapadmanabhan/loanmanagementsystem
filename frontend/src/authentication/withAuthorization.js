import React from 'react'

import AuthUserContext from './AuthUserContext'
import { withRouter } from './withRouter'

// To handle Component/Page level access
const withAuthorization = (authCondition) => (Component) => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      firebase.auth.onAuthStateChanged((authUser) => {
        if (!authCondition(authUser, this.props)) {
          this.props.history.push('/sign-in')
        }
      })
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {/* it either renders the passed component or not */}
          {(authUser) =>
            authUser ? (
              <Component {...this.props} loggedUser={authUser} />
            ) : null
          }
        </AuthUserContext.Consumer>
      )
    }
  }

  return withRouter(WithAuthorization) //using withRouter so we have access to history props
}

export default withAuthorization
