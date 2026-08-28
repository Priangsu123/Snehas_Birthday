/* =========================================
   GLOBAL VARIABLES
========================================= */

let currentSlide = 0;

let currentTrack = 0;

let isPlaying = false;

let slideshowTimer;

let gameTimer;

let gameStartTime;

let moveCount = 0;

let currentDifficulty = "easy";

let puzzlePieces = [];

let countdownTimer;

let targetBirthday = null;

let draggedPiece = null;


/* =========================================
   AUDIO
========================================= */

const audioTracks = [

    {
        title: "Happy Birthday Song",
        artist: "Birthday Collection",
        src: "25.mp3"
    },

    {
        title: "Celebration Time",
        artist: "Party Hits",
        src: "Hum_Durd.mpeg"
    },

    {
        title: "Party Anthem",
        artist: "Birthday Beats",
        src: "gilheriyan.mpeg"
    },
    
    {
    title: "Song 25",
    artist: "This is Called love",
    src: "ApnaBanale.mpeg"
   }
];


/* =========================================
   YOUR PERSONAL PHOTOS
========================================= */

const puzzleImages = [

    "Bubu1.jpeg",
    "Bubu2.jpeg",
    "Bubu3.jpeg",
    "Bubu4.jpeg",
    "Bubu5.jpeg",
    "Bubu6.jpeg",
    "Bubu7.jpeg",
    "Bubu8.jpeg"

];


/* =========================================
   DOM READY
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    initializeNavigation();

    initializeGallery();

    initializeMusic();

    initializePuzzle();

    initializeCountdown();

    createConfetti();

    createParticles();

    initializeCelebrationButton();

    initializeKeyboard();

    initializeTouch();

});


/* =========================================
   NAVIGATION
========================================= */

function initializeNavigation() {

    const navToggle =
        document.getElementById("navToggle");

    const navMenu =
        document.getElementById("navMenu");

    const navLinks =
        document.querySelectorAll(".nav-link");


    navToggle.addEventListener("click", () => {

        navMenu.classList.toggle("active");

        navToggle.classList.toggle("active");

    });


    navLinks.forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

            const target =
                document.querySelector(
                    link.getAttribute("href")
                );

            if (target) {

                window.scrollTo({

                    top: target.offsetTop - 70,

                    behavior: "smooth"

                });

            }

            navMenu.classList.remove("active");

            navToggle.classList.remove("active");

        });

    });


    window.addEventListener("scroll", () => {

        const navbar =
            document.getElementById("navbar");

        if (window.scrollY > 100) {

            navbar.style.background =
                "rgba(255,255,255,0.98)";

        } else {

            navbar.style.background =
                "rgba(255,255,255,0.95)";

        }

    });

}


/* =========================================
   GALLERY
========================================= */

function initializeGallery() {

    const gridButton =
        document.getElementById("gridViewBtn");

    const slideshowButton =
        document.getElementById("slideshowViewBtn");


    gridButton.addEventListener("click", () => {

        showGallery("grid");

    });


    slideshowButton.addEventListener("click", () => {

        showGallery("slideshow");

    });


    document
        .getElementById("prevSlideBtn")
        .addEventListener("click", () => {

            changeSlide(-1);

        });


    document
        .getElementById("nextSlideBtn")
        .addEventListener("click", () => {

            changeSlide(1);

        });


    document
        .querySelectorAll(".indicator")
        .forEach(indicator => {

            indicator.addEventListener("click", () => {

                const index =
                    Number(indicator.dataset.slide);

                goToSlide(index);

            });

        });


    showGallery("grid");

}


/* =========================================
   SHOW GRID / SLIDESHOW
========================================= */

function showGallery(type) {

    const grid =
        document.getElementById("galleryGrid");

    const slideshow =
        document.getElementById("gallerySlideshow");


    clearInterval(slideshowTimer);


    if (type === "grid") {

        grid.style.display = "grid";

        slideshow.style.display = "none";

    } else {

        grid.style.display = "none";

        slideshow.style.display = "block";

        goToSlide(currentSlide);

        startSlideshow();

    }

}


/* =========================================
   SLIDESHOW
========================================= */

function changeSlide(direction) {

    const slides =
        document.querySelectorAll(".slide");


    if (!slides.length) return;


    currentSlide += direction;


    if (currentSlide >= slides.length) {

        currentSlide = 0;

    }


    if (currentSlide < 0) {

        currentSlide = slides.length - 1;

    }


    goToSlide(currentSlide);

}


