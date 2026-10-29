// welcome screen script
        const welcome_text = document.getElementById("welcome");
        const wall = document.getElementById("wall");

        welcome_text.addEventListener("animationend", function(event) {
            wall.classList.add("fade-out");
            event.stopPropagation();
        })

        wall.addEventListener("animationend", function(){
            wall.remove()
        })

// timing for welcome animations
        const titlecard = document.getElementById("titlecard")
        const container_mid = document.getElementById("subwrap");
        const sidebar_L = document.getElementById("sidewrap-left");
        const sidebar_R = document.getElementById("sidewrap-right");
        const musicButton = document.getElementById("musicButton");
        /*containers start 0% opacity, center container fades in, sidebars slide out*/
        document.addEventListener("DOMContentLoaded", function(){
            titlecard.style.display = "none"
            container_mid.style.display = "none";
            sidebar_L.style.display = "none";
            sidebar_R.style.display = "none";
            musicButton.style.display = "none";
        })
        /*listen for welcome animation to finish*/
        wall.addEventListener("animationend", function(){
            /*stop hiding center and start fadein animation*/
            titlecard.style.display = "";
            titlecard.classList.add("slide-down");
            container_mid.style.display = ""
            container_mid.classList.add("fadein");
            sidebar_L.style.display = "";
            sidebar_R.style.display = "";
            sidebar_L.classList.add("slide-left");
            sidebar_R.classList.add("slide-right");
        })
        //listen for container animations to finish
        titlecard.addEventListener("animationend", function(){
            musicButton.style.display = "";
            musicButton.classList.add("transFadeIn");
        })

// now playing last.fm script (not written by me i pulled it off last.fm + claude)
    const API_KEY = "026fbea870f63ad60c61fe0abc7dc23f" //yes i know this is an exposed API Key..... figuring it out
    const USER = "ninexiota"

    fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=${USER}&api_key=${API_KEY}&format=json&limit=1`)
        .then(response => response.json())
        .then(data => {
            const track = data.recenttracks.track[0];

            const imageUrl   = track.image[2]["#text"];
            const trackName  = track.name;
            const artistName = track.artist["#text"];

            document.getElementById("album-art").src         = imageUrl;
            document.getElementById("track-name").textContent  = trackName;
            document.getElementById("artist-name").textContent = artistName;
        })
        .catch(err => {
            console.log("last.fm fetch failed:", err);
            document.getElementById("track-name").textContent  = "unavailable";
            document.getElementById("artist-name").textContent = "";
        });

    fetch('https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=ninexiota&api_key=026fbea870f63ad60c61fe0abc7dc23f&format=json&period=7day&limit=5')
        .then(response => response.json())
        .then(data => {
            const tracks = data.toptracks.track;
            const container = document.getElementById("top-tracks");

        tracks.forEach((track, index) => {
            const entry = document.createElement("p");
            entry.style.margin = "20px 0";
            entry.textContent = `${index + 1}. ${track.name} - ${track.artist.name}`;
            container.appendChild(entry);
            });
         })
    .catch(err => console.log("top tracks fetch failed:", err));

// music
         const music = document.getElementById("music");

         document.getElementById("musicButton").addEventListener("click", function() {
            if (music.paused) {
                music.play();
            } else {
                music.pause();
            }
         })