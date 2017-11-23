import React, { Component } from 'react'
import SearchSuper from './search-super'
import SearchNormal from './search-normal'
import SearchPost from './search-posts'
import axios from 'axios'

class SearchResults extends Component {
  constructor(props){
    super(props)
    this.state = {
      all_collections: [],
      all_posts: [],
      supercollection: [],
      related_s: [],
      normalcollections: [],
      related_n: [],
      postswithtitle: [],
      related_to_post_with_title: [],
      postswithtags: [],
      related_to_postwtags: [],
      posts_after_splitting_query: [],
      related_to_posts_after_split: []
    }
  }

  componentDidMount(){

    axios.get(`http://hgognavtnecinv44.herokuapp.com/search/${this.props.match.params.query}`)
    .then(response => {
      this.setState({
        all_collections: response.data.collections,
        all_posts: response.data.posts,
        supercollection: response.data.supercollection,
        related_s: response.data.related_to_super_collections,
        normalcollections: response.data.normalcollection,
        related_n: response.data.related_to_normal_collection,
        postswithtags: response.data.posts_with_tags,
        related_to_postwtags: response.data.related_to_posts_with_tags,
        posts_after_splitting_query: response.data.post_with_broken_tags,
        related_to_posts_after_split: response.data.all_related_to_posts_with_broken_tags,
        postswithtitle: response.data.posts_with_title,
        related_to_posts_with_title: response.data.related_to_posts_with_title
        })})}

  render() {
    let displaycontent

    var statearray = Object.keys(this.state)
    var filter = statearray.filter(content => content.length !== 0)
    console.log(filter)

    if (filter.length == 0) {
      displaycontent = (
        <div>
          <h1> Oops We dont have anything on this right now </h1>
        </div>
      )} else {

        //if it gets a supercollection
        let supercollectioncontent

        if(this.state.supercollection.length > 0) {
          supercollectioncontent = (
            <div>
            <div id='search-box'>
              <h5 id='search-query'> Related </h5>
              <hr id='horizontalxx'/>
              </div>
              <div>
                <SearchSuper content={this.state.supercollection} collections={this.state.all_collections} posts={this.state.all_posts}/>
              </div>
            </div>
          )
        } else {
          supercollectioncontent = (null)
        }

        let relatedtosupercontent

        if(this.state.related_s.length > 0) {
          relatedtosupercontent = (
            <div>
            <div id='search-box'>
              <h5 id='search-query'> Related </h5>
              <hr id='horizontalxx'/>
            </div>
            <div>
                <SearchSuper content={this.state.related_s} collections={this.state.all_collections} posts={this.state.all_posts}/>
              </div>
            </div>

          )
        } else {
          relatedtosupercontent = (null)
        }

        // if theres a normal collection
        let normalcollectioncontent
        if(this.state.normalcollections.length > 0) {
          normalcollectioncontent = (
            <div>
              <div id='search-box'>
                <h5 id='search-query'> Collection </h5>
                <hr id='horizontalxx'/>
                </div>
              <div>
                <SearchNormal content={this.state.normalcollections} collections={this.state.all_collections} posts={this.state.all_posts}/>
              </div>
            </div>

           )
        } else {
          normalcollectioncontent = (null)
        }

        let relatedtonormalcontent

        if(this.state.related_n.length > 0) {
          relatedtonormalcontent = (
            <div>
              <div id='search-box'>
                <h5 id='search-query'> Related Collections </h5>
                <hr id='horizontalxx'/>
              </div>
              <div>
                <SearchNormal content={this.state.related_n} collections={this.state.all_collections} posts={this.state.all_posts}/>
              </div>
            </div> )
        } else {
          relatedtonormalcontent = (null)
        }


        //if it gets posts that have the query string matching their titles
        let postswithtitlecontent

        if(this.state.postswithtitle.length > 0) {
          postswithtitlecontent = (
            <div>
              <div id='search-box'>
                <h5 id='search-query'> Posts </h5>
                <hr id='horizontalxx'/>
                </div>
              <div>
                <SearchPost content={this.state.postswithtitle}  posts={this.state.all_posts}/>
              </div>
            </div> )
        } else {
          postswithtitlecontent = (null)
        }


        let relatedtopostswithtitlecontent
        if(this.state.related_to_post_with_title.length > 0) {
          relatedtopostswithtitlecontent = (
            <div>
              <div id='search-box'>
                <h5 id='seaarch-query'> Related </h5>
                <hr id='horizontalxx'/>
              </div>

              <div>
                <SearchPost content={this.state.related_to_post_with_title}  posts={this.state.all_posts}/>
              </div>
            </div> )
        } else {
          relatedtopostswithtitlecontent = (null)
        }


        //if the query matches the tags of any picture
        let postswithtagscontent

        if(this.state.postswithtags.length > 0) {
          postswithtagscontent = (
            <div>
              <div id='search-box'>
                <h5 id='search-query'> Posts </h5>
                <hr id='horizontalxx'/>
                </div>
              <div>
                <SearchPost content={this.state.postswithtags}  posts={this.state.all_posts}/>
              </div>
            </div> )
        } else {
          postswithtagscontent = (null)
        }

        let relatedtotagscontent

        if(this.state.related_to_postwtags.length > 0) {
          relatedtotagscontent = (
            <div>
              <div id='search-box'>
              <h5 id='search-query'> Related </h5>
              <hr id='horizontalxx'/>
              </div>
              <div>
                <SearchPost content={this.state.related_to_postwtags}  posts={this.state.all_posts}/>
              </div>
            </div> )
        } else {
          relatedtotagscontent = (null)
        }

        //split the query and fish posts that have any of the words in the query string in their title or posts
        let postsaftersplitcontent

        if(this.state.posts_after_splitting_query.length > 0) {
          postsaftersplitcontent = (
            <div>
              <div id='search-box'>
              <h5 id='search-query'> Related </h5>
              <hr id='horizontalxx'/>
              </div>
              <div>
                <SearchPost content={this.state.posts_after_splitting_query}  posts={this.state.all_posts}/>
              </div>
            </div> )
        } else {
          postsaftersplitcontent= (null)
        }

        let relatedtosplitcontent

        if(this.state.related_to_posts_after_split.length > 0) {
          relatedtosplitcontent = (
            <div>
              <div id='search-box'>
              <hr id='horizontalxx'/>
              </div>
              <div>
                <SearchPost content={this.state.related_to_posts_after_split }  posts={this.state.all_posts}/>
              </div>
            </div> ) }

        else {
          relatedtosplitcontent = (null) }


        displaycontent = (
          <div>
            {supercollectioncontent}
            {relatedtosupercontent}
            {normalcollectioncontent}
            {relatedtonormalcontent}
            {postswithtitlecontent}
            {relatedtopostswithtitlecontent}
            {postswithtagscontent}
            {relatedtotagscontent}
            {postsaftersplitcontent}
            {relatedtosplitcontent}
          </div>
        )
      }




    return(
      <div className='nest-morex'>
        {displaycontent}
      </div>

    )

  }

}

export default SearchResults