function goToSlide(index) {

    const slides =
        document.querySelectorAll(".slide");

    const indicators =
        document.querySelectorAll(".indicator");


    if (!slides.length) return;


    slides.forEach(slide => {

        slide.classList.remove("active");

    });


    indicators.forEach(indicator => {

        indicator.classList.remove("active");

    });


    currentSlide = index;


    slides[currentSlide]
        .classList.add("active");


    if (indicators[currentSlide]) {

        indicators[currentSlide]
            .classList.add("active");

    }

}


function startSlideshow() {

    clearInterval(slideshowTimer);


    slideshowTimer = setInterval(() => {

        changeSlide(1);

    }, 5000);

}


/* =========================================
   CONFETTI
========================================= */

function createConfetti() {

    const container =
        document.getElementById("confettiContainer");


    if (!container) return;


    container.innerHTML = "";


    const colors = [

        "#ff6b9d",
        "#4ecdc4",
        "#45b7d1",
        "#ffeaa7",
        "#fd79a8",
        "#00cec9"

    ];


    for (let i = 0; i < 50; i++) {

        const confetti =
            document.createElement("div");


        confetti.className = "confetti";

        confetti.style.left =
            Math.random() * 100 + "%";

        confetti.style.backgroundColor =
            colors[
                Math.floor(
                    Math.random() * colors.length
                )
            ];

        confetti.style.animationDelay =
            Math.random() * 3 + "s";


        container.appendChild(confetti);

    }

}


function explodeConfetti() {

    const container =
        document.getElementById("confettiContainer");


    const colors = [

        "#ff6b9d",
        "#4ecdc4",
        "#45b7d1",
        "#ffeaa7",
        "#fd79a8"

    ];


    for (let i = 0; i < 100; i++) {

        const confetti =
            document.createElement("div");


        confetti.className = "confetti";


        confetti.style.left =
            Math.random() * 100 + "%";


        confetti.style.backgroundColor =
            colors[
                Math.floor(
                    Math.random() * colors.length
                )
            ];


        container.appendChild(confetti);


        setTimeout(() => {

            confetti.remove();

        }, 3000);

    }

}


/* =========================================
   PARTICLES
========================================= */

function createParticles() {

    const container =
        document.getElementById("particles");


    for (let i = 0; i < 30; i++) {

        const particle =
            document.createElement("div");


        particle.className = "particle";


        particle.style.left =
            Math.random() * 100 + "%";


        particle.style.animationDelay =
            Math.random() * 8 + "s";


        particle.style.animationDuration =
            Math.random() * 4 + 6 + "s";


        container.appendChild(particle);

    }

}


/* =========================================
   CELEBRATION BUTTON
========================================= */

function initializeCelebrationButton() {

    const button =
        document.getElementById("celebrateBtn");


    button.addEventListener("click", () => {

        explodeConfetti();

        const gallery =
            document.getElementById("gallery");


        window.scrollTo({

            top: gallery.offsetTop - 70,

            behavior: "smooth"

        });

    });

}


/* =========================================
   MUSIC PLAYER
========================================= */

function initializeMusic() {

    const audio =
        document.getElementById("audioPlayer");

    const playButton =
        document.getElementById("playPauseBtn");

    const previousButton =
        document.getElementById("prevTrackBtn");

    const nextButton =
        document.getElementById("nextTrackBtn");

    const volume =
        document.getElementById("volumeSlider");

    const progressBar =
        document.getElementById("progressBar");


    loadTrack(0);


    playButton.addEventListener("click", toggleMusic);


    previousButton.addEventListener(
        "click",
        previousTrack
    );


    nextButton.addEventListener(
        "click",
        nextTrack
    );


    volume.addEventListener("input", () => {

        audio.volume =
            volume.value / 100;

    });


    progressBar.addEventListener(
        "click",
        seekAudio
    );


    audio.addEventListener(
        "timeupdate",
        updateAudioProgress
    );


    audio.addEventListener(
        "loadedmetadata",
        updateDuration
    );


    audio.addEventListener("ended", () => {

        nextTrack();

    });


    document
        .querySelectorAll(".playlist-item")
        .forEach((item, index) => {

            item.addEventListener("click", () => {

                loadTrack(index);

                audio.play();

                isPlaying = true;

                updatePlayButton();

            });

        });

}


