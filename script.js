console.log('javascript started!');

let currentsong = new Audio(); //to store the current song globally

//convert songtime to minutes and seconds format
function convertTimeFormat(input) {
    if (typeof input === 'number') {
        // If input is a number, treat it as seconds and convert it to mm:ss format
        var minutes = Math.floor(input / 60);
        var seconds = Math.round(input % 60);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    } else if (typeof input === 'string') {
        // If input is a string, assume it's in the format mm:ss.mmm
        var parts = input.split(':');
        var minutes = parseInt(parts[0]);
        var seconds = parseFloat(parts[1]);

        // Round seconds to nearest integer
        seconds = Math.round(seconds);

        // Formatting minutes and seconds
        var formattedMinutes = String(minutes).padStart(2, '0');
        var formattedSeconds = String(seconds).padStart(2, '0');

        return formattedMinutes + ':' + formattedSeconds;
    } else {
        return 'Invalid input';
    }
}

async function fetchSongs() {
    let a = await fetch("http://127.0.0.1:5500/songs/");
    let response = await a.text();
    // console.log(response);

    let div = document.createElement('div');
    div.innerHTML = response;
    // let lis = div.getElementsByTagName('li');
    // console.log(lis);


    let as = div.getElementsByTagName('a');
    // console.log(as);

    //to get all the songs from the page and store them in an array

    let songs = [];

    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if(element.href.endsWith('.mp3')) {
            // songs.push(element.href);
            songs.push(element.href.split("/songs/")[1]); //will push whatever after /songs/ in the url

        }
    }

    // console.log(songs);
    return songs;

}

//playMusic function toi play the music

const playMusic = (track, pause=false) => {
    // let audio = new Audio("songs/" + track);
    currentsong.src = "songs/" + track;
    if(!pause){
        currentsong.play();

        play.src= "pause.svg";  //change the play button to pause button
    }
   

    //to display the song name and artist name in the player

    document.querySelector(".songname").innerHTML =track.replaceAll("%20", " ").split("-")[0]  ;
    document.querySelector(".artistname").innerHTML = track.split("-")[1].replaceAll("%20", " ").split(".")[0];
    document.querySelector(".songtime").innerHTML ="00:00 / 00:00";
}


async function main(){

    // let currentsong;

    // list of all the songs
    let songs = await fetchSongs();
    // console.log(songs);
    playMusic(songs[0], true); //play the first song in the list


    // Add the songs to the list
    let songul = document.querySelector('.songlist').getElementsByTagName('ul')[0];   
    for (const song of songs) {

        // songul.innerHTML = songul.innerHTML + song;
        songul.innerHTML += `<li>
       
        <img class="invert" src="music.svg" alt="">
        <div class="info">
            <div>${song.replaceAll("%20", " ").split("-")[0]}</div>
            <div class="artname">${song.split("-")[1].replaceAll("%20", " ").split(".")[0]}</div>
        </div>
        <img src="play.svg" alt="" class="playimg invert">
        
        </li>`;
        
    }


    //attach an event listener to each song

    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener("click", ()=>{
        // console.log(e.querySelector(".info").firstElementChild.innerHTML);
        console.log(e.querySelector(".info").firstElementChild.innerHTML + "-" + e.querySelector(".info").lastElementChild.innerHTML+ ".mp3");
        // console.log(e);
        
        // playMusic(e.querySelector(".info").firstElementChild.innerHTML);
         playMusic(e.querySelector(".info").firstElementChild.innerHTML + "-" + e.querySelector(".info").lastElementChild.innerHTML+ ".mp3");

        })  
    })

    //Attach an event listener to the play button, next button and previous button

    play.addEventListener("click", ()=>{
        if(currentsong.paused){
            currentsong.play();
            play.src= "pause.svg";
        }
        else{
            currentsong.pause();
            play.src= "play.svg";
        }
    })

    //Listen for timeupdate event on the audio element to update the time of the song

    currentsong.addEventListener("timeupdate", ()=>{
        // console.log(currentsong.currentTime, currentsong.duration);
        document.querySelector(".songtime").innerHTML = `${convertTimeFormat(currentsong.currentTime)} /
         ${convertTimeFormat(currentsong.duration)}`;

        //to update the progress bar

        let progress = currentsong.currentTime / currentsong.duration * 100;

        document.querySelector(".circle").style.left = progress + "%";
        if(currentsong.currentTime == currentsong.duration){
            // console.log("Song ended");
            play.src= "play.svg";
        }
    })

    //to change the song time when the progress bar is clicked

    document.querySelector(".seekbar").addEventListener("click", (e)=>{
        // console.log(e);
        let newtime = e.offsetX / e.target.offsetWidth * currentsong.duration; //hjere offsetX is the distance from the left of the element and offsetWidth is the width of the element
        currentsong.currentTime = newtime;
    })
 
    // Play the first song

    // var audio = new Audio(songs[0]);
    // audio.play();

    // audio.addEventListener("loadeddata", () => {
    //     let duration = audio.duration;
    //     console.log(duration);
    //     // The duration variable now holds the duration (in seconds) of the audio clip
    //   }); 

    //to show the left portion on the mobile view..hamberger menu click event

    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0px";
        document.querySelector(".left").style.zIndex = "200";
        // document.querySelector(".header").style.display = "none";
    });
}

main();
