# GitHub Avatar Downloader

## Problem Statement

Given a GitHub repository name and owner, download all the contributors' profile images and save them to a subdirectory, `avatars/`.

## Expected Usage

This program should be executed from the command line, in the following manner:

`node download_avatars.js jquery jquery`

... (whatever else you'd like to include)

## Important Authentication Stuffs!

The requirements for this assignement had us store secrets in a file called `secrets.js`, in the working directory of the main (`download_avitars.js`) script. It should look like this:

```js
module.exports = {
  GITHUB_TOKEN: "<YOUR_TOKEN>",
  GITHUB_USER: "<YOUR_USERNAME>"
}
```