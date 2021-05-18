const soundsElement = document.querySelector('#sounds2');
const stopButton = document.querySelector('#stopButton2');

(async () => {
  const sounds2 = await getSounds();
  addSoundsToPage(sounds2);
})()

async function getSounds() {
  const response = await fetch('./sounds2.json');
  const json = await response.json();
  return json;
}

function addSoundsToPage(sounds2) {

  const players = []

  sounds2.forEach(sound2 => {
    const soundDiv = document.createElement('div');
    soundDiv.className = 'sound2';

    const soundTitle = document.createElement('h2');
    soundTitle.textContent = sound2.title;

    soundDiv.appendChild(soundTitle);

    const player = document.createElement('audio');
    player.setAttribute('src', `sounds2/${sound2.src}`)
    soundDiv.appendChild(player);
    players.push({ player, soundDiv });

    soundDiv.addEventListener('mousedown', () => {
      soundDiv.style.background = "#B22222"
      player.currentTime = 0;
      player.play();
    });


    soundDiv.addEventListener('mouseup', () => {
      soundDiv.style.background = ""
    });

    soundsElement.appendChild(soundDiv);
  });

  function playYoda(){
    var music = new Audio('./sounds2/yoda.mp3');
    music.play();
  }

  document.querySelector('#stopButton2').addEventListener('click', stopAll);

  document.querySelector('#yoda').addEventListener('click', playYoda);

  const keyCodes = {
    65: 0, 
    83: 1, 
    68: 2, 
    70 :3, 
    71 :4, 
    72: 5, 
    74: 6, 
    76: 7, 
    186: 8, 
    222: 9, 
    90: 10,
    75: 11
  }

  document.addEventListener('keydown', (event) => {
    const playerIndex = keyCodes[event.keyCode];
    const playerAndDiv = players[playerIndex];
    if (playerAndDiv) {
      playerAndDiv.soundDiv.style.background = "#B22222"
      playerAndDiv.player.currentTime = 0;
      playerAndDiv.player.play();
    }

  });

  document.addEventListener('keyup', (event) => {
    const playerIndex = keyCodes[event.keyCode];
    const playerAndDiv = players[playerIndex];
    if (playerAndDiv) {
      playerAndDiv.soundDiv.style.background = ""
    }

  });

  function stopAll() {
    players.forEach(({player}) => {
      player.pause();
    });
  }
}

