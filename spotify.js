console.log("WELCOME TO SPOTIFY");

// Initializing variables
let songIndex = 0;
let masterplay = document.getElementById("masterplay");
let myprogressbar = document.getElementById("myprogressbar");
let gif = document.getElementById("gif");
let next = document.getElementById("next");
let previous = document.getElementById("previous");
let songitem = Array.from(document.getElementsByClassName("songItem"));
let playsong = Array.from(document.getElementsByClassName("play"));

let songs = [
    { songName: "Mazak (Anuv - Jaine)", filePath: "1.mp3", coverPath: "1.jpg" },
    { songName: "Barishein (Anuv - Jaine)", filePath: "2.mp3", coverPath: "2.jpg" },
    { songName: "Misri (Anuv - Jaine)", filePath: "3.mp3", coverPath: "3.jpg" },
    { songName: "Nadaniyaan", filePath: "4.mp3", coverPath: "4.jpg" },
    { songName: "Shikayat (AUR)", filePath: "5.mp3", coverPath: "5.jpg" },
    { songName: "Sun Zara (Anuv - Jaine)", filePath: "6.mp3", coverPath: "6.jpg" },
    { songName: "Chor", filePath: "7.mp3", coverPath: "7.jpg" },
    { songName: "Tou Hai Kaha (AUR)", filePath: "8.mp3", coverPath: "8.jpg" },
    { songName: "Maula (Anuv - Jaine)", filePath: "9.mp3", coverPath: "9.jpg" }
];

let audioElement = new Audio(songs[songIndex].filePath);

// Updating song list UI
songitem.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songname")[0].innerHTML = songs[i].songName;
});

// Handle click on a song item
songitem.forEach((element, i) => {
    element.addEventListener("click", () => {
        if (!audioElement.paused) {
            audioElement.pause();
        }
        audioElement = new Audio(songs[i].filePath);
        audioElement.play();
        songIndex = i;
        updateUI();
    });
});

// Handle Play/Pause button
masterplay.addEventListener("click", () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
    } else {
        audioElement.pause();
    }
    updateUI();
});

// Handle Next button
next.addEventListener("click", () => {
    songIndex = (songIndex + 1) % songs.length;
    playSongAtIndex(songIndex);
});

// Handle Previous button
previous.addEventListener("click", () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    playSongAtIndex(songIndex);
});

// Function to play a song at a given index
function playSongAtIndex(index) {
    audioElement.pause();
    audioElement = new Audio(songs[index].filePath);
    audioElement.play();
    updateUI();
}

// Function to update UI when song state changes
function updateUI() {
    if (!audioElement.paused) {
        masterplay.classList.remove("fa-play-circle");
        masterplay.classList.add("fa-pause-circle");
        if (gif) gif.style.opacity = 1;
    } else {
        masterplay.classList.remove("fa-pause-circle");
        masterplay.classList.add("fa-play-circle");
        if (gif) gif.style.opacity = 0;
    }

    playsong.forEach((btn, i) => {
        if (i === songIndex) {
            btn.classList.remove("fa-play-circle");
            btn.classList.add("fa-pause-circle");
        } else {
            btn.classList.remove("fa-pause-circle");
            btn.classList.add("fa-play-circle");
        }
    });
}

// Handle Seek Bar Update
audioElement.addEventListener("timeupdate", () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myprogressbar.value = progress;
});

// Seek bar change event
myprogressbar.addEventListener("change", () => {
    audioElement.currentTime = (myprogressbar.value * audioElement.duration) / 100;
});

