let interval;

const startCycle = () => {
  const tempo = $('.tempo').val();
  const ms = 60000 / tempo;

  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  const context = new window.AudioContext();

  interval = setInterval(() => {
    const oscillator = context.createOscillator();
    const currentTime = context.currentTime;

    oscillator.type = 'sine';
    oscillator.frequency.value = 480;
    oscillator.connect(context.destination);

    oscillator.start(currentTime);
    oscillator.stop(currentTime + 0.1);

  }, ms);
}

$(document).on('click', '#toggle', function(event){
  if ($(this).data().active) {
    $(this).text("Start")
    $(this).data('active', false);
    clearInterval(interval);
  } else {
    $(this).text("Stop");
    $(this).data('active', true)
    startCycle();
  }
})