function loadTrack(index) {

    const audio =
        document.getElementById("audioPlayer");


    const title =
        document.getElementById("trackTitle");

    const artist =
        document.getElementById("trackArtist");


    currentTrack = index;


    audio.src =
        audioTracks[index].src;


    title.textContent =
        audioTracks[index].title;


    artist.textContent =
        audioTracks[index].artist;


    document
        .querySelectorAll(".playlist-item")
        .forEach((item, i) => {

            item.classList.toggle(
                "active",
                i === index
            );

        });

}


function toggleMusic() {

    const audio =
        document.getElementById("audioPlayer");


    if (audio.paused) {

        audio.play()
            .then(() => {

                isPlaying = true;

                updatePlayButton();

            })
            .catch(error => {

                console.log(
                    "Audio could not start:",
                    error
                );

            });

    } else {

        audio.pause();

        isPlaying = false;

        updatePlayButton();

    }

}


function updatePlayButton() {

    const button =
        document.getElementById("playPauseBtn");

    const vinyl =
        document.getElementById("vinylRecord");


    button.textContent =
        isPlaying ? "⏸️" : "▶️";


    if (isPlaying) {

        vinyl.classList.add("playing");

    } else {

        vinyl.classList.remove("playing");

    }

}


function previousTrack() {

    currentTrack--;

    if (currentTrack < 0) {

        currentTrack =
            audioTracks.length - 1;

    }

    loadTrack(currentTrack);

    playCurrentTrack();

}


function nextTrack() {

    currentTrack++;

    if (currentTrack >= audioTracks.length) {

        currentTrack = 0;

    }

    loadTrack(currentTrack);

    playCurrentTrack();

}


function playCurrentTrack() {

    const audio =
        document.getElementById("audioPlayer");


    audio.play()
        .then(() => {

            isPlaying = true;

            updatePlayButton();

        })
        .catch(() => {});

}


function updateDuration() {

    const audio =
        document.getElementById("audioPlayer");

    const duration =
        document.getElementById("duration");


    if (!isNaN(audio.duration)) {

        duration.textContent =
            formatTime(audio.duration);

    }

}


function updateAudioProgress() {

    const audio =
        document.getElementById("audioPlayer");

    const progress =
        document.getElementById("progress");

    const currentTime =
        document.getElementById("currentTime");


    if (!audio.duration) return;


    const percent =
        (audio.currentTime / audio.duration) * 100;


    progress.style.width =
        percent + "%";


    currentTime.textContent =
        formatTime(audio.currentTime);

}


function seekAudio(event) {

    const audio =
        document.getElementById("audioPlayer");


    const progressBar =
        document.getElementById("progressBar");


    if (!audio.duration) return;


    const rect =
        progressBar.getBoundingClientRect();


    const position =
        (event.clientX - rect.left) /
        rect.width;


    audio.currentTime =
        position * audio.duration;

}


function formatTime(seconds) {

    if (isNaN(seconds)) return "0:00";


    const minutes =
        Math.floor(seconds / 60);


    const secs =
        Math.floor(seconds % 60);


    return (
        minutes +
        ":" +
        secs.toString().padStart(2, "0")
    );

}


/* =========================================
   PUZZLE
========================================= */

function initializePuzzle() {

    const difficulty =
        document.getElementById(
            "difficultySelect"
        );


    difficulty.addEventListener(
        "change",
        () => {

            currentDifficulty =
                difficulty.value;

            startNewGame();

        }
    );


    document
        .getElementById("newGameBtn")
        .addEventListener(
            "click",
            startNewGame
        );


    document
        .getElementById("showSolutionBtn")
        .addEventListener(
            "click",
            showSolution
        );


    document
        .getElementById("playAgainBtn")
        .addEventListener(
            "click",
            startNewGame
        );


    startNewGame();

}


function getGridSize() {

    if (currentDifficulty === "medium") {

        return 4;

    }

    if (currentDifficulty === "hard") {

        return 5;

    }

    return 3;

}


function startNewGame() {

    clearInterval(gameTimer);


    moveCount = 0;

    gameStartTime = Date.now();


    updateGameStats();


    document
        .getElementById("gameCompletion")
        .style.display = "none";


    generatePuzzle();

    shufflePuzzle();

    startGameTimer();

}


