const request = require('request');
const secrets = require('./secrets');
const fs = require('fs');

// Function to download avatars, given url
const downloadImageByURL = (url, filePath) => {
  request.get(url)
    .on('error', function (err) {
      throw err;
    })
    .pipe(fs.createWriteStream(filePath))
}

// Get all contributors to repo, peform callback on them
const getRepoContributors = (repoOwner, repoName, cb) => {
  const options = {
    url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
    headers: {
      'User-Agent': 'request',
      'authorization': `${secrets.GITHUB_USER}:${secrets.GITHUB_TOKEN}`
    }
  };

  request(options, function (err, res, body) {
      cb(err, body);
    })
    .on('response', function () {
      console.log('Response Received! Downloading images...')
    });
}


// The actual script!
console.log("Welcome to the GitHub Avatar Downloader!");

// Get Args/Argument count validation
const args = process.argv.slice(2);
if (args.length !== 2) {
  console.log("I need a user and a repo! Please provide these as two command line arguments!");
  process.exit(0)
}
// Do the thing!
getRepoContributors(args[0], args[1], function (err, result) {
  // Error Handling
  if (err) throw err;

  const jsonResults = JSON.parse(result);  
  // Empty result handling
  if (jsonResults.message === "Not Found") {
    console.log("No URLs Found!");
    return 0;
  }
  for (user of jsonResults) {
    downloadImageByURL(user.avatar_url, `./pics/${user.login}.jpg`)
  }
})