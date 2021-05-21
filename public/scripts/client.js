/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// render html tweets element
const renderTweets = function(tweets) {

  $('#tweets-container').empty();

  for (const tweet of tweets) {
    const $tweetElem = createTweetElement(tweet);
    $('#tweets-container').prepend($tweetElem);
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
          <h6> ${timeago.format(tweet.create_at)} </h6>
      
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

//helper functions to show error messages
const createErrorElement1 = function() {
  $('#error-container').empty();
  const $error = `<div class="error1"> TOO MANY CHARACTERS </div>`;
  return $error;
};

const createErrorElement2 = function() {
  $('#error-container').empty();
  const $error = `<div class="error2"> PLEASE ENTER A TWEET </div>`;
  return $error;
};

// events will fire after page loads
$(document).ready(function() {

  $('#tweet-form').submit(function(event) {

    event.preventDefault();

    const tweetLength = $("textarea").val().length;

    if (tweetLength > 140) {
      $('#error-container').slideDown('slow', function() {
        $('#error-container').append(createErrorElement1());
      });
      return;

    } else if (tweetLength === 0) {
      $('#error-container').slideDown('slow', function() {
        $('#error-container').append(createErrorElement2());
      });
    }

    $.ajax({
      url: '/tweets',
      type: 'POST',
      data: $('#tweet-text').serialize()
    }).then((response)=> {
      loadTweets(response);
    }).catch(() => {
      $('#error-container').slideDown('slow');
    });

    $('textarea').val("");
    $('output').val(140);
    $('#error-container').empty();
    $('output').text(140).removeClass('error');
  });

  // fetching tweets with ajax
  const loadTweets = function() {
    $.ajax({
      url: '/tweets',
      type: 'GET',
      dataType: 'JSON'
    }).then((response) => {
      renderTweets(response);
    }).catch((error) => {
      console.error(error);
    });
  };

  loadTweets();

});