function generatePuzzle() {

    const board =
        document.getElementById("puzzleBoard");

    const solution =
        document.getElementById("solutionImage");


    const gridSize =
        getGridSize();


    const image =
        puzzleImages[
            Math.floor(
                Math.random() *
                puzzleImages.length
            )
        ];


    solution.src = image;


    board.innerHTML = "";


    board.style.gridTemplateColumns =
        `repeat(${gridSize}, 1fr)`;


    board.style.width =
        "300px";


    board.style.height =
        "300px";


    puzzlePieces = [];


    const total =
        gridSize * gridSize;


    for (let i = 0; i < total; i++) {

        const piece =
            document.createElement("div");


        piece.className =
            "puzzle-piece";


        piece.dataset.correct =
            i;


        piece.dataset.position =
            i;


        const row =
            Math.floor(i / gridSize);


        const col =
            i % gridSize;


        const x =
            (col / (gridSize - 1)) * 100;


        const y =
            (row / (gridSize - 1)) * 100;


        piece.style.backgroundImage =
            `url("${image}")`;


        piece.style.backgroundSize =
            `${gridSize * 100}% ${gridSize * 100}%`;


        piece.style.backgroundPosition =
            `${x}% ${y}%`;


        piece.draggable = true;


        piece.addEventListener(
            "dragstart",
            dragStart
        );


        piece.addEventListener(
            "dragover",
            dragOver
        );


        piece.addEventListener(
            "drop",
            dropPiece
        );


        piece.addEventListener(
            "dragend",
            dragEnd
        );


        board.appendChild(piece);

        puzzlePieces.push(piece);

    }

}


function shufflePuzzle() {

    for (
        let i = puzzlePieces.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );


        [
            puzzlePieces[i],
            puzzlePieces[j]
        ] =
        [
            puzzlePieces[j],
            puzzlePieces[i]
        ];

    }


    const board =
        document.getElementById("puzzleBoard");


    puzzlePieces.forEach(
        (piece, index) => {

            piece.dataset.position =
                index;

            board.appendChild(piece);

        }
    );

}


function dragStart(event) {

    draggedPiece =
        event.target;

    draggedPiece.classList.add(
        "dragging"
    );

}


function dragOver(event) {

    event.preventDefault();

}


function dropPiece(event) {

    event.preventDefault();


    const target =
        event.target;


    if (
        !draggedPiece ||
        target === draggedPiece ||
        !target.classList.contains(
            "puzzle-piece"
        )
    ) {

        return;

    }


    const board =
        document.getElementById(
            "puzzleBoard"
        );


    const children =
        Array.from(
            board.children
        );


    const draggedIndex =
        children.indexOf(
            draggedPiece
        );


    const targetIndex =
        children.indexOf(
            target
        );


    if (
        draggedIndex === -1 ||
        targetIndex === -1
    ) {

        return;

    }


    if (draggedIndex < targetIndex) {

        board.insertBefore(
            target,
            draggedPiece
        );

    } else {

        board.insertBefore(
            draggedPiece,
            target
        );

    }


    updatePositions();


    moveCount++;

    updateGameStats();


    checkPuzzle();

}


function dragEnd() {

    if (draggedPiece) {

        draggedPiece.classList.remove(
            "dragging"
        );

    }

    draggedPiece = null;

}


function updatePositions() {

    puzzlePieces =
        Array.from(
            document.querySelectorAll(
                ".puzzle-piece"
            )
        );


    puzzlePieces.forEach(
        (piece, index) => {

            piece.dataset.position =
                index;

        }
    );

}


function checkPuzzle() {

    const correct =
        puzzlePieces.every(
            (piece, index) => {

                return Number(
                    piece.dataset.correct
                ) === index;

            }
        );


    if (correct) {

        clearInterval(gameTimer);

        showCompletion();

        explodeConfetti();

    }

}


function showSolution() {

    const board =
        document.getElementById(
            "puzzleBoard"
        );


    puzzlePieces.sort(
        (a, b) =>
            Number(a.dataset.correct) -
            Number(b.dataset.correct)
    );


    puzzlePieces.forEach(
        piece => {

            board.appendChild(piece);

        }
    );


    updatePositions();

    checkPuzzle();

}


function startGameTimer() {

    gameTimer =
        setInterval(() => {

            const elapsed =
                Math.floor(
                    (Date.now() -
                        gameStartTime) /
                    1000
                );


            const minutes =
                Math.floor(
                    elapsed / 60
                );


            const seconds =
                elapsed % 60;


            document
                .getElementById(
                    "gameTimer"
                )
                .textContent =
                `${minutes}:${seconds
                    .toString()
                    .padStart(2, "0")}`;

        }, 1000);

}


