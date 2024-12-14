//
// Back-End
// ========
// This is the back-end data manager for the React refresher
// course React Poster application. It manages posts stored
// in the local data folder in the posts.js file and provides
// the api calls to exchange data with the front-end.
//
// Configuration
// =============
// On a new system, run npm install to configure all dependencies.
// Install nonemon to automatically restart the server when the
// code has changed:  npm install -g nodemon
//
// To create a new database with no posts, place this line in
// posts.json :   {"posts":[]}
//
// Revision History
// ================
// 11.12.2024 BRD Original version based on Maximilliam
//                Schwarzmüller's course material. Also
//                revised the base system to include nodemon
//                and to fix a lot of broken dependencies.
//
import express from 'express';
import { getStoredPosts, storePosts } from './data/posts.js';

// The TCP port that this back-end will listen on for HTTP requests
// from the front-end.
const PORT = 8080;
//
// Start the Back-End
// ==================
const app = express();
app.use(express.json());
app.listen(PORT);

app.use((req, res, next) => {
   // Attach CORS headers. These are required when using a detached
   // backend that runs on a different domain.
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
   next();
});

console.clear();
var dt = new Date();
console.log("Back-End is now listening on port " + PORT +
            " at " + dt.toLocaleTimeString() +
            " on " + dt.toLocaleDateString() + ".");

//
// Get Posts api
// =============
// This returns all the posts stored in the database as a set]
// of JSON objects.
//
app.get('/posts', async (req, res) => {
   const storedPosts = await getStoredPosts();

   // This simulates a delay of 1.5 seconds to illustrate how to make the
   // front-end handle a promise that resolves in real time, not
   // instantaneously.
   await new Promise((resolve, reject) => setTimeout(() => resolve(), 1500));
   console.log("Loaded current posts");
   res.json({ posts: storedPosts });
});

//
//
//
app.get('/posts/:id', async (req, res) => {
   const storedPosts = await getStoredPosts();
   const post = storedPosts.find((post) => post.id === req.params.id);
   res.json({ post });
});

//
//
//
app.post('/posts', async (req, res) => {
   const existingPosts = await getStoredPosts();
   const postData = req.body;
   const newPost = {
      ...postData,
      id: Math.random().toString(),
   };
   const updatedPosts = [newPost, ...existingPosts];
   await storePosts(updatedPosts);
   res.status(201).json({ message: 'Stored new post.', post: newPost });
  console.log("Created new post");
});
