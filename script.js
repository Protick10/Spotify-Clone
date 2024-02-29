console.log('javascript started!');


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
            songs.push(element.href);
        }
    }

    // console.log(songs);
    return songs;

}


async function main(){

    // list of all the songs
    let songs = await fetchSongs();
    console.log(songs);
 
    // Play the first song

    var audio = new Audio(songs[0]);
    // audio.play();

    audio.addEventListener("loadeddata", () => {
        let duration = audio.duration;
        console.log(duration);
        // The duration variable now holds the duration (in seconds) of the audio clip
      }); 
}

main();
