
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
      // make username bold
      $username.css('font-weight', 'bold');
      // prepend $username to $tweet, will show up on different lines
      // figure out how to have username on one line and tweet next line
      // css display inline-block, add later when styling
      

      // time variable 
      const $time = $('<span>');
      let time = ` ${moment(tweet.created_at).fromNow()}`; // 
      let timeStamp = ` ${tweet.created_at.toLocaleString()}`;
      $time.text(time);
      $time.css('color', 'gray');
      // console.log(typeof time);
      // append time to $tweet
      $username.append($time);
      $tweet.prepend($username);
      $tweet.append(timeStamp);
      // $tweet.append($time);
      // $tweet.css('padding', '2');

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
          $usertweet.append(timeStamp);
          $usertweet.prepend($username);
          $usertweet.css('padding', '2');
          $div.prepend($usertweet);
        }

        // console.log(streams.users[tweet.user]);
      });

      return $div.prepend($tweet);
    });
  };
  // may need to put button inside of div to align properly
  // tweet button div
  const $postDiv = $('<div>');
  $postDiv.attr('id', 'twidd-buttons');
  $body.prepend($postDiv);
  $postDiv.css('margin-left', 'auto').css('margin-right', 'auto').css('width', '50em');
  $postDiv.css('padding', '10px');

  const $button = $('<button></button>');
  $postDiv.append($button);
  $button.text('gimme twidds');
  $button.css('padding', '2');
  $button.css('margin-left', '10px');
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
  $label.attr('for', 'name').text('name');
  $label.append($('<input>').attr('type', 'text').attr('id', 'name'));
  $divun.append($label);
  // append divun to form
  $form.append($divun);
  
  const $divmsg = $('<div></div>');
  $divmsg.attr('class', 'message');
  $divmsg.append($('<label>').attr('for', 'msg').text('twidd'));
  $divmsg.append($('<textarea>').attr('id', 'msg'));
  // append to form 
  $form.append($divmsg);
  // send twidd button
  $form.append($('<button>').attr('type', 'button').attr('id', 'sendtwidd').text('send twidd'));

  // FORM STYLING
  $form.css('margin', '10px');
  $form.css('width', '100px');
  $form.css('padding', '2');
  // $form.css('border', '1pm solid #CCC').css('border-radius', '1');

  $('<textarea>').css('vertical-align', 'top');


  $postDiv.prepend($form);
  // on button click, post tweet and sending data to streams? or make new similar object for user
  // const userStream = {
  //   home: [],
  //   users: {},
  // };
  $('#sendtwidd').on('click', function() {
    // console.log($('#name').val() + " " + $('#msg').val());
    // console.log(typeof $('#name').val());
    let $uname = $('#name').val();
    let $umsg = $('#msg').val();
    window.visitor = $uname;
    streams.users[window.visitor] = [];
    console.log(streams.users);
    writeTweet($umsg);
    $('.old-tweets').remove();
    $('.users-tweets').remove();
    $tweets();
    // $('#timeline').prepend(streams.users[window.visitor].slice(0, 1));
  });
  
  // $body.append($tweets); // change from adding an entire array to just adding individual tweets

  // put inside map function?
  // instead of adding to body, you will want to make a div to hold tweets, so you can clear div instead of entire body
  // STYLE
  $('body').css('background-color', 'rgb(255, 236, 179)');
  $('body').css('font-family', 'Arial');

  // Header
  const $header = $('<header>');
  const $h1 = $('<h1>');
  $h1.text('twiddler');
  $h1.css('text-align', 'center');
  $body.prepend($header);
  $header.prepend($h1);
  $header.css('border', '2px solid black');
  $header.css('margin-left', 'auto').css('margin-right', 'auto').css('width', '10em');

  // twidds
  $('button').css('font-weight', 'bold');

  //TIMELINE
  $div.css('background-color', 'rgb(255, 242, 204)');
  $div.css('margin-left', 'auto').css('margin-right', 'auto').css('width', '50em');

});
