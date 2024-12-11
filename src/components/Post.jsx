//
// POST
// ====
// This is a React component for an web site post. It
// demonstrates how to use data passed into the component
// packed into the params paremeter which is an object
// with the named attributes specified in the calling
// application code.
//
// Revision History
// ================
// 25.11.2024 BRD Original version
//
import classes from './Post.module.css';

function Post(props) {
   return (
      <li className = {classes.post}>
         <p className = {classes.author}>{props.author}</p>
         <p className = {classes.text}>{props.body}</p>
      </li>
   );
}
export default Post;
