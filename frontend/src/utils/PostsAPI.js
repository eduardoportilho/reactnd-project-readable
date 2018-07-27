const api = "http://localhost:3001";

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token;
if (!token)
  token = localStorage.token = Math.random()
    .toString(36)
    .substr(-8);

const headers = {
  Accept: "application/json",
  Authorization: token
};

export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories);

export const getAllPosts = () =>
  fetch(`${api}/posts`, { headers }).then(res => res.json());

export const getPostsFromCategory = categoryPath =>
  fetch(`${api}/${categoryPath}/posts`, { headers }).then(res => res.json());

export const getPost = id =>
  fetch(`${api}/posts/${id}`, { headers }).then(res => res.json());

export const getPostComments = id =>
  fetch(`${api}/posts/${id}/comments`, { headers }).then(res => res.json());

export const addNewPost = post =>
  fetch(`${api}/posts`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(post)
  }).then(res => res.json());

export const updatePost = (id, post) =>
  fetch(`${api}/posts/${id}`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(post)
  }).then(res => res.json());

export const deletePost = id =>
  fetch(`${api}/posts/${id}`, {
    method: "DELETE",
    headers
  }).then(res => res.json());

export const voteOnPost = (postId, isUpVote) =>
  fetch(`${api}/posts/${postId}`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      option: isUpVote ? "upVote" : "downVote"
    })
  }).then(res => res.json());

export const addComment = comment =>
  fetch(`${api}/comments`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(comment)
  }).then(res => res.json());

export const deleteComment = id =>
  fetch(`${api}/comments/${id}`, {
    method: "DELETE",
    headers
  }).then(res => res.json());

export const updateComment = (id, comment) =>
  fetch(`${api}/comments/${id}`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(comment)
  }).then(res => res.json());
