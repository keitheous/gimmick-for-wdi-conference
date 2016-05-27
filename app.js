$( document ).ready(function() {

  console.log("Guess where is the Panda?");
  var cards = ['panda','poo','miss'];
  var panda = 0;
  var fail = 0;
  var miss = 0;
  var gameFinished = false;

  var disableClicks = function(){
    $('.arena').css("pointer-events","none");
  }
  var enableClicks = function(){
    $('.arena').css("pointer-events","auto");
  }

  var displayScore = function(){
    // console.log("panda score: ",panda);
    // console.log("poo score: ",fail);
    // console.log("miss score: ",miss);
    $( "#panda-score").text(panda);
    $( "#poo-score" ).text(fail);
  }
  displayScore();

  var appendThree = function(img){
    $('#1').children().attr('src',img);
    $('#2').children().attr('src',img);
    $('#3').children().attr('src',img);
    if (gameFinished == false){
      $(".box").removeClass("animated shake");
      enableClicks();
    } else {
      disableClicks();
    }
  }

  var shuffle = function(){
    cards = _.shuffle(cards);
    console.log("shuffled!~")
    // console.log(cards);
    // enableClicks();

  }

  // var reset = function(){
  //   console.log("RESET");
  //   shuffle();
  // }

  //wrte a shuffle function (DRY)
  $('#shuffleBtn').on('click', function(){
    shuffle();
  });

  var returnImage = function(selection){
    if (selection == 'panda'){
      return "found_2.png"
    } else if (selection == 'poo'){
      return "fail_2.png"
    } else { //miss
       return "miss_2.png"
    }
  }

  shuffle();

  var revertDisplay = function(){
    $('.submission').hide()
    $('.instructions').show()

  }

  // if ($('#emailInput').val() != ""){
  //   console.log('j');
  //   $('#submit-btn').addClass("clickable");
  // }
  // else{
  //   $('#submit-btn').css("pointer-events","auto");
  // }

  $('#submit-btn').on('click', function(event) {
    event.preventDefault();
    if ($('#emailInput').val() === ""){
        $('#email-display').html("Please enter a valid email.")
      }
    else{
    var emailInput = $('#emailInput').val();
    // console.log(emailInput);
    // email-display
    $('#email-display').html("Thank you for your submission. An email will be sent to " + emailInput);
  }
    $('.instructions').hide();
    $('.submission').show();
    _.delay(revertDisplay, 3500);

  });

  $('.arena').on('click', '.box', function(event){
    disableClicks();
    $(this).addClass("animated shake");
    // $(this).closest('.arena').removeClass('active');
    var firstCard = cards[0];
    var secondCard = cards[1];
    var thirdCard = cards[2];
    // console.log(firstCard);


    if (firstCard == "panda"){
      panda = panda + 1;
    } else if (firstCard == "poo"){
      fail = fail + 1;
    } else {
      miss = miss + 1;
    }

    // to target other id.children() - appending remaining images
    var clickedBox = $(this).attr('id');
    // console.log(clickedBox)
    imageSource = returnImage(firstCard);
    $('#' + clickedBox).children().attr('src',imageSource);

    if (clickedBox == "1"){
      imageSource2 = returnImage(secondCard);
      $('#2').children().attr('src',imageSource2);
      imageSource3 = returnImage(thirdCard);
      $('#3').children().attr('src',imageSource3);
    } else if (clickedBox == "2"){
      imageSource2 = returnImage(secondCard);
      $('#3').children().attr('src',imageSource2);
      imageSource3 = returnImage(thirdCard);
      $('#1').children().attr('src',imageSource3);
    } else if (clickedBox == "3") {
      imageSource2 = returnImage(secondCard);
      $('#2').children().attr('src',imageSource2);
      imageSource3 = returnImage(thirdCard);
      $('#1').children().attr('src',imageSource3);
    } else {

    }
    _.delay(appendThree, 1000, "box.png"); // async

    shuffle();
    displayScore();
  });


  var countDown = function(sec) {

    timer = setInterval(function() {
     $('#display-timer').text(sec-- + " seconds to Lock Down");
     if (sec === 0) {
       clearInterval(timer);
       $('#display-timer').text("Game Over");
       gameFinished = true;
     }
    }, 1000);
  }

  countDown(15);

  $('#restartBtn').on('click', function(){
    location.reload();
  });



});
