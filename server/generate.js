const dummyPosts = require('./util/dummyPostsTide');

// Function to generate Instagram URL for each post
const generateInstagramUrls = (posts) => {
  return posts.map((post) => `https://www.instagram.com/p/${post.igId}/media/`);
};

// Generate URLs
const instagramUrls = generateInstagramUrls(dummyPosts);

// Print the URLs
instagramUrls.forEach((url) => console.log(url));
