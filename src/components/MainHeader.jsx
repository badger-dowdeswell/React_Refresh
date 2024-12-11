//
// MAIN HEADER
// ===========
// This component displays a header on the top of the page. It is
// styled by CSS in the provate MainHeader.module.css file.
//
// This component uses icons from the react-icons library. This can
// be installed with the command:
//
//      npm install react-icons --legacy-peer-deps
//
// The --legacy-peer-deps parameter stops error messages about conflicts
// with older libraries.
//
// Revision History
// ================
// 08.12.2024 BRD Original version
//
import classes from "./MainHeader.module.css";
import { MdPostAdd, MdMessage } from 'react-icons/md';

function MainHeader({ onCreatePost }) {
   return (
      <header className={classes.header}>
         <h1 className={classes.logo}>
            <MdMessage />
            React Poster
         </h1>

         <p>
            <button className={classes.button} onClick={onCreatePost}>
               <MdPostAdd size={18} />
               New Post
            </button>
         </p>
      </header>
   );
};
export default MainHeader;
