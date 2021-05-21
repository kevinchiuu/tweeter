/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
};

const renderTweets = function(tweets) {

};

const createTweetElement = function(tweet) {

  const $tweet = `
    <article class="tweet">
        <div class="tweet-box">

          <div class="tweet-header">
            <div class="profile-icon">
              <img class="tweet-avatar" src="${tweet.user.avatars}">
              <h3> ${tweet.user.name} </h3>
            </div>

            <div class="tweet-handle">
              <h3> ${tweet.user.handle} </h3>
            </div>
          </div>

          <p> ${tweet.content.text} </p>
          
          <hr>

          <div class="tweet-footer">
            <h6> times tamp </h6>
        
            <div class="tweet-icons">
              <a href=""> <i class="fas fa-flag fa-xs"></i> </a>
              <a href=""> <i class="fas fa-retweet fa-xs"></i> </a>
              <a href=""> <i class="fas fa-heart fa-xs"></i> </a>
            </div>
          </div>
        </div>
    </article>
  `;

  return $tweet;
};

const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.