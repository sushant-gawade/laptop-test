function screenTest() {
  const colors = ['red', 'green', 'blue', 'black', 'white', 'gray'];
  let i = 0;
  const overlay = document.createElement('div');
  overlay.className = 'fullscreen-color';
  document.body.appendChild(overlay);

  const nextColor = () => {
    if (i >= colors.length) {
      document.body.removeChild(overlay);
      return;
    }
    overlay.style.backgroundColor = colors[i++];
    setTimeout(nextColor, 1000);
  };

  nextColor();
}

function keyboardTest() {
  const area = document.getElementById("test-area");
  area.innerHTML = "<h2>Press any key...</h2><div id='keys'></div>";
  const keysDiv = document.getElementById('keys');

  document.onkeydown = (e) => {
    const key = document.createElement('div');
    key.textContent = `Key Pressed: ${e.key}`;
    keysDiv.appendChild(key);
  };
}

function speakerTest() {
  const area = document.getElementById("test-area");
  area.innerHTML = "<h2>Speaker Test</h2><p>If you hear a sound, your speaker works.</p>";
  const audio = new Audio("beep.wav");
  audio.play();
}

function micTest() {
  const area = document.getElementById("test-area");
  area.innerHTML = "<h2>Microphone Test</h2><p>Allow microphone access. You should see a waveform or bar if it works.</p>";

  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      const audioCtx = new AudioContext();
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      source.connect(analyser);
      const data = new Uint8Array(analyser.frequencyBinCount);

      const canvas = document.createElement('canvas');
      canvas.width = 300;
      canvas.height = 100;
      area.appendChild(canvas);
      const ctx = canvas.getContext('2d');

      function draw() {
        analyser.getByteFrequencyData(data);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        data.forEach((v, i) => {
          ctx.fillStyle = 'green';
          ctx.fillRect(i * 2, canvas.height - v / 2, 1, v / 2);
        });
        requestAnimationFrame(draw);
      }

      draw();
    })
    .catch(() => {
      area.innerHTML = "<p>Microphone access denied or not working.</p>";
    });
}

function webcamTest() {
  const area = document.getElementById("test-area");
  area.innerHTML = "<h2>Webcam Test</h2>";
  const video = document.createElement("video");
  video.autoplay = true;
  video.width = 320;
  video.height = 240;
  area.appendChild(video);

  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      video.srcObject = stream;
    })
    .catch(() => {
      area.innerHTML = "<p>Camera access denied or not working.</p>";
    });
}

function mouseTest() {
  const area = document.getElementById("test-area");
  area.innerHTML = "<h2>Click anywhere inside this box</h2><div id='click-log'></div>";
  const log = document.getElementById("click-log");

  area.onclick = (e) => {
    const x = e.clientX;
    const y = e.clientY;
    log.innerHTML += `<p>Click at X:${x}, Y:${y}</p>`;
  };
}
