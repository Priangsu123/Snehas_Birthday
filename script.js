/* =========================================================
   NAVIGATION
   ========================================================= */

const navToggle =
    document.getElementById("navToggle");

const navMenu =
    document.getElementById("navMenu");


if (navToggle) {

    navToggle.addEventListener("click", function () {

        navMenu.classList.toggle("active");

    });

}


/* =========================================================
   SECOND PAGE ELEMENTS
   ========================================================= */

const mainWebsite =
    document.getElementById("mainWebsite");

const celebrateBtn =
    document.getElementById("celebrateBtn");

const specialMessagePage =
    document.getElementById("specialMessagePage");

const messageBalloons =
    document.getElementById("messageBalloons");

const celebrationAudio =
    document.getElementById("celebrationAudio");

const backToWebsite =
    document.getElementById("backToWebsite");


/* =========================================================
   START CELEBRATION
   ========================================================= */

celebrateBtn.addEventListener("click", function () {

    /*
       IMPORTANT:

       We do NOT navigate to another HTML file.

       Instead, we immediately hide the complete
       first page and show the Special Message page.

       This makes the second page feel like a completely
       different page while keeping the user's click
       connected to the audio.play() request.
    */


    /* Hide main website */

    mainWebsite.style.display = "none";


    /* Show special message page */

    specialMessagePage.classList.add("active");


    /* Prevent background scrolling */

    document.body.style.overflow = "hidden";


    /* Create balloons */

    createMessageBalloons();


    /* =====================================================
       START "THIS IS CALLED LOVE"
       ===================================================== */

    celebrationAudio.pause();

    celebrationAudio.currentTime = 0;

    celebrationAudio.volume = 0.7;


    /*
       Because this play() is executed directly from
       the button click, the browser is much more likely
       to allow the music to start automatically.
    */

    const playRequest =
        celebrationAudio.play();


    if (playRequest !== undefined) {

        playRequest.catch(function (error) {

            console.log(
                "Audio autoplay was blocked by browser:",
                error
            );

        });

    }

});


/* =========================================================
   CREATE LOTS OF BALLOONS
   ========================================================= */

function createMessageBalloons() {

    messageBalloons.innerHTML = "";


    const balloonCount = 35;


    for (let i = 0; i < balloonCount; i++) {

        const balloon =
            document.createElement("div");


        balloon.classList.add(
            "message-balloon"
        );


        balloon.textContent = "🎈";


        /* Random horizontal starting position */

        balloon.style.left =
            Math.random() * 100 + "%";


        /* Random horizontal spreading */

        const x =
            (Math.random() - 0.5) * 700;


        balloon.style.setProperty(
            "--x",
            x + "px"
        );


        /* Random rotation */

        const rotate =
            (Math.random() - 0.5) * 90;


        balloon.style.setProperty(
            "--rotate",
            rotate + "deg"
        );


        /* Random animation duration */

        const duration =
            5 + Math.random() * 5;


        balloon.style.setProperty(
            "--duration",
            duration + "s"
        );


        /* Stagger balloons */

        const delay =
            i * 0.12;


        balloon.style.setProperty(
            "--delay",
            delay + "s"
        );


        messageBalloons.appendChild(
            balloon
        );

    }

}


/* =========================================================
   BACK TO MAIN WEBSITE
   ========================================================= */

backToWebsite.addEventListener("click", function () {

    /* Stop the special song */

    celebrationAudio.pause();

    celebrationAudio.currentTime = 0;


    /* Remove balloons */

    messageBalloons.innerHTML = "";


    /* Hide second page */

    specialMessagePage.classList.remove("active");


    /* Show main website */

    mainWebsite.style.display = "";


    /* Enable scrolling */

    document.body.style.overflow = "";

});


/* =========================================================
   GALLERY GRID / SLIDESHOW
   ========================================================= */

const gridViewBtn =
    document.getElementById("gridViewBtn");

const slideshowViewBtn =
    document.getElementById("slideshowViewBtn");

const galleryGrid =
    document.getElementById("galleryGrid");

const gallerySlideshow =
    document.getElementById("gallerySlideshow");


gridViewBtn.addEventListener("click", function () {

    galleryGrid.style.display = "grid";

    gallerySlideshow.style.display = "none";

});


slideshowViewBtn.addEventListener("click", function () {

    galleryGrid.style.display = "none";

    gallerySlideshow.style.display = "block";

});


