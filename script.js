let interval;

const startCycle = () => {

  const tempo = $('.tempo').val();
  let beeps = $('.bars').val()*4;
  const ms = 60000 / tempo;

  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  const context = new window.AudioContext();

  interval = setInterval(() => {
    if (beeps === 0) {
      $('#toggle').text("Start")
      $('#toggle').data('active', false);
      clearInterval(interval);
      return false;
    }

    const oscillator = context.createOscillator();
    const currentTime = context.currentTime;

    oscillator.type = 'sine';
    oscillator.frequency.value = beeps % 4 ? 480 : 600;
    oscillator.connect(context.destination);

    oscillator.start(currentTime);
    oscillator.stop(currentTime + 0.1);

    beeps--;
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

$(document).on('click', '#add', function(event){
  const fieldset = $(".fieldset:first").clone();
  const index = $('.fieldset').length;

  fieldset.find('input[type=range]').prop('name', `section[${index}]tempo`)
  fieldset.find('input[type=number]').prop('name', `section[${index}]bars`)

  fieldset.appendTo(".sections");
})

$(document).on('click', '#remove', function(event){
  $(".fieldset:last").remove();
})
