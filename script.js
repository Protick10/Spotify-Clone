console.log('javascript started!');

let currentsong = new Audio(); //to store the current song globally

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

const playMusic = (track) => {
    // let audio = new Audio("songs/" + track);
    currentsong.src = "songs/" + track;
    currentsong.play();
    play.src= "pause.svg";  //change the play button to pause button

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
 
    // Play the first song

    // var audio = new Audio(songs[0]);
    // audio.play();

    // audio.addEventListener("loadeddata", () => {
    //     let duration = audio.duration;
    //     console.log(duration);
    //     // The duration variable now holds the duration (in seconds) of the audio clip
    //   }); 
}

main();
