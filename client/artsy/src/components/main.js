import React from 'react'
import { Switch, Route} from 'react-router'

const Main = () => {
  return (
    <main>
      <Switch>
        <Route exact path = '/' component={Authenticate}/>
          <Route exact path = '/posts' render={props => <   {...props}/>}/>
          <Route exact path = '/collections' render={props => <   {...props}/>}/>
          <Route exact path = '/posts/:id' render={props => <   {...props}/>}/>
          <Route exact path = '/collections/:id' render={props => <   {...props}/>}/>
          <Route exact path = '/posts/new' render={props => <   {...props}/>}/>
          <Route exact path = '/collections/new' render={props => <   {...props}/>}/>
      </Switch>

    </main>
  )
}

export default Main;
