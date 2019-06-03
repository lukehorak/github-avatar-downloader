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
    const jsonResults = JSON.parse(body);
    let resultURLs = [];
    for (user of jsonResults){
      resultURLs.push(user.avatar_url)
    }
    cb(err, resultURLs);
  });
}

console.log("Welcome to the GitHub Avatar Downloader!");

getRepoContributors("jquery", "jquery", function(err, result) {
  if (err) YEET(err);
  console.log("Result:", result)
})