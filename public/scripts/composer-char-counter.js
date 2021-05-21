/* eslint-disable no-undef */
/* eslint-env jquery */
$(document).ready(function() {

  $("#tweet-text").on('keyup', function() {
    const max = 140;
    const charCount = $(this).val().length;
    const charRemaining = max - charCount;
    const $counter = $(this).parent().find('.counter');

    $counter.text(charRemaining);
    
    if (charRemaining < 0) {
      $counter.addClass('error');

    } else {
      $counter.removeClass('error');
    }
  });

});
