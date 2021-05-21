/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// render html tweets element
const renderTweets = function(tweets) {
 
  for (let tweet of tweets) {
    const tweetElem = createTweetElement(tweet);
    $('#tweets-container').append(tweetElem);
  }

};

//create html tweet element
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


$(document).ready('', function() {

  $('form').on('submit', function(event) {

    event.preventDefault();

    $.ajax({
      url: '/tweets',
      type: 'POST',
      data: $('this').serialize()
    });

  });

  // fetching tweets with ajax
  const loadTweets = function() {
    $.ajax({
      url: '/tweets',
      type: 'GET',
      dataType: 'JSON'
    }).then((response) => {
      renderTweets(response);
    });
  };

  loadTweets();
});