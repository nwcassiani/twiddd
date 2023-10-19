
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
  
      // make username it's own div, id : username
      let $username = $('<div></div>');
      $username.attr('id', 'username');

      // const text = `@${username}: ${tweet.message}`;
      const text = `${tweet.message}`;
      const un = `${tweet.user}`;

      $tweet.text(text);
      $username.text(un);
      // prepend $username to $tweet, will show up on different lines
      // figure out how to have username on one line and tweet next line
      // css display inline-block, add later when styling
      $tweet.prepend($username);

      let time = new Date().getTime();
      $tweet.append(time);

      // create variable for username, add click function
      $username.on('click', function() {
        // what to do here so only users tweets show
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
