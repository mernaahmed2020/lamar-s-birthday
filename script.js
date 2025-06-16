document.addEventListener('DOMContentLoaded', function() {
    // Create floating elements
    createHearts(25);
    createStars(15);
    createSparkles(30);
    
    // Elements
    const giftBox = document.querySelector('.gift-box-container');
    const birthdayMessage = document.querySelector('.birthday-message');
    const sweet12 = document.querySelector('.sweet-12');
    const lyricsContainer = document.querySelector('.lyrics-container');
    const birthdaySong = new Audio('audio.mp3');
    birthdaySong.preload = 'auto';
    birthdaySong.volume = 0.5;
    const giftLid = document.querySelector('.gift-lid');
    const giftSparkles = document.querySelector('.gift-sparkles');
    const instruction = document.querySelector('.gift-instruction');
    
    let isOpen = false;
    let audioEnabled = false;
    let lyricsInterval;

    // Enhanced lyrics with emojis
    const lyrics = [
        // Verse 1
        { text: "🎂 Hey Lamar we got the cake 🎂", time: 9.0 },
        { text: "🎉 Kollenna henna so let's celebrate 🎉", time: 11.0 },
        { text: "💃 El gaww helww fel makaaan 💃", time: 13.0 },
        { text: "✨ Dance with us and say yalla ✨", time: 16.0 },
        
        // Chorus
        { text: "🌟 Lamar your day it's time to shine 🌟", time: 17.9 },
        { text: "💖 Kol youm ya habibi entii mine 💖", time: 20.0 },
        { text: "🎈 Birthday vibes so sassy wild 🎈", time: 22.5 },
        { text: "👯 We're sisters ya baashaaa we are ride or diee 👯", time: 24.5 },
        
        // Verse 2
        { text: "👑 Mafish zayeek you're the queen 👑", time: 37.1 },
        { text: "🎤 We sing ya Lamar let the joy begiinn 🎤", time: 39.5 },
        { text: "🎵 melody electric pumping blink 🎵", time: 41.2 },
        { text: "⚡ Your vibe ya babe fills the sink ⚡", time: 44.2 },
        
        // Chorus
        { text: "🌈 Lammmooraa your day it's time to shine 🌈", time: 45.6 },
        { text: "💎 Kol youm ya habibii entii mine 💎", time: 49.0 },
        { text: "🎊 Birthday vibes so sassy wild 🎊", time: 51.0 },
        { text: "🤞 We're sisters ya baashaa we are ride or diee 🤞", time: 54.0 },
        
        // Verse 2 (Repeat)
        { text: "👑 Mafish zayeek you're the queen 👑", time: 56.1 },
        { text: "🎶 We sing ya Lamar let the joy begiinn 🎶", time: 57.5 },
        { text: "🔊 melody electric pumping blink 🔊", time: 61.0 },
        { text: "💫 Your vibe ya babe fills the sink 💫", time: 63.0 },
        
        // Chorus (Repeat)
        { text: "✨ Lammmooraa your day it's time to shine ✨", time: 65.0 },
        { text: "💕 Kol youm ya habibii entii mine 💕", time: 68.0 },
        { text: "🕺 Birthday vibes so sassy wild 🕺", time: 70.0 },
        { text: "💃 We're sisters ya baashaa we are ride or diee 💃", time: 73.0 },
        { text: "🤟 we are ride or diee 🤟", time: 79.0 },
        
        // Bridge
        { text: "🎵 ah, ah , ah 🎵", time: 83.0 },
        { text: "💃 Yalla habibi dance and twirl 💃", time: 84.0 },
        { text: "🌠 el leila deiat make it swirl 🌠", time: 86.0 },
        { text: "🎸 Electric guitar beats flying through 🎸", time: 89.0 },
        { text: "💖 Lamar's day is all about you 💖", time: 92.0 },
        
        // Final Chorus
        { text: "🌟 Lammmooraa your day it's time to shine 🌟", time: 93.0 },
        { text: "💎 Kol youm ya habibii entii mine 💎", time: 97.0 },
        { text: "🎉 Birthday vibes so sassy wild 🎉", time: 99.0 },
        { text: "👯 We're sisters ya baashaa we are ride or diee 👯", time: 101.0 }
    ];

    function checkLyrics() {
        if (!audioEnabled || !isOpen) return;
        
        const currentTime = birthdaySong.currentTime;
        let currentLyric = "";
        
        for (let i = 0; i < lyrics.length; i++) {
            if (currentTime >= lyrics[i].time && 
                (i === lyrics.length - 1 || currentTime < lyrics[i + 1].time)) {
                currentLyric = lyrics[i].text;
                break;
            }
        }
        
        if (currentLyric) {
            lyricsContainer.innerHTML = currentLyric;
            lyricsContainer.classList.add('active');
            
            // Add pulse animation for certain lines
            if (currentLyric.includes("shine") || currentLyric.includes("celebrate")) {
                lyricsContainer.classList.add('pulse');
            } else {
                lyricsContainer.classList.remove('pulse');
            }
        } else {
            lyricsContainer.classList.remove('active');
        }
    }

    function enableAudio() {
        if (!audioEnabled) {
            audioEnabled = true;
            birthdaySong.load();
            birthdaySong.play().then(() => {
                birthdaySong.pause();
                birthdaySong.currentTime = 0;
                lyricsInterval = setInterval(checkLyrics, 100);
            }).catch(e => {
                console.log("Browser requires a click to enable sound.");
            });
        }
    }
    
    document.body.addEventListener('click', enableAudio);
    document.body.addEventListener('touchstart', enableAudio);
    
    let messageTimeout;

    giftBox.addEventListener('click', function() {
        enableAudio();
        
        if (messageTimeout) {
            clearTimeout(messageTimeout);
        }
        
        if (isOpen) {
            // Close gift - reset everything
            giftLid.style.transform = 'rotate(0) translateY(0)';
            birthdayMessage.classList.add('hidden');
            sweet12.classList.add('hidden');
            birthdaySong.pause();
            giftBox.classList.remove('hidden');
            instruction.style.opacity = '1';
            lyricsContainer.classList.remove('active');
        } else {
            // Open gift - start the show!
            giftLid.style.transform = 'rotate(-25deg) translateY(-50px)';
            createConfetti(200);
            createGiftSparkles();
            
            // Hide gift box immediately
            giftBox.classList.add('hidden');
            instruction.style.opacity = '0';
            
            // Show initial message
            birthdayMessage.classList.remove('hidden');
            sweet12.classList.add('hidden');
            
            // Start music and lyrics
            birthdaySong.currentTime = 0;
            birthdaySong.play()
                .then(() => {
                    instruction.textContent = "Click me!";
                    // Show lyrics container
                    lyricsContainer.classList.add('active');
                })
                .catch(e => {
                    instruction.textContent = "🔊 Tap again to enable music!";
                    const enableMusicOnClick = () => {
                        birthdaySong.play()
                            .then(() => {
                                instruction.textContent = "Click me!";
                                giftBox.removeEventListener('click', enableMusicOnClick);
                                lyricsContainer.classList.add('active');
                            })
                            .catch(e => {
                                instruction.textContent = "Browser blocked music ❌";
                            });
                    };
                    giftBox.addEventListener('click', enableMusicOnClick, { once: true });
                });
            
            // Transition to sweet 12 after 3 seconds
            messageTimeout = setTimeout(() => {
                birthdayMessage.classList.add('hidden');
                sweet12.classList.remove('hidden');
                
                // Final transition after 3 more seconds
                messageTimeout = setTimeout(() => {
                    sweet12.classList.add('hidden');
                    giftBox.classList.remove('hidden');
                    instruction.style.opacity = '1';
                    lyricsContainer.classList.remove('active');
                }, 3000);
            }, 3000);
        }
        isOpen = !isOpen;
    });
    function showLyric(text) {
  const lyricsContainer = document.querySelector('.lyrics-container');
  lyricsContainer.textContent = text;
  lyricsContainer.classList.add('active');
  
  // Auto-resize for long lyrics
  if (text.length > 30) {
    lyricsContainer.style.fontSize = '1.3rem';
  } else {
    lyricsContainer.style.fontSize = ''; // Reset
  }
}

    // ... (keep all your existing createHearts, createStars, createSparkles, 
    // createConfetti, and createGiftSparkles functions)

    // Create floating hearts
    function createHearts(count) {
        const container = document.querySelector('.floating-hearts');
        
        for (let i = 0; i < count; i++) {
            const heart = document.createElement('div');
            heart.className = 'heart';
            
            const left = Math.random() * 100;
            const delay = Math.random() * 10;
            const duration = 8 + Math.random() * 8;
            const size = 20 + Math.random() * 20;
            
            heart.style.left = `${left}%`;
            heart.style.animationDelay = `${delay}s`;
            heart.style.animationDuration = `${duration}s`;
            heart.style.width = `${size}px`;
            heart.style.height = `${size}px`;
            
            const hue = 330 + Math.random() * 30;
            heart.style.backgroundColor = `hsl(${hue}, 100%, 70%)`;
            
            container.appendChild(heart);
        }
    }
    
    // Create floating stars
    function createStars(count) {
        const container = document.querySelector('.floating-stars');
        
        for (let i = 0; i < count; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            const left = Math.random() * 100;
            const delay = Math.random() * 15;
            const duration = 10 + Math.random() * 10;
            const size = 10 + Math.random() * 15;
            
            star.style.left = `${left}%`;
            star.style.animationDelay = `${delay}s`;
            star.style.animationDuration = `${duration}s`;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            
            container.appendChild(star);
        }
    }
    
    // Create sparkles
    function createSparkles(count) {
        const container = document.querySelector('.magic-sparkles');
        
        for (let i = 0; i < count; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const delay = Math.random() * 2;
            const duration = 1 + Math.random() * 2;
            const size = 5 + Math.random() * 10;
            
            sparkle.style.left = `${left}%`;
            sparkle.style.top = `${top}%`;
            sparkle.style.animationDelay = `${delay}s`;
            sparkle.style.animationDuration = `${duration}s`;
            sparkle.style.width = `${size}px`;
            sparkle.style.height = `${size}px`;
            
            const colors = ['gold', '#ffeb3b', '#ffab40', 'white', '#ff69b4'];
            sparkle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            container.appendChild(sparkle);
        }
    }
    
    // Create confetti explosion
    function createConfetti(count) {
        const colors = ['#ff6b9e', '#ff8fab', '#ffb3c6', '#ffd700', '#ffeb3b', 'white'];
        const container = document.querySelector('.confetti-container');
        
        container.innerHTML = '';
        
        for (let i = 0; i < count; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            const left = Math.random() * 100;
            const size = 10 + Math.random() * 10;
            const duration = 2 + Math.random() * 3;
            const delay = Math.random();
            const color = colors[Math.floor(Math.random() * colors.length)];
            const shape = ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)];
            
            confetti.style.left = `${left}%`;
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            confetti.style.backgroundColor = color;
            confetti.style.animation = `confetti-fall ${duration}s linear ${delay}s forwards`;
            
            if (shape === 'circle') {
                confetti.style.borderRadius = '50%';
            } else if (shape === 'triangle') {
                confetti.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
            }
            
            container.appendChild(confetti);
        }
    }
    
    // Create gift sparkles
    function createGiftSparkles() {
        giftSparkles.innerHTML = '';
        giftSparkles.style.opacity = '1';
        
        for (let i = 0; i < 50; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            
            const left = Math.random() * 200;
            const top = Math.random() * 150;
            const delay = Math.random();
            const duration = 0.5 + Math.random();
            const size = 5 + Math.random() * 10;
            
            sparkle.style.left = `${left}px`;
            sparkle.style.top = `${top}px`;
            sparkle.style.animationDelay = `${delay}s`;
            sparkle.style.animationDuration = `${duration}s`;
            sparkle.style.width = `${size}px`;
            sparkle.style.height = `${size}px`;
            
            const colors = ['gold', '#ffeb3b', '#ffab40', 'white', '#ff69b4'];
            sparkle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            giftSparkles.appendChild(sparkle);
        }
        
        setTimeout(() => {
            giftSparkles.style.opacity = '0';
        }, 2000);
    }
});