/* =========================================================
   SLIDESHOW
   ========================================================= */

const slides =
    document.querySelectorAll(".slide");

const indicators =
    document.querySelectorAll(".indicator");

const prevSlideBtn =
    document.getElementById("prevSlideBtn");

const nextSlideBtn =
    document.getElementById("nextSlideBtn");


let currentSlide = 0;


function showSlide(index) {

    if (index < 0) {

        index = slides.length - 1;

    }


    if (index >= slides.length) {

        index = 0;

    }


    slides.forEach(function (slide) {

        slide.classList.remove("active");

    });


    indicators.forEach(function (indicator) {

        indicator.classList.remove("active");

    });


    slides[index].classList.add("active");

    indicators[index].classList.add("active");


    currentSlide = index;

}


prevSlideBtn.addEventListener(
    "click",
    function () {

        showSlide(currentSlide - 1);

    }
);


nextSlideBtn.addEventListener(
    "click",
    function () {

        showSlide(currentSlide + 1);

    }
);


indicators.forEach(function (indicator) {

    indicator.addEventListener(
        "click",
        function () {

            const index =
                Number(
                    indicator.dataset.slide
                );

            showSlide(index);

        }
    );

});


/* =========================================================
   MUSIC PLAYER
   ========================================================= */

const audioPlayer =
    document.getElementById("audioPlayer");

const playPauseBtn =
    document.getElementById("playPauseBtn");

const prevTrackBtn =
    document.getElementById("prevTrackBtn");

const nextTrackBtn =
    document.getElementById("nextTrackBtn");

const volumeSlider =
    document.getElementById("volumeSlider");

const progressBar =
    document.getElementById("progressBar");

const progress =
    document.getElementById("progress");

const currentTimeDisplay =
    document.getElementById("currentTime");

const durationDisplay =
    document.getElementById("duration");

const trackTitle =
    document.getElementById("trackTitle");

const vinylRecord =
    document.getElementById("vinylRecord");

const playlistItems =
    document.querySelectorAll(".playlist-item");


/*
   Your songs
*/

const tracks = [

    {
        title: "This is called love",
        artist: "Birthday Collection",
        src: "audio/25.mp3"
    },

    {
        title: "Hum Durd",
        artist: "Bubu's Favourite Songs",
        src: "audio/Hum_Durd.mpeg"
    },

    {
        title: "Gilheriyan",
        artist: "Bubu's Favourite Songs",
        src: "audio/gilheriyan.mpeg"
    },

    {
        title: "Apna Bana Le Piya",
        artist: "Bubu's Favourite Songs",
        src: "audio/ApnaBanale.mpeg"
    }

];


let currentTrack = 0;


/* Load track */

function loadTrack(index) {

    currentTrack = index;

    audioPlayer.src =
        tracks[index].src;

    trackTitle.textContent =
        tracks[index].title;


    playlistItems.forEach(
        function (item) {

            item.classList.remove(
                "active"
            );

        }
    );


    if (playlistItems[index]) {

        playlistItems[index]
            .classList.add("active");

    }


    audioPlayer.load();

}


/* Play */

function playTrack() {

    audioPlayer.play();

    playPauseBtn.textContent = "⏸️";

    vinylRecord.classList.add(
        "playing"
    );

}


/* Pause */

function pauseTrack() {

    audioPlayer.pause();

    playPauseBtn.textContent = "▶️";

    vinylRecord.classList.remove(
        "playing"
    );

}


/* Play / Pause */

playPauseBtn.addEventListener(
    "click",
    function () {

        if (audioPlayer.paused) {

            playTrack();

        } else {

            pauseTrack();

        }

    }
);


/* Next */

nextTrackBtn.addEventListener(
    "click",
    function () {

        let next =
            currentTrack + 1;


        if (next >= tracks.length) {

            next = 0;

        }


        loadTrack(next);

        playTrack();

    }
);


/* Previous */

prevTrackBtn.addEventListener(
    "click",
    function () {

        let previous =
            currentTrack - 1;


        if (previous < 0) {

            previous =
                tracks.length - 1;

        }


        loadTrack(previous);

        playTrack();

    }
);


/* Playlist */

playlistItems.forEach(
    function (item) {

        item.addEventListener(
            "click",
            function () {

                const index =
                    Number(
                        item.dataset.track
                    );

                loadTrack(index);

                playTrack();

            }
        );

    }
);


