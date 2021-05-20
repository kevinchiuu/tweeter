$(document).ready(function() {

  $("#tweet-text").on('keyup', function() {
    const max = 140;
    const charCount = $(this).val().length;
    const remaining = max - charCount;
    const $counter = $(this).parent().find('.counter');

    $counter.text((remaining));

    if (remaining < 0) {
      $counter.addClass('error');

    } else if (remaining >= 0) {
      $counter.removeClass('error');
    }
  });

});
