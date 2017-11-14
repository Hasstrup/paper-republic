import ViewPost from './view-posts'
import viewCollections from './view-collections'
import ShowPost from './show-post'
import ShowCollection from './show-collections'
import NewPost from './post-form'
import NewCollectionForm from './collection-form'
import CollectionEditForm from './collection-edit-form'
import EditPostForm from './edit-post-form'
import Landing from './landing'
import React from 'react'
import { Switch, Route } from 'react-router-dom'


const Main = () => {
  return (
    <main>
        <Switch>
          <Route  exact path = '/' component={Landing} />
          <Route  exact path = '/posts' component={ViewPost}/>
          <Route  exact path = '/collections' component={viewCollections}/>
          <Route  exact path = '/posts/:id' component={ShowPost}/>
          <Route  exact path = '/collections/:id' component={ShowCollection}/>
          <Route  exact path = '/newposts/' component={NewPost} />
          <Route  exact path = '/newcollections' component={NewCollectionForm}/>
          <Route  exact path = '/editcollections/:id' component={CollectionEditForm}/>
          <Route  exact path = '/editposts/:id/' component={EditPostForm}/>
          </Switch>

    </main>
  )
}

export default Main;
