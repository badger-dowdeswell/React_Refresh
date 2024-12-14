//
// POSTS LIST
// ==========
// This is a React component that is able to create a list of posts.
//
// Revision History
// ================
// 27.11.2024 BRD Original version
// 30.11.2024 BRD Added an example of State Lifting.
// 02.12.2024 BRD Converted the page to a modal dialog
//                that can also be hidden.
// 10.12.2024 BRD Add the capability to display a list
//                of posts from a managed array.
//
import classes from './PostsList.module.css';
import Post from './Post';
import NewPost from './NewPost';
import Modal from './Modal';
import { useState } from 'react';
import { useEffect } from 'react';

function PostsList({ isPosting, onStopPosting }) {
   const [posts, setPosts] = useState([]);
   const [isFetching, setIsFetching ] = useState(false);

   //
   // fetchPosts
   // ==========
   // This reads the list of previous posts from the database.
   // The useEffect hook ensures that this does not execute in
   // an endless loop when the component renders the list of
   // posts. The useEffect is not returning a promise even though
   // it is using an async function. Instead, the fetchPosts()
   // method is called inside the useEffect and effectively localises
   // the promise inside itself.
   //
   // When is the hook executed? Since the dependency array []
   // at the end is blank, it will only be execute once when
   // the component renders. This is a special case of useEffect
   // that is useful for initialising some aspect of the component
   // just once. This useEffect renders immediately after the
   // component renders so the page will already have a page formatted
   // ready to display the posts on.
   //
   useEffect(() => {
      async function fetchPosts() {
         setIsFetching(true);
         const response = await fetch('http://localhost:8080/posts');
         const resData = await response.json();
         setPosts(resData.posts);
         setIsFetching(false);
      }
      fetchPosts();
   }, [] );

   function addPostHandler(postData) {
      fetch('http://localhost:8080/posts', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(postData)
      });

      //
      // setPosts
      // ========
      // The ... is the JavaScript Spread operator
      // used to add the new post to the list of existing
      // posts. The function is used to ensure React gets
      // and displays the latest state data. Just updating
      // the postData with the spread function alone might
      // not be reliable in every situation if there are
      // multiple pending state updates. The rule is if the
      // new state depends directly on the old state, then
      // we should always use the function format.
      //
      setPosts((existingPosts) => [postData, ...existingPosts]);
   }
   return (
      <div>
         {isPosting && (
            <Modal onClose={onStopPosting}>
               <NewPost
                  onCancel={onStopPosting}
                  onAddPost={addPostHandler}
               />
            </Modal>
         )}

         <div>
            {!isFetching && posts.length > 0 ?
               <ul className={classes.posts}>
                  {/* The map function iterates through the array of
                      post objects one by one. The index parameter
                      is a counter in the loop. This makes an ideal key.
                      since it is guaranteed to be unique.
                  */ }
                  {posts.map((post, index) =>
                     <Post
                        key={index}
                        author={post.author}
                        body={post.body + " " + index}
                     />)
                  }
               </ul>
               : <p></p>
            }

            {isFetching && (
               <div style={{ textAlign: 'center', color: 'white'}}>
                  <p>Loading posts</p>
               </div>
            )}
         </div>
      </div>
   );
}
export default PostsList;
