//
// Posts
// =====
//
// Revision History
// ================
// 11.12.2024 BRD Original version based on Maximilliam
//                Schwarzmüller's course material.
//
import { readFile, writeFile } from 'node:fs/promises';

async function getStoredPosts() {
  const rawFileContent = await readFile('posts.json', { encoding: 'utf-8' });
  const data = JSON.parse(rawFileContent);
  const storedPosts = data.posts ?? [];
  return storedPosts;
}

function storePosts(posts) {
  return writeFile('posts.json', JSON.stringify({ posts: posts || [] }));
}

const _getStoredPosts = getStoredPosts;
export { _getStoredPosts as getStoredPosts };
const _storePosts = storePosts;
export { _storePosts as storePosts };
