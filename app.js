$( document ).ready(function() {
  console.log("Where's The Panda?");
  var cards = ['panda','poo','miss'];
  var panda = 0;
  var fail = 0;
  var miss = 0;



  var displayScore = function(){
    console.log("panda score: ",panda);
    console.log("poo score: ",fail);
    console.log("miss score: ",miss);
    $( "#panda-score").text(panda);
    $( "#poo-score" ).text(fail);
  }
  displayScore();

  var shuffle = function(){
    cards = _.shuffle(cards);
    // console.log(cards);
  }

  var reset = function(){
    $('#1').children().attr('src',"box.png");
    $('#2').children().attr('src',"box.png");
    $('#3').children().attr('src',"box.png");
    console.log("RESET");
    shuffle();
  }

  //wrte a shuffle function (DRY)
  $('#shuffleBtn').on('click', function(){
    shuffle();
  });

  $('#resetBtn').on('click', function(){
    reset();
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
  $('.box').on('click', function(event){

    var firstCard = cards[0];
    var secondCard = cards[1];
    var thirdCard = cards[2];
    console.log(firstCard);
    imageSource = returnImage(firstCard);
    $(event.target).attr('src',imageSource);
      if (firstCard == "panda"){
        panda = panda + 1;
      } else if (firstCard == "poo"){
        fail = fail + 1;
      } else {
        miss = miss + 1;
      }

    // to target other id.children() - appending remaining images
    var clickedBox = $(this).attr('id');
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

    shuffle();
    displayScore();
  });

});