/* Volume */

volumeSlider.addEventListener(
    "input",
    function () {

        audioPlayer.volume =
            volumeSlider.value / 100;

    }
);


/* Progress */

audioPlayer.addEventListener(
    "timeupdate",
    function () {

        if (!audioPlayer.duration) {
            return;
        }


        const percentage =
            (
                audioPlayer.currentTime /
                audioPlayer.duration
            ) * 100;


        progress.style.width =
            percentage + "%";


        currentTimeDisplay.textContent =
            formatTime(
                audioPlayer.currentTime
            );

    }
);


/* Duration */

audioPlayer.addEventListener(
    "loadedmetadata",
    function () {

        durationDisplay.textContent =
            formatTime(
                audioPlayer.duration
            );

    }
);


/* Progress click */

progressBar.addEventListener(
    "click",
    function (event) {

        if (!audioPlayer.duration) {
            return;
        }


        const width =
            progressBar.clientWidth;


        const clickX =
            event.offsetX;


        audioPlayer.currentTime =
            (
                clickX / width
            ) *
            audioPlayer.duration;

    }
);


/* Automatic next song */

audioPlayer.addEventListener(
    "ended",
    function () {

        let next =
            currentTrack + 1;


        if (next >= tracks.length) {

            next = 0;

        }


        loadTrack(next);

        playTrack();

    }
);


/* Time formatting */

function formatTime(seconds) {

    if (isNaN(seconds)) {
        return "0:00";
    }


    const minutes =
        Math.floor(seconds / 60);


    const remainingSeconds =
        Math.floor(seconds % 60);


    return (
        minutes +
        ":" +
        String(
            remainingSeconds
        ).padStart(2, "0")
    );

}


/* Initial track */

loadTrack(0);


/* =========================================================
   COUNTDOWN
   ========================================================= */

const birthdayDate =
    document.getElementById(
        "birthdayDate"
    );

const days =
    document.getElementById("days");

const hours =
    document.getElementById("hours");

const minutes =
    document.getElementById("minutes");

const seconds =
    document.getElementById("seconds");

const countdownMessage =
    document.getElementById(
        "countdownMessage"
    );


birthdayDate.addEventListener(
    "change",
    updateCountdown
);


function updateCountdown() {

    const target =
        new Date(
            birthdayDate.value
        ).getTime();


    if (isNaN(target)) {
        return;
    }


    const interval =
        setInterval(function () {

            const now =
                new Date().getTime();


            const difference =
                target - now;


            if (difference <= 0) {

                clearInterval(interval);


                days.textContent = "00";
                hours.textContent = "00";
                minutes.textContent = "00";
                seconds.textContent = "00";


                countdownMessage.innerHTML =
                    "<p>🎉 Happy Birthday Bubu! 🎂❤️</p>";

                return;

            }


            const d =
                Math.floor(
                    difference /
                    (1000 * 60 * 60 * 24)
                );


            const h =
                Math.floor(
                    (
                        difference %
                        (1000 * 60 * 60 * 24)
                    ) /
                    (1000 * 60 * 60)
                );


            const m =
                Math.floor(
                    (
                        difference %
                        (1000 * 60 * 60)
                    ) /
                    (1000 * 60)
                );


            const s =
                Math.floor(
                    (
                        difference %
                        (1000 * 60)
                    ) /
                    1000
                );


            days.textContent =
                String(d).padStart(2, "0");


            hours.textContent =
                String(h).padStart(2, "0");


            minutes.textContent =
                String(m).padStart(2, "0");


            seconds.textContent =
                String(s).padStart(2, "0");


        }, 1000);

}


/* =========================================================
   SIMPLE PUZZLE PLACEHOLDER
   ========================================================= */

const newGameBtn =
    document.getElementById(
        "newGameBtn"
    );

const playAgainBtn =
    document.getElementById(
        "playAgainBtn"
    );


if (newGameBtn) {

    newGameBtn.addEventListener(
        "click",
        function () {

            alert(
                "🎂 New Birthday Puzzle Started!"
            );

        }
    );

}


if (playAgainBtn) {

    playAgainBtn.addEventListener(
        "click",
        function () {

            alert(
                "🎉 Let's play again, Bubu!"
            );

        }
    );

}
