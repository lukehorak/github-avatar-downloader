const request = require('request');
const secrets = require('./secrets');
const YEET = require('./yeet');


const getRepoContributors = (repoOwner, repoName, cb) => {
  const options = {
    url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
    headers :{
      'User-Agent': 'request',
      'authorization': `${secrets.GITHUB_USER}:${secrets.GITHUB_TOKEN}`
    }
  };

  request(options, function(err, res, body){
    cb(err, body);
  });
}

console.log("Welcome to the GitHub Avatar Downloader!");

getRepoContributors("jquery", "jquery", function(err, result) {
  // yeet.js: Making error handling fun!
  if (err) YEET(err);
  const jsonResults = JSON.parse(result);
  let resultURLs = [];
  try{
    for (user of jsonResults){
      resultURLs.push(user.avatar_url)
    }
  }
  catch(e){
    YEET(e.message);
  }
  console.log("Result:", resultURLs)
})