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

//import { useState } from 'react';

function PostsList({ isPosting, onStopPosting }) {
   const [posts, setPosts] = useState([]);

   function addPostHandler(postData) {
      // The ... is the JavaScript Spread operator
      // used to add the new post to the list of existing
      // posts. The function is used to ensure React gets
      // and displays the latest state data. Just updating
      // the postData with the spread function alone might
      // not be reliable in every situation if there are
      // multiple pending state updates. The rule is if the
      // new state depends directly on the old state, then
      // we should always use the function format.
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
            {posts.length > 0 ?
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
            : <p>There are no posts to show</p>
            }
         </div>
      </div>
   );
}
export default PostsList;
