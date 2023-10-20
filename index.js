
$(document).ready(() => {
  // current time
  // var now = moment();

  const $body = $('body');
  $body.html(''); // clear the body

  const $div = $('<div></div>').attr('id', 'timeline');
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
      const un = `@${tweet.user}`;

      $tweet.text(text);
      $username.text(un);
      // prepend $username to $tweet, will show up on different lines
      // figure out how to have username on one line and tweet next line
      // css display inline-block, add later when styling
      $tweet.prepend($username);

      // time variable 
      let time = ` ${moment(tweet.created_at).fromNow()}`;
      // console.log(typeof time);
      // append time to $tweet
      $tweet.append(time);

      // create variable for username, add click function
      $username.on('click', function() {
        // remove other users usernames and tweets
        $('.old-tweets').remove();
        // will prepend just the tweet clicked on
        // for loop through tweet.user array to isolate users tweets
        for (let i = 0; i < streams.users[tweet.user].length; i++ ) { 
          const $usertweet = $('<div></div>');
          $usertweet.attr('class', 'users-tweets');
          $usertweet.text(streams.users[tweet.user][i].message);
          $usertweet.prepend($username);
          $usertweet.append(time);
          $div.prepend($usertweet);
        }

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
    $('.users-tweets').remove();
    // invoke function
    $tweets();
  });
 
  // allow user to tweet
  // create form?
  // form would have username, message bar, timestamp
  // would have to push user data to streams obj?
  const $form = $('<form>');
  $form.attr('class', 'new-tweets');
  // form with 2 divs, one for username and one for tweet message
  // button to send tweet
  const $divun = $('<div>');
  $divun.attr('class', 'user-name');
  const $label = $('<label></label>');
  $label.attr('for', 'name').text('Name');
  $label.append($('<input>').attr('type', 'text').attr('id', 'name'));
  $divun.append($label);
  // append divun to form
  $form.append($divun);
  
  const $divmsg = $('<div></div>');
  $divmsg.attr('class', 'message');
  $divmsg.append($('<label>').attr('for', 'msg').text('Message'));
  $divmsg.append($('<textarea>').attr('id', 'msg'));
  // append to form 
  $form.append($divmsg);
  // send twidd button
  $form.append($('<button>').attr('type', 'button').attr('id', 'sendtwidd').text('Send Twidd'));

  $body.prepend($form);
  // on button click, post tweet and sending data to streams? or make new similar object for user
  const userStream = {
    home: [],
    users: {},
  };
  $('#sendtwidd').on('click', function() {
    console.log($('#name').val() + " " + $('#msg').val());
    console.log(typeof $('#name').val());
    $usertweets();
  })
  // make a $usertweets function, that is invoked on send button click
  // $usertweets function will push data from form to streams object, and then pull from that object to post
  const $usertweets = function() {
    // access data from form, add data to userStream obj
    let $uname = `@${$('#name').val()}`;
    let $umsg = $('#msg').val();
    // add data to userStream obj
    if(!userStream.users[$uname]) {
      userStream.users[$uname] = [$umsg];
    } else {
      userStream.users[$uname].unshift($umsg);
    }
    console.log(userStream);

    // pull from userStream obj to post to timeline
    // create tweet
    // prepend username to tweet
    // map?
    // each time function is invoked, the first value of the users tweet array is posted to timeline
    // let $tweet = $('div').attr('id', 'user-tweet');
    // $tweet.text(`${$uname}: ${userStream.users[$uname].slice(0, 1)}`);
    // console.log($tweet);
    // todo later: timestamp added on function invocation

  };
  
  // $body.append($tweets); // change from adding an entire array to just adding individual tweets

  // put inside map function?
  // instead of adding to body, you will want to make a div to hold tweets, so you can clear div instead of entire body

});
