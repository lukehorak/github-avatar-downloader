const request = require('request');
const YEET = require('./yeet');
const secrets = require('./secrets');


const getRepoContributors = (repoOwner, repoName, cb) => {
  const options = {
    url: `https://api.github.com/repos/${repoOwner}/${repoName}`,
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
  console.log("Errors:", err);
  console.log("Result:", result)
})