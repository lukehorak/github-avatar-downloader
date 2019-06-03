const request = require('request');
const secrets = require('./secrets');

//const downloadImageByURL(url, filePath)

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
  const jsonResults = JSON.parse(result);
  let resultURLs = []

  if (jsonResults.message === "Not Found"){
    console.log("No URLs Found!");
    return resultURLs
  }

  for (user of jsonResults){
    resultURLs.push(user.avatar_url)
  }
  console.log(resultURLs);
})