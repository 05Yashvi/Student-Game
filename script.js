
function playSound(sound) {
  sound.currentTime = 0;
  sound.play().catch(error => {
    console.log("Sound blocked:", error);
  });
}
const bgMusic = new Audio("assets/sounds/bg.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.3; // keep low (important)

const clickSound = new Audio("assets/sounds/click.mp3");
const selectSound = new Audio("assets/sounds/select.mp3");
const winSound = new Audio("assets/sounds/win.mp3");

clickSound.volume = 1;
selectSound.volume = 1;
winSound.volume = 1;
bgMusic.volume = 0.2;

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("musicBtn");
  btn.classList.add("music-on"); // default ON look
});


let hintTimer;
function startHintTimer(answer) {
  clearInterval(hintTimer);

  let timeLeft = 40;
  const hintDisplay = document.getElementById("hintTimerBox");

  hintDisplay.innerText = "Hint in: " + timeLeft;

  let countdown = setInterval(() => {
    timeLeft--;
    hintDisplay.innerText = "Hint in: " + timeLeft;

    if (timeLeft <= 0) {
      clearInterval(countdown);
      showHint(answer);
    }
  }, 1000);

  hintTimer = countdown; // important change
}


function showHint(answer) {
  const firstLetter = answer.charAt(0);
  document.getElementById("hintBox").innerHTML =
    `Hint: Starts with <b>${firstLetter}</b>`;
}
// 🎉 Light confetti (Level 1)
function lightConfetti() {
  confetti({
    particleCount: 60,
    spread: 70,
    origin: { y: 0.6 }
  });
}

// 🎊 Heavy confetti (Final win)
function heavyConfetti() {
  let duration = 2000;
  let end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 }
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 }
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}
let isSelecting = false;

let time1 = 30;
let time2 = 20;
let gridSize = 15;
let timer1;
let timer2;
const students = {
  "AAHAN2": "Aahan2.png",
  "AAHAN": "Aahan.png",
  "AARAVUSMANI": "Aarav Usmani.png",
  "AARNA": "Aarna.png",
  "AARVIRAWAT": "Aarvi Rawat.png",
  "AAYUSH": "Aayush.png",
  "AKSHITA": "Akshita.png",
  "ANABIYA": "Anabiya.png",
  "ANAYA": "Anaya.png",
  "ANUJ": "Anuj.png",
  "ARYANSH": "Aryansh.png",
  "ARYARATHORE": "AryaRathore.png",
  "ASHIFA": "Ashifa.png",
  "AYANSH": "Ayansh.png",
  "BARIRA": "Barira.png",
  "BHANUPRATAP": "Bhanu pratap.png",
  "BHOOMI": "Bhoomi.png",
  "BILAL": "Bilal.png",
  "DEV": "Dev.png",
  "DHRUV": "Dhruv.png",
  "DIVYANSH": "Divyansh.png",
  "HAMZA2": "Hamza2.png",
  "HAMZA": "Hamza.png",
  "HARSHIT": "Harshit.png",
  "ISHIKA": "Ishika.png",
  "JIVISHA": "jivisha.png",
  "KANIKA": "Kanika.png",
  "KIYANSH": "Kiyansh.png",
  "LAKSHITA": "lakshita.png",
  "LALIT": "Lalit.png",
  "MANAS": "Manas.png",
  "MANU": "Manu.png",
  "MRIGANK": "Mrigank.png",
  "NAMRATA": "Namrata.png",
  "NARENDRA": "Narendra.png",
  "NAVYA": "Navya.png",
  "NOOR": "Noor.png",
  "NOORAIN": "Noorain.png",
  "PIYUSH": "Piyush.png",
  "RASMI": "Rasmi.png",
  "RIYANSHI": "Riyanshi.png",
  "RUCHI": "Ruchi.png",
  "RUDRA": "Rudra.png",
  "RUPAL": "Rupal.png",
  "SHIVAKSHI": "Shivakshi.png",
  "SHIVANSH": "Shivansh.png",
  "SHIVANSHI": "Shivanshi.png",
  "SHIVAY": "Shivay.png",
  "SRISHTI": "Srishti.png",
  "TRISHA": "Trisha.png",
  "UMAIR": "Umair.png",
  "UMAR": "Umar.png",
  "UNNATI": "Unnati.png",
  "UZAIF": "Uzaif.png",
  "VANIYA": "Vaniya.png",
  "YAMINI": "Yamini.png",
  "ZAINAV": "zainav.png",
  "ZARA": "Zara.png",
  "ZOHIB": "Zohib.png"
};

let child = null;
function startGame() {
  document.getElementById("hintBox").innerHTML = "";
  clickSound.currentTime = 0;
  playSound(clickSound);
  let inputName = document.getElementById("childName").value.toUpperCase();

  if (!students[inputName]) {
    alert("Child not found!");
    return;
  }

  child = {
    name: inputName,
    eyes: "assets/eyes/" + students[inputName]
  };
  document.getElementById("submitBtn").disabled = false;
  document.getElementById("grid").innerHTML = "";
  selected = [];
  generateGrid();

  // Reset timer
clearInterval(timer1);

time1 = 30;
document.getElementById("timer1").innerText = time1;

// Start timer again
timer1 = setInterval(() => {
  time1--;
  document.getElementById("timer1").innerText = time1;

  if (time1 <= 0) {
    clearInterval(hintTimer);
    clearInterval(timer1);
    alert("Time's up!");
  }
}, 1000);
}
let selected = [];
function selectCell(div) {
  if (div.classList.contains("selected")) {
    div.classList.remove("selected");

    let index = selected.indexOf(div);
    if (index > -1) {
      selected.splice(index, 1);
    }

  } else {
    div.classList.add("selected");

    selectSound.currentTime = 0;
    selectSound.play();

    selected.push(div);
  }
}

