// const PORT = process.env.PORT

const soundsElement = document.querySelector('#sounds');

(async () => {
  const sounds = await getSounds();
  addSoundsToPage(sounds);
})()

async function getSounds() {
  const response = await fetch('./sounds.json');
  const json = await response.json();
  return json;
}

function addSoundsToPage(sounds) {
  sounds.forEach(sound => {
    const soundDiv = document.createElement('div');
    soundDiv.className = 'sound';
    const soundTitle = document.createElement('h2');
    soundTitle.textContent = sound.title;
    soundDiv.appendChild(soundTitle);

    const player = document.createElement('audio');
    player.setAttribute('src', `sounds/${sound.src}`)
    soundDiv.appendChild(player);

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
}

server.listen(PORT, function() {
  console.log("Server is running");
})