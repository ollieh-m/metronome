console.log('hello world!')

var context = new (window.AudioContext || window.webkitAudioContext)();
var oscillator;

var initializeOscillator = function(){
  oscillator = context.createOscillator();
  window.oscillator = oscillator

  oscillator.type = 'sine';
  oscillator.frequency.value = 440;
  oscillator.connect(context.destination);
}


$(document).on('click', '#toggle', function(event){
  console.log($(this).data())
  if ($(this).data().active) {
    $(this).text("Start")
    $(this).data('active', false);
    oscillator.stop()
  } else {
    initializeOscillator();
    $(this).text("Stop");
    $(this).data('active', true)
    oscillator.start();
  }
})