let startTime;
let totalTime = 0;

// 🧠 Load Leaderboard
let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

function updateLeaderboard() {
  let list = document.getElementById("leaderboard");
  list.innerHTML = "";

  leaderboard.sort((a, b) => a.time - b.time);

  leaderboard.forEach((entry, index) => {
  let li = document.createElement("li");
  li.innerText = `${index + 1}. ${entry.name} - ${entry.time}s`;
  list.appendChild(li);
});
}

updateLeaderboard();

// 🔤 Generate Grid
function generateGrid() {
  startHintTimer(child.name);
  const grid = document.getElementById("grid");
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (let i = 0; i < gridSize * gridSize; i++) {
    let div = document.createElement("div");
    div.className = "cell";
    div.innerText = letters[Math.floor(Math.random() * 26)];

div.onmousedown = () => {
  isSelecting = true;
  selectCell(div);
};

div.onmouseover = () => {
  if (isSelecting) {
    selectCell(div);
  }
};

div.onmouseup = () => {
  isSelecting = false;
};

    grid.appendChild(div);
  }



let row = Math.floor(Math.random() * gridSize);
let col = Math.floor(Math.random() * (gridSize - child.name.length));

for (let i = 0; i < child.name.length; i++) {
  let index = row * gridSize + col + i;
  grid.children[index].innerText = child.name[i];
}
}




// ✅ Check Name
function checkName() {
   playSound(clickSound);
  if (!child || !child.name) {
    alert("⚠️ Please click Start Game first!");
    return;
  }
 
  let guess = selected.map(cell => cell.innerText).join("");
  clearInterval(hintTimer);
  if (guess === child.name) {
    
    totalTime += (30 - time1);
    lightConfetti();
    startLevel2();
  } else {
    alert("Try again!");
  }
}

// 👁️ Level 2
function startLevel2() {
  document.getElementById("level1").style.display = "none";
  document.getElementById("level2").style.display = "block";

  loadEyes();

  time2 = 20;
  document.getElementById("timer2").innerText = time2;

  clearInterval(timer2);

  timer2 = setInterval(() => {
  time2--;

  // 🛑 STOP if game already ended
  if (document.getElementById("level2").style.display === "none") {
    clearInterval(timer2);
    return;
  }

  document.getElementById("timer2").innerText = time2;

  if (time2 <= 0) {
    clearInterval(timer2);
    alert("Time's up!");
  }
}, 1000);

  window.time2 = time2;
}

// 👀 Load Eyes
function loadEyes() {
  const eyesDiv = document.getElementById("eyes");
  eyesDiv.innerHTML = "";

  let allImages = Object.values(students);

  // Remove correct one
  let others = allImages.filter(img => img !== students[child.name]);

  // Pick 4 random wrong ones
  others.sort(() => 0.5 - Math.random());
  let selectedWrong = others.slice(0, 4);

  let options = [
    students[child.name],
    ...selectedWrong
  ];

  options = options.map(img => "assets/eyes/" + img);

  options.sort(() => Math.random() - 0.5);

  options.forEach(src => {
    let img = document.createElement("img");
    img.src = src;

    img.onclick = () => {
  if (src === child.eyes) {
    showResult(true);
  } else {
    alert("❌ Wrong choice! Try again");

    // Reset level 2
    document.getElementById("eyes").innerHTML = "";
    startLevel2();
  }
};

    eyesDiv.appendChild(img);
  });
}


// 🏆 Result + Save Score
function showResult(win) {
  clearInterval(timer2);
  document.getElementById("level2").style.display = "none";

  let result = document.getElementById("result");
  result.style.display = "block";

  if (win) {
    winSound.play();
    heavyConfetti();
    result.innerHTML = `
  <h2>🎉 You Win!</h2>
  <p>Total Time: ${totalTime}s</p>

  <button onclick="restartGame()">🔄 Play Again</button>
`;

    let parent = document.getElementById("parentName").value || "Guest";

leaderboard.push({
  name: parent + " (" + child.name + ")",
  time: totalTime
});
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

    updateLeaderboard();
  } else {
    result.innerHTML = `<h2>😄 Try Again!</h2>`;
  }
}
function restartGame() {
  clickSound.currentTime = 0;
  playSound(clickSound);
  // 🛑 STOP all timers
  clearInterval(timer1);
  clearInterval(timer2);

  // Reset time values
  time1 = 30;
  time2 = 20;

  document.getElementById("timer1").innerText = time1;
  document.getElementById("timer2").innerText = time2;

  // Reset UI
  document.getElementById("level1").style.display = "block";
  document.getElementById("level2").style.display = "none";
  document.getElementById("result").style.display = "none";

  // Clear grid & eyes
  document.getElementById("grid").innerHTML = "";
  document.getElementById("eyes").innerHTML = "";

  // Reset values
  selected = [];
  totalTime = 0;
  child = null;

  // Reset inputs
  document.getElementById("childName").value = "";
}

document.onmouseup = () => {
  isSelecting = false;
};
function clearLeaderboard() {
  clickSound.currentTime = 0;
  playSound(clickSound);
  if (confirm("Are you sure you want to clear leaderboard?")) {
    leaderboard = [];
    localStorage.removeItem("leaderboard");
    updateLeaderboard();
  }
}
function toggleMusic() {
  const btn = document.getElementById("musicBtn");

  if (bgMusic.paused) {
    bgMusic.play();

    btn.innerText = "🔊";        // speaker with waves
    btn.classList.remove("music-off");
    btn.classList.add("music-on");

  } else {
    bgMusic.pause();

    btn.innerText = "🔇";        // speaker with slash
    btn.classList.remove("music-on");
    btn.classList.add("music-off");
  }
}
