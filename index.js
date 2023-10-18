
$(document).ready(() => {
  const $body = $('body');
  $body.html(''); // clear the body

  const $div = $('<div></div>');
  $body.append($div);
  // $div.html(''); // clear the div
  // make tweets a function that returns a map
  const $tweets = function() {
    return streams.home.map((tweet) => {
      const $tweet = $('<div></div>');
      $tweet.attr('class', 'old-tweets');
      const text = `@${tweet.user}: ${tweet.message}`;

      $tweet.text(text);
      let time = new Date().getTime();
      $tweet.append(time);

      $tweet.on('click', function() {
        console.log(streams.users[tweet.user]);
      });

      return $div.prepend($tweet);
    });
  };

  const $button = $('<button></button>');
  $body.prepend($button);
  $button.text('Gimme twidds');
  $button.on('click', function() {
    // remove here
    $('.old-tweets').remove();
    $tweets();
    new Date().getTime();
  });
  // add click to tweet, inside of tweets function?
  // or change tweets function, so each individual tweet can be accessed?

  // $body.append($tweets); // change from adding an entire array to just adding individual tweets
  // $div.append($tweets);
  // put inside map function?
  // instead of adding to body, you will want to make a div to hold tweets, so you can clear div instead of entire body

});
