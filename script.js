const songs = [
{
    title: "Song 1",
    artist: "Artist 1",
    src: "songs/song1.mp3",
    cover: "images/cover1.jpg"
},
{
    title: "Song 2",
    artist: "Artist 2",
    src: "songs/song2.mp3",
    cover: "images/cover2.jpg"
},
{
    title: "Song 3",
    artist: "Artist 3",
    src: "songs/song3.mp3",
    cover: "images/cover3.jpg"
}
];

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

const playlist = document.querySelectorAll("#playlist li");
const coverBox = document.querySelector(".cover");

let songIndex = 0;
let isPlaying = false;

// Load Song
function loadSong(index){

    audio.src = songs[index].src;
    title.innerText = songs[index].title;
    artist.innerText = songs[index].artist;
    cover.src = songs[index].cover;

    playlist.forEach(item => item.classList.remove("active"));
    playlist[index].classList.add("active");
}

loadSong(songIndex);

// Play Song
function playSong(){

    audio.play();

    isPlaying = true;

    playBtn.innerHTML =
    '<i class="fa-solid fa-pause"></i>';

    coverBox.classList.add("playing");

}

// Pause Song
function pauseSong(){

    audio.pause();

    isPlaying = false;

    playBtn.innerHTML =
    '<i class="fa-solid fa-play"></i>';

    coverBox.classList.remove("playing");

}

// Play Button
playBtn.addEventListener("click",()=>{

    if(isPlaying){
        pauseSong();
    }
    else{
        playSong();
    }

});

// Next Song
nextBtn.addEventListener("click",()=>{

    songIndex++;

    if(songIndex>=songs.length){
        songIndex=0;
    }

    loadSong(songIndex);
    playSong();

});

// Previous Song
prevBtn.addEventListener("click",()=>{

    songIndex--;

    if(songIndex<0){
        songIndex=songs.length-1;
    }

    loadSong(songIndex);
    playSong();

});

// Progress Bar
audio.addEventListener("timeupdate",()=>{

    const progressPercent =
    (audio.currentTime/audio.duration)*100;

    progress.value = progressPercent || 0;

    currentTime.innerText =
    formatTime(audio.currentTime);

    duration.innerText =
    formatTime(audio.duration);

});

// Seek Song
progress.addEventListener("input",()=>{

    audio.currentTime =
    (progress.value/100)*audio.duration;

});

// Volume
volume.addEventListener("input",()=>{

    audio.volume = volume.value;

});

// Auto Next Song
audio.addEventListener("ended",()=>{

    nextBtn.click();

});

// Playlist Click
playlist.forEach((item,index)=>{

    item.addEventListener("click",()=>{

        songIndex=index;

        loadSong(songIndex);

        playSong();

    });

});

// Format Time
function formatTime(time){

    if(isNaN(time))
    return "0:00";

    const min =
    Math.floor(time/60);

    const sec =
    Math.floor(time%60);

    return `${min}:${sec<10?"0":""}${sec}`;

}