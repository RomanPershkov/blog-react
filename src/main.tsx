import * as React from "react"
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Store } from 'redux'
import { History } from 'history'
import { Auth0Provider } from "./contexts/auth0-context"
import Routes from "./routes"
import { ApplicationState } from "./store"

interface MainProps {
    store: Store<ApplicationState>
    history: History
  }
    
  const Main: React.FC<MainProps> = ({ store, history }) => {
    return (
      <Provider store={store}>
        <Auth0Provider>
            <ConnectedRouter history={history}>                
                <Routes />                
            </ConnectedRouter>
        </Auth0Provider>
      </Provider>      
    )
  }
  
  export default Main