function updateGameStats() {

    document
        .getElementById("moveCounter")
        .textContent =
        moveCount;

}


function showCompletion() {

    const elapsed =
        Math.floor(
            (Date.now() -
                gameStartTime) /
            1000
        );


    const minutes =
        Math.floor(elapsed / 60);


    const seconds =
        elapsed % 60;


    document
        .getElementById("finalTime")
        .textContent =
        `${minutes}:${seconds
            .toString()
            .padStart(2, "0")}`;


    document
        .getElementById("finalMoves")
        .textContent =
        moveCount;


    document
        .getElementById("gameCompletion")
        .style.display = "flex";

}


/* =========================================
   COUNTDOWN
========================================= */

function initializeCountdown() {

    const input =
        document.getElementById(
            "birthdayDate"
        );


    const now =
        new Date();


    now.setFullYear(
        now.getFullYear() + 1
    );


    now.setHours(
        0, 0, 0, 0
    );


    input.value =
        getDateTimeLocal(now);


    input.addEventListener(
        "change",
        updateCountdown
    );


    updateCountdown();

}


function getDateTimeLocal(date) {

    const year =
        date.getFullYear();


    const month =
        String(
            date.getMonth() + 1
        ).padStart(2, "0");


    const day =
        String(
            date.getDate()
        ).padStart(2, "0");


    const hours =
        String(
            date.getHours()
        ).padStart(2, "0");


    const minutes =
        String(
            date.getMinutes()
        ).padStart(2, "0");


    return (
        `${year}-${month}-${day}` +
        `T${hours}:${minutes}`
    );

}


function updateCountdown() {

    const input =
        document.getElementById(
            "birthdayDate"
        );


    targetBirthday =
        new Date(input.value);


    clearInterval(
        countdownTimer
    );


    calculateCountdown();


    countdownTimer =
        setInterval(
            calculateCountdown,
            1000
        );

}


function calculateCountdown() {

    if (!targetBirthday) return;


    const difference =
        targetBirthday.getTime() -
        Date.now();


    if (difference <= 0) {

        setCountdownValue(
            "days",
            "00"
        );

        setCountdownValue(
            "hours",
            "00"
        );

        setCountdownValue(
            "minutes",
            "00"
        );

        setCountdownValue(
            "seconds",
            "00"
        );


        document
            .getElementById(
                "countdownMessage"
            )
            .innerHTML =
            "<p>🎉 Happy Birthday! 🎂</p>";


        return;

    }


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (difference %
                (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            (difference %
                (1000 * 60 * 60)) /
            (1000 * 60)
        );


    const seconds =
        Math.floor(
            (difference %
                (1000 * 60)) /
            1000
        );


    setCountdownValue(
        "days",
        days
    );

    setCountdownValue(
        "hours",
        hours
    );

    setCountdownValue(
        "minutes",
        minutes
    );

    setCountdownValue(
        "seconds",
        seconds
    );


    document
        .getElementById(
            "countdownMessage"
        )
        .innerHTML =
        `<p>🎂 ${days} days until the special day! ❤️</p>`;

}


function setCountdownValue(
    id,
    value
) {

    document
        .getElementById(id)
        .textContent =
        String(value)
            .padStart(2, "0");

}


/* =========================================
   KEYBOARD
========================================= */

function initializeKeyboard() {

    document.addEventListener(
        "keydown",
        event => {

            const slideshow =
                document.getElementById(
                    "gallerySlideshow"
                );


            if (
                slideshow.style.display ===
                "block"
            ) {

                if (
                    event.key ===
                    "ArrowLeft"
                ) {

                    changeSlide(-1);

                }


                if (
                    event.key ===
                    "ArrowRight"
                ) {

                    changeSlide(1);

                }

            }

        }
    );

}


/* =========================================
   MOBILE SWIPE
========================================= */

let touchStartX = 0;

let touchEndX = 0;


function initializeTouch() {

    document.addEventListener(
        "touchstart",
        event => {

            touchStartX =
                event.changedTouches[0]
                    .screenX;

        }
    );


    document.addEventListener(
        "touchend",
        event => {

            touchEndX =
                event.changedTouches[0]
                    .screenX;


            const difference =
                touchStartX -
                touchEndX;


            if (
                Math.abs(difference) >
                50
            ) {

                if (difference > 0) {

                    changeSlide(1);

                } else {

                    changeSlide(-1);

                }

            }

        }
    );

}
