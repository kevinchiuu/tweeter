/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// render html tweets element
const renderTweets = function(tweets) {
 
  for (let tweet of tweets) {
    const $tweetElem = createTweetElement(tweet);
    $('#tweets-container').append($tweetElem);
  }

};

// makes sure javascript string literals are protected from XSS
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//create html tweet element
const createTweetElement = function(tweet) {

  const $tweet = `
    <article class="tweet">
      <div class="tweet-box">

        <div class="tweet-header">
          <div class="profile-icon">
            <img class="tweet-avatar" src="${escape(tweet.user.avatars)}">
            <h3> ${escape(tweet.user.name)} </h3>
          </div>

          <div class="tweet-handle">
            <h3> ${escape(tweet.user.handle)} </h3>
          </div>
        </div>

        <p> ${escape(tweet.content.text)} </p>
        
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


$(document).ready(function() {

  $('form').on('submit', function(event) {

    event.preventDefault();

    const tweetLength = $("textarea").val().length;

    if (tweetLength > 140) {
      alert('Too many characters');

    } else if (tweetLength === 0) {
      alert('Please enter text');
    }

    $.ajax({
      url: '/tweets',
      type: 'POST',
      data: $('form').serialize()
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