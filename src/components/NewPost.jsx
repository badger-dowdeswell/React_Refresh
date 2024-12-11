//
// NEW POST
// ========
// This is a React component that is able to create a new post
// amongst the list of current posts. It illustrates how the
// props object passed in to this component can return the data
// entered back up to to other components. It illustrates the
// React capability called Lifting Up State.
//
// Revision History
// ================
// 28.11.2024 BRD Original version
// 30.11.2024 BRD Modified to now exchange information with other
//                components.
// 08.12.2024 BRD Added control of the form to stop submission back
//                to the server; all activity will be handled locally
//                on the front-end client side.
// 10.12.2024 BRD Extended this to add the new post to the set
//                of existing posts by passing in and using the
//                onAddPost handler.
//
import classes from './NewPost.module.css';
import { useState } from 'react';

function NewPost({onCancel, onAddPost }) {
   // The parameters of the useState definition below are actually the
   // deconstructed attributes of the object enteredBody: enteredBody[0]
   // is the variable enteredBody and enteredBody[1] is the function
   // setEnteredBody that updates the variable. Since useState is able to
   // trigger a dynamic page refresh, this React method is a good way to
   // allow data to be shared between components using a technique
   // called "State Lifting". The '' in useState defintion signifies
   // that the data type exchanged is a string.
   //
   const [enteredAuthor, setEnteredAuthor] = useState('');
   function authorChangeHandler(event) {
      setEnteredAuthor(event.target.value);
   }

   const [enteredBody, setEnteredBody] = useState('');
   function bodyChangeHandler(event) {
      setEnteredBody(event.target.value);
   }

   //
   // submitHandler
   // =============
   // This handles client-side form submission by blocking
   // the browser from sending an HTTP request to the server.
   // The preventDefault method blocks the normal browser
   // submit behaviour. It also closes the NewPost modal
   // window dialog.
   //
   function submitHandler(event) {
      event.preventDefault();
      const postData = {
         author: enteredAuthor,
         body: enteredBody
      };
      onAddPost(postData);
      onCancel();
   }

   return (
      <form className={classes.form} onSubmit={submitHandler}>
         <p>
            <label htmlFor="name">Your name</label>
            <input
               id="name"
               type="text"
               required
               onChange={authorChangeHandler}
            />
         </p>

         <p>
            <label htmlFor="body">Text</label>
            <textarea
               id="body"
               required rows={3}
               onChange={bodyChangeHandler}
            />
         </p>

         <p className={classes.actions}>
            <button
               type="button"
               onClick={onCancel}
            >
               Cancel
            </button>

            <button>
               Submit
            </button>
         </p>
      </form>
   );
}
export default NewPost;
