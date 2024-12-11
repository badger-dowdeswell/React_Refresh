//
// REACT-REFRESH
// =============
// This is a React sandbox application that was used on the React refresher part of Maximilian Schwarzmüller's
// Next.js Udemy course.
//
// Revision History
// ================
// 24.11.2024 BRD Original version
//
import './App.css';
import PostsList from './components/PostsList';
import MainHeader from './components/MainHeader';
import { useState } from 'react';

function App() {
   const [modalIsVisible, setModalIsVisible] = useState(false);

   function showModalHandler() {
      setModalIsVisible(true);
   }

   function hideModalHandler() {
      setModalIsVisible(false);
   }

   return (
      <div>
         <MainHeader onCreatePost={showModalHandler} />
         <main>
            <PostsList
               isPosting={modalIsVisible}
               onStopPosting={hideModalHandler} />
         </main>
      </div>
   );
}
export default App;
