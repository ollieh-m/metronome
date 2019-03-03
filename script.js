let interval;

const startCycle = (section) => {
  const counter = $(section.element).find('input[type=number]').next()

  return new Promise(resolve => {
    const tempo = section.tempo;
    let beeps = section.bars*4;
    const ms = 60000 / tempo;

    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    const context = new window.AudioContext();

    interval = setInterval(() => {
      const oscillator = context.createOscillator();
      const currentTime = context.currentTime;

      oscillator.type = 'sine';
      oscillator.frequency.value = beeps % 4 ? 480 : 600;
      oscillator.connect(context.destination);

      oscillator.start(currentTime);
      oscillator.stop(currentTime + 0.1);

      beeps--;

      if (beeps % 4 === 0) {
        const barsLeft = parseInt(counter.text()) - 1
        counter.text(barsLeft)
      }

      if (beeps === 0) {
        counter.text(section.bars)
        clearInterval(interval);
        resolve();
      }
    }, ms);
  })
}

$(document).on('click', '#toggle', async function(event){
  if ($(this).data().active) {
    $(this).text("Start")
    $(this).data('active', false);
    $(".active").toggleClass("active")
    clearInterval(interval);
  } else {
    $(this).text("Stop");
    $(this).data('active', true)
    
    let data = [];

    $('.fieldset').each(function(index, item) {
      data = [
        ...data,
        {
          tempo: $(this).find('input[type=range]').val(),
          bars: $(this).find('input[type=number]').val(),
          element: item
        }
      ]
    });

    for (let section of data) {
      section.element.classList.add('active')
      await startCycle(section)
      section.element.classList.remove('active')
    }
    
    $('#toggle').text("Start")
    $('#toggle').data('active', false);
  }
})

$(document).on('click', '#add', function(event){
  const fieldset = $(".fieldset:first").clone();
  const index = $('.fieldset').length;

  fieldset.find('legend').text(`Section ${index+1}`)
  fieldset.find('input[type=range]').prop('name', `section[${index}]tempo`)
  fieldset.find('input[type=number]').prop('name', `section[${index}]bars`)

  fieldset.appendTo(".sections");
})

$(document).on('click', '#remove', function(event){
  $(".fieldset:last").remove();
})

$(document).on('change', 'input#tempo', function(event){
  $(this).next().text(event.target.value)
});

$(document).on('change', 'input#bars', function(event){
  $(this).next().text(event.target.value)
});