/**
 * 🌸 Happy 19th Birthday - Nguyễn Gia Nghi (Mer)
 * Interactive Script: Confetti, Web Audio Synth, Interactive Cake, Photo Gallery, Wishes Flip & Guestbook
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Sound & Music Box Synthesizer (Web Audio API) ---
  class BirthdaySynth {
    constructor() {
      this.ctx = null;
      this.isPlaying = false;
      this.currentTimeout = null;
      this.noteIndex = 0;
      
      // Melody: Happy Birthday (Key of C)
      // Notes with frequency & duration
      this.notes = [
        { f: 261.63, d: 0.35, p: 0.4 }, // C4
        { f: 261.63, d: 0.25, p: 0.3 }, // C4
        { f: 293.66, d: 0.6,  p: 0.7 }, // D4
        { f: 261.63, d: 0.6,  p: 0.7 }, // C4
        { f: 349.23, d: 0.6,  p: 0.7 }, // F4
        { f: 329.63, d: 1.0,  p: 1.2 }, // E4

        { f: 261.63, d: 0.35, p: 0.4 }, // C4
        { f: 261.63, d: 0.25, p: 0.3 }, // C4
        { f: 293.66, d: 0.6,  p: 0.7 }, // D4
        { f: 261.63, d: 0.6,  p: 0.7 }, // C4
        { f: 392.00, d: 0.6,  p: 0.7 }, // G4
        { f: 349.23, d: 1.0,  p: 1.2 }, // F4

        { f: 261.63, d: 0.35, p: 0.4 }, // C4
        { f: 261.63, d: 0.25, p: 0.3 }, // C4
        { f: 523.25, d: 0.6,  p: 0.7 }, // C5
        { f: 440.00, d: 0.6,  p: 0.7 }, // A4
        { f: 349.23, d: 0.6,  p: 0.7 }, // F4
        { f: 329.63, d: 0.6,  p: 0.7 }, // E4
        { f: 293.66, d: 0.9,  p: 1.1 }, // D4

        { f: 466.16, d: 0.35, p: 0.4 }, // Bb4
        { f: 466.16, d: 0.25, p: 0.3 }, // Bb4
        { f: 440.00, d: 0.6,  p: 0.7 }, // A4
        { f: 349.23, d: 0.6,  p: 0.7 }, // F4
        { f: 392.00, d: 0.6,  p: 0.7 }, // G4
        { f: 349.23, d: 1.2,  p: 1.6 }  // F4
      ];
    }

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    playTone(freq, duration, type = 'sine', gainVal = 0.15) {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type; // 'sine' for music box kalimba bell sound
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    }

    // Play chime sound effect
    playChime() {
      this.init();
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, i) => {
        setTimeout(() => this.playTone(freq, 1.2, 'sine', 0.2), i * 110);
      });
    }

    // Play blow candle whoosh effect
    playBlowSound() {
      this.init();
      if (!this.ctx) return;
      const bufferSize = this.ctx.sampleRate * 0.5;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.15));
      }
      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.5);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.5);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      whiteNoise.start();
    }

    // Play cute synthesized Cat Meow
    playMeow() {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(900, now + 0.16);
      osc.frequency.exponentialRampToValueAtTime(390, now + 0.52);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(900, now);
      filter.frequency.linearRampToValueAtTime(1400, now + 0.18);
      filter.frequency.linearRampToValueAtTime(750, now + 0.52);
      filter.Q.value = 3.2;

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.22, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.55);
    }

    // Play soothing Cat Purr
    playPurr() {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(70, now);

      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(25, now);
      lfoGain.gain.setValueAtTime(0.08, now);

      lfo.connect(gain.gain);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 1.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      lfo.start(now);
      osc.stop(now + 1.1);
      lfo.stop(now + 1.1);
    }

    playMelody() {
      if (!this.isPlaying) return;
      const current = this.notes[this.noteIndex];
      
      // Play note with a slight harmonic bell tint
      this.playTone(current.f, current.d * 1.5, 'sine', 0.18);
      this.playTone(current.f * 2, current.d, 'triangle', 0.04);

      this.noteIndex = (this.noteIndex + 1) % this.notes.length;
      
      const pause = (this.noteIndex === 0) ? 2200 : current.p * 850;
      this.currentTimeout = setTimeout(() => {
        if (this.isPlaying) this.playMelody();
      }, pause);
    }

  }

  const birthdaySynth = new BirthdaySynth();

  // --- HTML5 Background Audio Player (HIEUTHUHAI - SINH NHẬT) ---
  const bgmAudio = document.getElementById('bgmAudio');
  let isMusicPlaying = false;

  function playBGM() {
    if (!bgmAudio) return;
    bgmAudio.play().then(() => {
      isMusicPlaying = true;
      const equalizer = document.getElementById('equalizer');
      const musicBtn = document.getElementById('musicToggleBtn');
      if (equalizer) equalizer.classList.add('playing');
      if (musicBtn) musicBtn.innerHTML = '⏸️';
    }).catch(err => {
      console.log('Autoplay policy caught, will play on next user tap:', err);
    });
  }

  function pauseBGM() {
    if (!bgmAudio) return;
    bgmAudio.pause();
    isMusicPlaying = false;
    const equalizer = document.getElementById('equalizer');
    const musicBtn = document.getElementById('musicToggleBtn');
    if (equalizer) equalizer.classList.remove('playing');
    if (musicBtn) musicBtn.innerHTML = '🎵';
  }

  function toggleBGM() {
    if (isMusicPlaying) {
      pauseBGM();
    } else {
      playBGM();
    }
  }

  // Music toggle button handler
  const musicToggleBtn = document.getElementById('musicToggleBtn');
  if (musicToggleBtn) {
    musicToggleBtn.addEventListener('click', () => {
      toggleBGM();
    });
  }

  // --- 2. Confetti Particle System ---
  function fireConfetti(count = 90, originX = 0.5, originY = 0.5) {
    const colors = ['#ff477e', '#ff758c', '#ffccd5', '#f59e0b', '#c084fc', '#38bdf8', '#34d399'];
    const container = document.body;

    for (let i = 0; i < count; i++) {
      const conf = document.createElement('div');
      conf.className = 'confetti-piece';
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 10 + 6;
      const isCircle = Math.random() > 0.5;

      conf.style.cssText = `
        position: fixed;
        left: ${originX * 100}vw;
        top: ${originY * 100}vh;
        width: ${size}px;
        height: ${isCircle ? size : size * 1.4}px;
        background-color: ${color};
        border-radius: ${isCircle ? '50%' : '2px'};
        z-index: 10001;
        pointer-events: none;
        opacity: 1;
        transform: translate(-50%, -50%);
      `;

      container.appendChild(conf);

      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 350 + 150;
      const vx = Math.cos(angle) * velocity;
      let vy = Math.sin(angle) * velocity - 120;
      let rotation = Math.random() * 360;
      let rotSpeed = (Math.random() - 0.5) * 30;
      let x = 0;
      let y = 0;
      let opacity = 1;

      const startTime = performance.now();
      const duration = Math.random() * 1500 + 1800;

      function update(now) {
        const elapsed = now - startTime;
        const progress = elapsed / duration;

        if (progress >= 1) {
          conf.remove();
          return;
        }

        vy += 9.8 * 0.8; // gravity
        x += vx * 0.016;
        y += vy * 0.016;
        rotation += rotSpeed;
        opacity = 1 - Math.pow(progress, 2);

        conf.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${rotation}deg)`;
        conf.style.opacity = opacity;

        requestAnimationFrame(update);
      }

      requestAnimationFrame(update);
    }
  }

  // --- 3. Falling Petals & Bokeh Sparkles Canvas ---
  const canvas = document.getElementById('effect-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = 38;

    for (let i = 0; i < particleCount; i++) {
      const randType = Math.random();
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 8 + 5,
        speedX: Math.random() * 1.2 - 0.6,
        speedY: Math.random() * 1.5 + 0.6,
        angle: Math.random() * 360,
        spin: Math.random() * 2 - 1,
        color: Math.random() > 0.4 ? 'rgba(255, 182, 193, 0.55)' : 'rgba(255, 220, 230, 0.45)',
        type: randType < 0.45 ? 'petal' : randType < 0.75 ? 'paw' : 'heart'
      });
    }

    function renderCanvas() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += Math.sin(p.y * 0.008) * 0.8 + p.speedX;
        p.angle += p.spin;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.angle * Math.PI) / 180);
        ctx.fillStyle = p.color;

        if (p.type === 'petal') {
          // Draw soft cherry blossom petal
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'paw') {
          // Draw cute floating cat paw
          const ps = p.size * 0.5;
          ctx.beginPath();
          ctx.ellipse(0, ps * 0.4, ps * 0.9, ps * 0.7, 0, 0, Math.PI * 2);
          ctx.ellipse(-ps * 0.7, -ps * 0.3, ps * 0.35, ps * 0.45, -0.3, 0, Math.PI * 2);
          ctx.ellipse(-ps * 0.25, -ps * 0.65, ps * 0.35, ps * 0.45, 0, 0, Math.PI * 2);
          ctx.ellipse(ps * 0.25, -ps * 0.65, ps * 0.35, ps * 0.45, 0, 0, Math.PI * 2);
          ctx.ellipse(ps * 0.7, -ps * 0.3, ps * 0.35, ps * 0.45, 0.3, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Draw mini floating heart
          ctx.beginPath();
          const s = p.size * 0.6;
          ctx.moveTo(0, s * 0.3);
          ctx.bezierCurveTo(-s, -s * 0.5, -s * 1.2, s * 0.6, 0, s * 1.3);
          ctx.bezierCurveTo(s * 1.2, s * 0.6, s, -s * 0.5, 0, s * 0.3);
          ctx.fill();
        }

        ctx.restore();
      });

      requestAnimationFrame(renderCanvas);
    }
    requestAnimationFrame(renderCanvas);
  }

  // --- 4. Interactive Cursor Sparkles ---
  let lastSparkle = 0;
  window.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastSparkle > 60) {
      lastSparkle = now;
      createSparkle(e.clientX, e.clientY);
    }
  });

  window.addEventListener('click', (e) => {
    for (let i = 0; i < 5; i++) {
      createSparkle(e.clientX + (Math.random() * 30 - 15), e.clientY + (Math.random() * 30 - 15));
    }
  });

  function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle-particle';
    const sparkles = ['✨', '🌸', '💖', '⭐', '🎀'];
    sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 800);
  }

  // --- 5. Surprise Gift Opening & Birthday Password Lock ---
  const giftOverlay = document.getElementById('giftOverlay');
  const giftBox = document.getElementById('giftBox');
  const passLockForm = document.getElementById('passLockForm');
  const passInput = document.getElementById('passInput');
  const passInputWrapper = document.getElementById('passInputWrapper');
  const passError = document.getElementById('passError');
  const passSubmitBtn = document.getElementById('passSubmitBtn');

  // Valid birthday password variations for 30/10
  const validBirthdays = [
    '3010',
    '30/10',
    '30-10',
    '30.10',
    '30102007',
    '30/10/2007',
    '30-10-2007',
    '30.10.2007',
    '30thang10',
    '30tháng10'
  ];

  function unlockGift() {
    if (!giftOverlay) return;
    if (giftBox) giftBox.classList.add('opened');
    birthdaySynth.playChime();
    fireConfetti(140, 0.5, 0.45);

    setTimeout(() => {
      // Start background music (HIEUTHUHAI - Sinh Nhật)
      playBGM();
    }, 500);

    setTimeout(() => {
      giftOverlay.classList.add('hidden');
    }, 950);
  }

  if (passLockForm) {
    passLockForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = passInput.value.trim().replace(/\s+/g, '').toLowerCase();

      if (validBirthdays.includes(val)) {
        if (passError) {
          passError.className = 'pass-error success';
          passError.textContent = '🎉 Mật mã chính xác! Chào mừng bà Mer đến với tuổi 19... ✨';
        }
        passInput.disabled = true;
        if (passSubmitBtn) passSubmitBtn.disabled = true;
        setTimeout(unlockGift, 400);
      } else {
        birthdaySynth.playTone(200, 0.25, 'sawtooth', 0.1);
        if (passInputWrapper) passInputWrapper.classList.add('shake');
        if (passError) {
          passError.className = 'pass-error';
          passError.textContent = '❌ Chưa đúng ngày sinh rồi! Nhớ sinh nhật 30/10 của bà Mer không nè? 🐱';
        }
        setTimeout(() => {
          if (passInputWrapper) passInputWrapper.classList.remove('shake');
        }, 500);
      }
    });
  }

  if (giftBox && passInput) {
    giftBox.addEventListener('click', () => {
      passInput.focus();
      if (passInputWrapper) {
        passInputWrapper.style.transform = 'scale(1.04)';
        setTimeout(() => {
          passInputWrapper.style.transform = '';
        }, 200);
      }
    });
  }

  // --- 6. Time Alive Counter for Gia Nghi (Since 30/10/2007) ---
  function updateTimer() {
    const birthDate = new Date('2007-10-30T00:00:00');
    const now = new Date();
    const diff = now - birthDate;

    if (diff > 0) {
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      const daysEl = document.getElementById('statDays');
      if (daysEl) daysEl.innerText = `${days.toLocaleString()} ngày`;
    }
  }
  updateTimer();
  setInterval(updateTimer, 1000);

  // --- 7. Secret Birthday Wish & Candle Blowing Ceremony ---
  const secretWishForm = document.getElementById('secretWishForm');
  const secretWishInput = document.getElementById('secretWishInput');
  const secretWishCharCount = document.getElementById('secretWishCharCount');
  const secretWishSuccess = document.getElementById('secretWishSuccess');
  const secretWishSubmitBtn = document.getElementById('secretWishSubmitBtn');
  const blowSilentLink = document.getElementById('blowSilentLink');
  const sendAnotherWishBtn = document.getElementById('sendAnotherWishBtn');
  const flames = document.querySelectorAll('.candle-flame');

  // Character count tracker
  if (secretWishInput && secretWishCharCount) {
    secretWishInput.addEventListener('input', () => {
      secretWishCharCount.textContent = secretWishInput.value.length;
    });
  }

  // Helper to blow candles with audio & visual effects
  function performCandleBlow() {
    if (window.birthdaySynth && birthdaySynth.playBlowSound) {
      birthdaySynth.playBlowSound();
    }
    flames.forEach((flame) => {
      flame.classList.add('blown-out');
    });
    const cakeInstructions = document.querySelector('.cake-instructions');
    if (cakeInstructions) {
      cakeInstructions.innerHTML = '✨ Nến tuổi 19 đã được thổi! Điều ước của Mer đang bay lên các vì sao... ✨';
    }
  }

  // Helper to send wish silently to the destination endpoint
  function sendWishSilently(wishText) {
    // 1. Save locally first as a guaranteed permanent backup
    try {
      const existing = JSON.parse(localStorage.getItem('mer_secret_wishes') || '[]');
      existing.push({
        wish: wishText,
        time: new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }),
        iso: new Date().toISOString()
      });
      localStorage.setItem('mer_secret_wishes', JSON.stringify(existing));
    } catch (e) {
      console.warn('Backup locally failed', e);
    }

    // 2. Secretly dispatch via FormSubmit
    // Destination endpoint encoded safely:
    const _target = atob('a3J2aW4yMDA3QGdtYWlsLmNvbQ==');
    const endpoint = 'https://formsubmit.co/ajax/' + _target;

    const payload = {
      _subject: '🎂 [Sinh Nhật Mer 19T] Điều ước bí mật từ Mer ✨',
      _template: 'table',
      _captcha: 'false',
      Nguoi_Gui: 'Nguyễn Gia Nghi (Mer - @mohaymongmer)',
      Dip_Le: 'Sinh nhật 19 tuổi (30/10/2007 - 30/10/2026)',
      Dieu_Uoc_Bi_Mat: wishText,
      Thoi_Gian_Gui: new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })
    };

    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(res => res.json())
      .then(data => {
        console.log('Secret star transmission complete ✨');
      })
      .catch(err => {
        console.log('Star transmission queued ✨');
      });
  }

  // Secret shortcut for the user to view all wishes: window.__getMerWishes()
  window.__getMerWishes = function() {
    const list = JSON.parse(localStorage.getItem('mer_secret_wishes') || '[]');
    console.table(list);
    return list;
  };

  // Keyboard shortcut Ctrl + Alt + W to view secret wishes in alert
  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.altKey && (e.key === 'w' || e.key === 'W')) {
      const list = JSON.parse(localStorage.getItem('mer_secret_wishes') || '[]');
      if (list.length === 0) {
        alert('Chưa có điều ước nào được lưu trữ.');
      } else {
        const text = list.map((item, idx) => `[${idx + 1}] ${item.time}:\n${item.wish}`).join('\n\n---\n\n');
        alert(`🌟 DANH SÁCH ĐIỀU ƯỚC BÍ MẬT CỦA MER:\n\n${text}`);
      }
    }
  });

  // Handle Form Submit
  if (secretWishForm) {
    secretWishForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const wish = (secretWishInput ? secretWishInput.value.trim() : '');
      if (!wish) {
        if (secretWishInput) {
          secretWishInput.focus();
          secretWishInput.style.borderColor = '#ef4444';
          setTimeout(() => { secretWishInput.style.borderColor = ''; }, 1500);
        }
        return;
      }

      // Disable button & show sending animation
      if (secretWishSubmitBtn) {
        secretWishSubmitBtn.disabled = true;
        secretWishSubmitBtn.innerHTML = '<span>🌠 Đang gửi lên các vì sao... ✨</span>';
      }

      // Blow candles visual & audio
      performCandleBlow();

      // Send silently
      sendWishSilently(wish);

      // Celebrate with audio and confetti
      setTimeout(() => {
        fireConfetti(160, 0.5, 0.45);
        if (window.birthdaySynth && birthdaySynth.playChime) {
          birthdaySynth.playChime();
        }

        secretWishForm.style.display = 'none';
        if (secretWishSuccess) {
          secretWishSuccess.style.display = 'block';
        }

        // Update mascot speech
        const catBubble = document.getElementById('catBubble');
        if (catBubble) {
          catBubble.textContent = 'Meo! Vũ trụ đã nhận được điều ước bí mật tuổi 19 của bà Mer rồi đó! 💖✨';
        }
      }, 700);
    });
  }

  // Handle Silent Blow without typing wish
  if (blowSilentLink) {
    blowSilentLink.addEventListener('click', () => {
      performCandleBlow();
      sendWishSilently('(Mer chọn giữ điều ước bí mật trong lòng khi thổi nến 🕯️)');

      setTimeout(() => {
        fireConfetti(150, 0.5, 0.45);
        if (window.birthdaySynth && birthdaySynth.playChime) {
          birthdaySynth.playChime();
        }
        secretWishForm.style.display = 'none';
        if (secretWishSuccess) {
          secretWishSuccess.style.display = 'block';
        }
      }, 700);
    });
  }

  // Handle "Viết thêm một điều ước nữa"
  if (sendAnotherWishBtn) {
    sendAnotherWishBtn.addEventListener('click', () => {
      if (secretWishInput) {
        secretWishInput.value = '';
      }
      if (secretWishCharCount) {
        secretWishCharCount.textContent = '0';
      }
      if (secretWishSubmitBtn) {
        secretWishSubmitBtn.disabled = false;
        secretWishSubmitBtn.innerHTML = '<span>🎂 Thổi Nến & Gửi Điều Ước Lên Vũ Trụ ✨</span>';
      }
      if (secretWishSuccess) {
        secretWishSuccess.style.display = 'none';
      }
      if (secretWishForm) {
        secretWishForm.style.display = 'flex';
      }
      if (secretWishInput) {
        secretWishInput.focus();
      }
    });
  }

  // --- 8. Photo Gallery Filter & Lightbox ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const polaroidCards = document.querySelectorAll('.polaroid-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      polaroidCards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat.includes(filter)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.5s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Lightbox Modal
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  polaroidCards.forEach((card) => {
    const img = card.querySelector('img');
    const caption = card.querySelector('.polaroid-caption-text');

    img.addEventListener('click', () => {
      if (!lightboxModal) return;
      lightboxImg.src = img.src;
      lightboxCaption.textContent = caption ? caption.textContent : 'Nguyễn Gia Nghi • Mer ✨';
      lightboxModal.classList.add('show');
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      lightboxModal.classList.remove('show');
    });
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove('show');
      }
    });
  }

  // Photo Heart like toggle
  const heartBtns = document.querySelectorAll('.polaroid-heart');
  heartBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      btn.classList.toggle('liked');
      if (btn.classList.contains('liked')) {
        createSparkle(e.clientX, e.clientY);
        fireConfetti(20, e.clientX / window.innerWidth, e.clientY / window.innerHeight);
      }
    });
  });

  // Floating Hero Like Button
  const heroHeartBtn = document.getElementById('heroHeartBtn');
  if (heroHeartBtn) {
    let count = 19;
    heroHeartBtn.addEventListener('click', (e) => {
      count++;
      heroHeartBtn.innerHTML = `❤️ ${count} Yêu Thương`;
      fireConfetti(25, 0.7, 0.4);
      birthdaySynth.playChime();
    });
  }

  // --- 9. 19 Wishes Card Flip & Progress ---
  const wishCards = document.querySelectorAll('.wish-card');
  const wishesProgressFill = document.getElementById('wishesProgressFill');
  const wishesProgressText = document.getElementById('wishesProgressText');
  let flippedSet = new Set();

  wishCards.forEach((card, index) => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');

      if (card.classList.contains('flipped')) {
        flippedSet.add(index);
        birthdaySynth.playTone(440 + index * 25, 0.4, 'sine', 0.12);
      }

      const count = flippedSet.size;
      const total = wishCards.length;
      const percent = (count / total) * 100;

      if (wishesProgressFill) wishesProgressFill.style.width = `${percent}%`;
      if (wishesProgressText) {
        wishesProgressText.innerHTML = `Đã mở: <strong>${count}</strong> / ${total} điều ngọt ngào ${
          count === total ? '🎉 (Bạn đã mở hết trọn vẹn yêu thương!)' : '✨'
        }`;
      }

      if (count === total && !card.dataset.completed) {
        card.dataset.completed = 'true';
        setTimeout(() => {
          fireConfetti(160, 0.5, 0.4);
          birthdaySynth.playChime();
          alert('🌸 Chúc mừng! Cả 19 điều ước tuổi mới đều đã được tôi gửi gắm trọn vẹn đến bà (Nguyễn Gia Nghi - Mer)! ✨💖');
        }, 500);
      }
    });
  });

  // --- 10. Quẻ Bói Tuổi 19 (Fortune Generator) ---
  const crystalBall = document.getElementById('crystalBall');
  const fortuneBtn = document.getElementById('fortuneBtn');
  const fortuneResult = document.getElementById('fortuneResult');

  const fortunePredictions = [
    {
      love: 'Năm nay đào hoa rực rỡ! Có người luôn thầm quan tâm và muốn mang đến cho bà những bất ngờ lãng mạn.',
      study: 'Mọi kỳ thi đều vượt qua nhẹ nhàng, khả năng sáng tạo và học hỏi của bà đạt đỉnh cao.',
      wealth: 'Ví tiền rủng rỉnh bất ngờ, shopping thả ga và nhận được nhiều món quà xịn xò!',
      mood: '365 ngày tràn đầy tiếng cười, tâm hồn bà luôn an yên và ngập tràn năng lượng tích cực 🌸'
    },
    {
      love: 'Tình cảm ấm áp như ánh nắng sớm mai, bà luôn được chở che và cưng chiều hết mực!',
      study: 'Deadline tự động né xa bà, mọi dự định ấp ủ đều hoàn thành vượt mong đợi.',
      wealth: 'Tài lộc gõ cửa liên tục, ăn ngon mặc đẹp không cần nhìn bill!',
      mood: 'Luôn giữ được sự ngọt ngào, đáng yêu khiến ai gặp bà cũng phải mỉm cười ✨'
    },
    {
      love: 'Một mối nhân duyên đẹp như trong phim ảnh đang chờ đón bà ở tuổi 19 tuyệt vời này.',
      study: 'Gặp được quý nhân hỗ trợ, học gì cũng vào, làm gì cũng suôn sẻ thuận lợi.',
      wealth: 'Có thêm nhiều cơ hội kiếm tiền và tích lũy được một khoản kha khá để vi vu khắp nơi!',
      mood: 'Tâm thái an yên, thanh thản như câu nói bà thích: "La vie est faite de petit bonheur" 🍃'
    }
  ];

  function drawFortune() {
    birthdaySynth.playChime();
    fireConfetti(40, 0.5, 0.6);

    const randomIndex = Math.floor(Math.random() * fortunePredictions.length);
    const p = fortunePredictions[randomIndex];

    if (fortuneResult) {
      document.getElementById('fortuneLove').textContent = p.love;
      document.getElementById('fortuneStudy').textContent = p.study;
      document.getElementById('fortuneWealth').textContent = p.wealth;
      document.getElementById('fortuneMood').textContent = p.mood;

      fortuneResult.classList.add('active');
    }
  }

  if (crystalBall) crystalBall.addEventListener('click', drawFortune);
  if (fortuneBtn) fortuneBtn.addEventListener('click', drawFortune);

  // --- 11. Sổ Lời Chúc (Guestbook) ---
  const wishForm = document.getElementById('wishForm');
  const wishesBoard = document.getElementById('wishesBoard');

  // Initial wishes
  const defaultWishes = [
    {
      name: 'Tài (Tôi nè 🌸)',
      date: 'Hôm nay',
      text: 'Chúc mừng sinh nhật 19 tuổi bà Nghi (Mer)! Chúc bà tuổi mới luôn xinh đẹp, bớt suy nghĩ vu vơ, cười thật nhiều và mọi dự định ấp ủ đều thành công rực rỡ nhé. Có gì cần thì cứ ới tôi một tiếng!'
    },
    {
      name: 'Người Bạn Tri Kỷ 💌',
      date: 'Hôm nay',
      text: 'Tuổi 19 thật rực rỡ nhé Nguyễn Gia Nghi! Cảm ơn vì bà đã luôn mang đến nguồn năng lượng dịu dàng và đáng yêu cho mọi người.'
    },
    {
      name: 'Hội Bạn Thân Của Mer ✨',
      date: 'Hôm nay',
      text: 'Happy 19th Birthday Mer! Chúc bà tuổi mới vạn sự như ý, đạt được mọi ước mơ và luôn giữ nụ cười tỏa nắng nhé!'
    }
  ];

  function loadWishes() {
    let saved = localStorage.getItem('mer_birthday_wishes_v3');
    let list = saved ? JSON.parse(saved) : defaultWishes;

    if (wishesBoard) {
      wishesBoard.innerHTML = '';
      list.forEach((w) => {
        appendWishToDOM(w);
      });
    }
  }

  function appendWishToDOM(w) {
    if (!wishesBoard) return;
    const note = document.createElement('div');
    note.className = 'wish-note';
    note.innerHTML = `
      <div class="wish-note-header">
        <span class="wish-note-author">${escapeHTML(w.name)}</span>
        <span class="wish-note-date">${escapeHTML(w.date)}</span>
      </div>
      <p class="wish-note-text">${escapeHTML(w.text)}</p>
    `;
    wishesBoard.prepend(note);
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  if (wishForm) {
    wishForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('senderName');
      const textInput = document.getElementById('senderWish');

      const name = nameInput.value.trim() || 'Người bạn giấu tên';
      const text = textInput.value.trim();

      if (!text) return;

      const newWish = {
        name,
        date: 'Vừa xong',
        text
      };

      let saved = localStorage.getItem('mer_birthday_wishes_v3');
      let list = saved ? JSON.parse(saved) : [...defaultWishes];
      list.unshift(newWish);
      localStorage.setItem('mer_birthday_wishes_v3', JSON.stringify(list));

      appendWishToDOM(newWish);
      nameInput.value = '';
      textInput.value = '';

      fireConfetti(60, 0.5, 0.7);
      birthdaySynth.playChime();
    });
  }

  // --- 13. Cat & Kitty Interactive Companion System ---
  // A. Floating Cat Mascot
  const catMascotBtn = document.getElementById('catMascotBtn');
  const catBubble = document.getElementById('catBubble');
  const catMascot = document.getElementById('catMascot');

  const catQuotes = [
    'Meo meo! Chúc mừng sinh nhật bà Mer 19 tuổi ạ! 🐾',
    'Bà Nghi xoa đầu làm tui phê quá à~ purr purr... 💖',
    'Sen Tài dặn tui hôm nay phải ngoan ngoãn phục vụ bà Mer! 🐱',
    'Chúc bà Mer tuổi 19 ăn no ngủ say, luôn xinh đẹp và nhiều cá! 🐟',
    'Meo~ Hôm nay bà Mer là công chúa đẹp nhất trần đời! 👑',
    'Đố bà Mer biết ai thương bà nhiều nhất? (Sen Tài và tụi mèo nè!) ✨',
    'Meo meo~ Cho tui xin một miếng bánh kem sinh nhật đi bà Mer! 🎂'
  ];
  let catQuoteIdx = 0;

  function petMascotCat(e) {
    if (Math.random() > 0.4) {
      birthdaySynth.playMeow();
    } else {
      birthdaySynth.playPurr();
    }

    if (catMascot) {
      catMascot.classList.add('happy');
      setTimeout(() => catMascot.classList.remove('happy'), 1200);
    }

    // Spawn floating heart
    if (catMascotBtn) {
      const rect = catMascotBtn.getBoundingClientRect();
      const heart = document.createElement('div');
      heart.className = 'cat-floating-heart';
      heart.textContent = ['💖', '🐾', '✨', '🐟'][Math.floor(Math.random() * 4)];
      heart.style.left = `${rect.left + rect.width / 2}px`;
      heart.style.top = `${rect.top}px`;
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 1200);
    }

    // Change quote
    catQuoteIdx = (catQuoteIdx + 1) % catQuotes.length;
    if (catBubble) {
      catBubble.textContent = catQuotes[catQuoteIdx];
    }
  }

  if (catMascotBtn) catMascotBtn.addEventListener('click', petMascotCat);
  if (catBubble) catBubble.addEventListener('click', petMascotCat);

  // B. Cake Cheerleader Cat
  const cakeCatCheer = document.getElementById('cakeCatCheer');
  if (cakeCatCheer) {
    cakeCatCheer.addEventListener('click', (e) => {
      birthdaySynth.playMeow();
      fireConfetti(25, e.clientX / window.innerWidth, e.clientY / window.innerHeight);
      createSparkle(e.clientX, e.clientY);
    });
  }

  // C. Góc Mèo Cưng Dành Riêng Cho Mer (Sanctuary)
  const feedFishBtn = document.getElementById('feedFishBtn');
  const petCatBtn = document.getElementById('petCatBtn');
  const changeHatBtn = document.getElementById('changeHatBtn');
  const kittyMainStage = document.getElementById('kittyMainStage');
  const kittyEyesOpen = document.getElementById('kittyEyesOpen');
  const kittyEyesClosed = document.getElementById('kittyEyesClosed');
  const kittyPurrText = document.getElementById('kittyPurrText');
  const kittyStatusText = document.getElementById('kittyStatusText');
  const petCountEl = document.getElementById('petCount');
  const hatNameEl = document.getElementById('hatName');
  const kittyAccessory = document.getElementById('kittyAccessory');

  let petCount = 0;
  let accessoryIdx = 0;

  const accessories = [
    {
      name: 'Nơ Hồng 🎀',
      svg: `
        <path d="M50,72 L42,67 L42,77 Z" fill="#ff477e"/>
        <path d="M70,72 L78,67 L78,77 Z" fill="#ff477e"/>
        <circle cx="60" cy="72" r="5" fill="#f43f5e"/>
      `
    },
    {
      name: 'Mũ Tiệc 🎉',
      svg: `
        <polygon points="52,32 60,6 68,32" fill="#ff477e"/>
        <circle cx="60" cy="6" r="4" fill="#facc15"/>
        <path d="M54,20 Q60,24 66,20" stroke="#facc15" stroke-width="2" fill="none"/>
      `
    },
    {
      name: 'Kính Mắt 👓',
      svg: `
        <circle cx="44" cy="53" r="8" fill="none" stroke="#e11d48" stroke-width="2.5"/>
        <circle cx="76" cy="53" r="8" fill="none" stroke="#e11d48" stroke-width="2.5"/>
        <line x1="52" y1="53" x2="68" y2="53" stroke="#e11d48" stroke-width="2.5"/>
      `
    },
    {
      name: 'Vương Miện 👑',
      svg: `
        <polygon points="46,30 50,16 60,24 70,16 74,30" fill="#facc15" stroke="#eab308" stroke-width="1.5"/>
        <circle cx="50" cy="16" r="2.5" fill="#ef4444"/>
        <circle cx="60" cy="24" r="2.5" fill="#3b82f6"/>
        <circle cx="70" cy="16" r="2.5" fill="#10b981"/>
      `
    }
  ];

  function petSanctuaryCat() {
    petCount++;
    if (petCountEl) petCountEl.textContent = petCount;

    birthdaySynth.playPurr();
    if (kittyEyesOpen) kittyEyesOpen.style.display = 'none';
    if (kittyEyesClosed) kittyEyesClosed.style.display = 'block';

    if (kittyPurrText) {
      kittyPurrText.textContent = 'Bà Nghi xoa cằm làm tui sướng rơn người... purr purr~ 💖';
    }
    if (kittyStatusText) {
      kittyStatusText.textContent = `Bé mèo đang cực kỳ hạnh phúc! (Độ yêu thích: ${100 + petCount * 5}%)`;
    }

    setTimeout(() => {
      if (kittyEyesOpen) kittyEyesOpen.style.display = 'block';
      if (kittyEyesClosed) kittyEyesClosed.style.display = 'none';
    }, 1200);

    createSparkle(window.innerWidth / 2, window.innerHeight / 2);
  }

  if (petCatBtn) petCatBtn.addEventListener('click', petSanctuaryCat);
  if (kittyMainStage) kittyMainStage.addEventListener('click', petSanctuaryCat);

  if (feedFishBtn) {
    feedFishBtn.addEventListener('click', (e) => {
      birthdaySynth.playMeow();
      fireConfetti(30, e.clientX / window.innerWidth, e.clientY / window.innerHeight);

      if (kittyPurrText) {
        kittyPurrText.textContent = 'Ngon quá meo meo! Cảm ơn bà Nghi đã thưởng cá hồi tươi! 🐟✨';
      }
      if (kittyStatusText) {
        kittyStatusText.textContent = 'Bé mèo vừa được ăn no nê, đang liếm mép hài lòng!';
      }
    });
  }

  if (changeHatBtn) {
    changeHatBtn.addEventListener('click', () => {
      accessoryIdx = (accessoryIdx + 1) % accessories.length;
      const acc = accessories[accessoryIdx];
      if (hatNameEl) hatNameEl.textContent = acc.name;
      if (kittyAccessory) kittyAccessory.innerHTML = acc.svg;

      birthdaySynth.playChime();
      if (kittyPurrText) {
        kittyPurrText.textContent = `Meo! Bà Nghi thấy tui đeo ${acc.name} có hợp với sinh nhật bà hông? ✨`;
      }
    });
  }

  loadWishes();

  // --- 14. Super Kawaii Chibi Cats Roaming & Patrolling Screen ---
  const runningCatContainer = document.getElementById('runningCatContainer');

  if (runningCatContainer) {
    // 14.0 Create Golden Sparkle Butterfly
    const butterflyEl = document.createElement('div');
    butterflyEl.className = 'screen-butterfly';
    butterflyEl.id = 'screenButterfly';
    butterflyEl.innerHTML = '🦋';
    butterflyEl.title = 'Bươm bướm vàng dẫn lối cho mèo cưng nè!';
    runningCatContainer.appendChild(butterflyEl);

    let butterflyPos = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 };

    // 14.1 Helper to generate Ultra-Cute Kawaii Chibi Cat SVGs
    function createKawaiiCatSvg(config) {
      const {
        bodyColor,
        outlineColor,
        innerEarColor,
        eyeColor,
        blushColor,
        tailSvg,
        bellyOrStripes,
        accessorySvg,
        pawsColor
      } = config;

      return `
        <svg viewBox="0 0 90 70" width="78" height="65" style="overflow: visible;">
          <!-- Tail -->
          <g class="cat-chibi-tail">
            ${tailSvg}
          </g>
          <!-- Back Paws -->
          <ellipse cx="28" cy="55" rx="6.5" ry="4.5" fill="${pawsColor || bodyColor}" stroke="${outlineColor}" stroke-width="1.2" class="paw-bl"/>
          <ellipse cx="44" cy="55" rx="6.5" ry="4.5" fill="${pawsColor || bodyColor}" stroke="${outlineColor}" stroke-width="1.2" class="paw-br"/>
          <!-- Body -->
          <g class="cat-chibi-body">
            <ellipse cx="42" cy="42" rx="23" ry="16" fill="${bodyColor}" stroke="${outlineColor}" stroke-width="1.8"/>
            ${bellyOrStripes || ''}
          </g>
          <!-- Front Paws -->
          <ellipse cx="56" cy="55" rx="6.5" ry="4.5" fill="${pawsColor || bodyColor}" stroke="${outlineColor}" stroke-width="1.2" class="paw-fl"/>
          <ellipse cx="68" cy="55" rx="6.5" ry="4.5" fill="${pawsColor || bodyColor}" stroke="${outlineColor}" stroke-width="1.2" class="paw-fr"/>
          <!-- Head Group -->
          <g class="cat-chibi-head">
            <!-- Ears -->
            <path d="M 43,24 L 46,6 Q 53,8 55,18 Z" fill="${bodyColor}" stroke="${outlineColor}" stroke-width="1.5"/>
            <path d="M 46,21 L 48,10 Q 52,11 53,18 Z" fill="${innerEarColor || '#ffb4c8'}"/>
            <path d="M 64,18 Q 66,8 73,6 L 76,24 Z" fill="${bodyColor}" stroke="${outlineColor}" stroke-width="1.5"/>
            <path d="M 66,18 Q 67,11 71,10 L 73,21 Z" fill="${innerEarColor || '#ffb4c8'}"/>
            <!-- Head Round Shape -->
            <ellipse cx="60" cy="27" rx="19" ry="17" fill="${bodyColor}" stroke="${outlineColor}" stroke-width="1.8"/>
            <!-- Cute Blush -->
            <ellipse cx="47" cy="33" rx="4.5" ry="2.8" fill="${blushColor || '#ff9bb2'}" opacity="0.8"/>
            <ellipse cx="73" cy="33" rx="4.5" ry="2.8" fill="${blushColor || '#ff9bb2'}" opacity="0.8"/>
            <!-- Big Sparkling Anime Eyes -->
            <circle cx="51" cy="26" r="4.2" fill="${eyeColor}"/>
            <circle cx="49.5" cy="24.5" r="1.6" fill="#ffffff"/>
            <circle cx="52.2" cy="27.5" r="0.8" fill="#ffffff"/>
            <circle cx="69" cy="26" r="4.2" fill="${eyeColor}"/>
            <circle cx="67.5" cy="24.5" r="1.6" fill="#ffffff"/>
            <circle cx="70.2" cy="27.5" r="0.8" fill="#ffffff"/>
            <!-- Tiny Pink Nose & Curved Smile -->
            <polygon points="60,29 58.5,31 61.5,31" fill="#ff4d6d"/>
            <path d="M 57.5,32 Q 60,34.5 60,32.5 Q 60,34.5 62.5,32" fill="none" stroke="#be185d" stroke-width="1.4" stroke-linecap="round"/>
            <!-- Whiskers -->
            <line x1="42" y1="30" x2="33" y2="28" stroke="${outlineColor}" stroke-width="1.2" stroke-linecap="round" opacity="0.6"/>
            <line x1="42" y1="33" x2="32" y2="35" stroke="${outlineColor}" stroke-width="1.2" stroke-linecap="round" opacity="0.6"/>
            <line x1="78" y1="30" x2="87" y2="28" stroke="${outlineColor}" stroke-width="1.2" stroke-linecap="round" opacity="0.6"/>
            <line x1="78" y1="33" x2="88" y2="35" stroke="${outlineColor}" stroke-width="1.2" stroke-linecap="round" opacity="0.6"/>
            <!-- Accessories -->
            ${accessorySvg || ''}
          </g>
        </svg>
      `;
    }

    // 14.2 Base Class for All Kawaii Screen Cats
    class KawaiiCatBase {
      constructor(container, config) {
        this.container = container;
        this.name = config.name;
        this.quote = config.quote;
        this.el = document.createElement('div');
        this.el.className = 'kawaii-screen-cat';
        this.el.title = `${config.name} • Bấm để nghe meo meo mừng tuổi 19 của bà Mer nè 🐾`;
        this.el.innerHTML = config.svg;
        this.container.appendChild(this.el);

        this.width = 78;
        this.height = 65;
        this.x = config.startX || 100;
        this.y = config.startY || 100;
        this.flip = 1;
        this.rotation = 0;

        this.el.addEventListener('click', (e) => this.onClick(e));
      }

      onClick(e) {
        e.stopPropagation();
        if (window.birthdaySynth && birthdaySynth.playMeow) {
          birthdaySynth.playMeow();
        }
        this.el.classList.add('hopping');
        setTimeout(() => this.el.classList.remove('hopping'), 600);

        // Heart Burst
        const heart = document.createElement('div');
        heart.className = 'cat-run-heart';
        const icons = ['💖', '🐾', '✨', '🎂', '🍓', '🌸', '🎈'];
        heart.textContent = icons[Math.floor(Math.random() * icons.length)];
        heart.style.left = `${this.x + this.width / 2}px`;
        heart.style.top = `${this.y + this.height / 2}px`;
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 900);

        // Update mascot speech
        const catBubble = document.getElementById('catBubble');
        if (catBubble && this.quote) {
          catBubble.textContent = this.quote;
        }
      }
    }

    // 14.3 Perimeter Patrol Cat (Chạy quanh 4 cạnh viền màn hình liên tục)
    class PerimeterCat extends KawaiiCatBase {
      constructor(container, config) {
        super(container, config);
        this.speed = config.speed || 3.0;
        this.edge = 0; // 0: Bottom, 1: Right, 2: Top, 3: Left
        this.insetX = 20;
        this.insetTop = 68;
        this.insetRight = 85;
        this.insetBottom = 75;

        this.x = this.insetX;
        this.y = window.innerHeight - this.insetBottom;
      }

      update() {
        const w = window.innerWidth;
        const h = window.innerHeight;

        if (this.edge === 0) {
          // Bottom border: running Left -> Right
          this.x += this.speed;
          this.y = h - this.insetBottom;
          this.rotation = 0;
          this.flip = 1;
          if (this.x >= w - this.insetRight) {
            this.x = w - this.insetRight;
            this.edge = 1; // start climbing right border
          }
        } else if (this.edge === 1) {
          // Right border: climbing Bottom -> Top
          this.y -= this.speed;
          this.x = w - this.insetRight;
          this.rotation = -90;
          this.flip = 1;
          if (this.y <= this.insetTop) {
            this.y = this.insetTop;
            this.edge = 2; // start running across top border
          }
        } else if (this.edge === 2) {
          // Top border: running Right -> Left
          this.x -= this.speed;
          this.y = this.insetTop;
          this.rotation = 0;
          this.flip = -1; // face left
          if (this.x <= this.insetX) {
            this.x = this.insetX;
            this.edge = 3; // start climbing down left border
          }
        } else if (this.edge === 3) {
          // Left border: climbing Top -> Bottom
          this.y += this.speed;
          this.x = this.insetX;
          this.rotation = 90;
          this.flip = 1;
          if (this.y >= h - this.insetBottom) {
            this.y = h - this.insetBottom;
            this.edge = 0; // loop back to bottom
          }
        }

        this.el.style.transform = `translate3d(${this.x}px, ${this.y}px, 0) rotate(${this.rotation}deg) scaleX(${this.flip})`;
      }
    }

    // 14.4 Free 2D Roaming Cat (Chạy tự do khắp màn hình, rượt bươm bướm)
    class RoamingCat2D extends KawaiiCatBase {
      constructor(container, config) {
        super(container, config);
        this.speed = config.speed || 2.4;
        const angle = Math.random() * Math.PI * 2;
        this.vx = Math.cos(angle) * this.speed;
        this.vy = Math.sin(angle) * this.speed;
        this.frameCount = 0;
      }

      update() {
        this.frameCount++;
        const w = window.innerWidth;
        const h = window.innerHeight;
        const minX = 20;
        const maxX = w - 85;
        const minY = 70;
        const maxY = h - 80;

        // Gentle attraction to golden butterfly occasionally
        if (this.frameCount % 90 === 0 && Math.random() > 0.4) {
          const dx = butterflyPos.x - this.x;
          const dy = butterflyPos.y - this.y;
          const dist = Math.hypot(dx, dy) || 1;
          this.vx = (dx / dist) * this.speed;
          this.vy = (dy / dist) * this.speed;
        }

        this.x += this.vx;
        this.y += this.vy;

        // Bounce horizontally
        if (this.x < minX) {
          this.x = minX;
          this.vx = Math.abs(this.vx);
        } else if (this.x > maxX) {
          this.x = maxX;
          this.vx = -Math.abs(this.vx);
        }

        // Bounce vertically
        if (this.y < minY) {
          this.y = minY;
          this.vy = Math.abs(this.vy);
        } else if (this.y > maxY) {
          this.y = maxY;
          this.vy = -Math.abs(this.vy);
        }

        this.flip = this.vx >= 0 ? 1 : -1;
        this.el.style.transform = `translate3d(${this.x}px, ${this.y}px, 0) scaleX(${this.flip})`;
      }
    }

    // 14.5 Floating Balloon Cat (Bay bổng lượn sóng trên không)
    class BalloonCat extends KawaiiCatBase {
      constructor(container, config) {
        super(container, config);
        this.speed = config.speed || 1.8;
        this.vx = this.speed;
        this.phase = Math.random() * Math.PI * 2;
      }

      update() {
        const w = window.innerWidth;
        const h = window.innerHeight;
        const minX = 30;
        const maxX = w - 90;

        this.x += this.vx;
        if (this.x < minX) {
          this.x = minX;
          this.vx = Math.abs(this.vx);
        } else if (this.x > maxX) {
          this.x = maxX;
          this.vx = -Math.abs(this.vx);
        }

        // Harmonic sine wave altitude
        const time = Date.now() * 0.0016;
        this.y = (h * 0.38) + Math.sin(time + this.phase) * (h * 0.22);
        const tilt = Math.cos(time + this.phase) * 6;

        this.flip = this.vx >= 0 ? 1 : -1;
        this.el.style.transform = `translate3d(${this.x}px, ${this.y}px, 0) scaleX(${this.flip}) rotate(${tilt}deg)`;
      }
    }

    // 14.6 Zoomies Kitten (Tăng động chạy ziczac nhảy nhót quanh màn hình)
    class ZoomiesCat extends KawaiiCatBase {
      constructor(container, config) {
        super(container, config);
        this.speed = config.speed || 3.8;
        const angle = (Math.PI / 4) + (Math.floor(Math.random() * 4) * Math.PI / 2);
        this.vx = Math.cos(angle) * this.speed;
        this.vy = Math.sin(angle) * this.speed;
      }

      update() {
        const w = window.innerWidth;
        const h = window.innerHeight;
        const minX = 20;
        const maxX = w - 85;
        const minY = 70;
        const maxY = h - 80;

        this.x += this.vx;
        this.y += this.vy;

        let bounced = false;
        if (this.x < minX) {
          this.x = minX;
          this.vx = Math.abs(this.vx);
          bounced = true;
        } else if (this.x > maxX) {
          this.x = maxX;
          this.vx = -Math.abs(this.vx);
          bounced = true;
        }

        if (this.y < minY) {
          this.y = minY;
          this.vy = Math.abs(this.vy);
          bounced = true;
        } else if (this.y > maxY) {
          this.y = maxY;
          this.vy = -Math.abs(this.vy);
          bounced = true;
        }

        if (bounced && Math.random() > 0.6) {
          this.el.classList.add('hopping');
          setTimeout(() => this.el.classList.remove('hopping'), 450);
        }

        this.flip = this.vx >= 0 ? 1 : -1;
        this.el.style.transform = `translate3d(${this.x}px, ${this.y}px, 0) scaleX(${this.flip})`;
      }
    }

    // 14.7 Instantiate 4 Unique Kawaii Cats
    const screenCats = [
      // 1. Mochi: Perimeter Patrol (Chạy vòng quanh 4 cạnh viền màn hình)
      new PerimeterCat(runningCatContainer, {
        name: 'Mochi (Bé Mèo Trắng Tuần Tra 4 Cạnh Viền)',
        quote: 'Meo! Bé Mochi đang chạy tuần tra quanh 4 cạnh viền màn hình chúc mừng sinh nhật 19 tuổi của bà Mer nè! ✨',
        speed: 3.2,
        svg: createKawaiiCatSvg({
          bodyColor: '#ffffff',
          outlineColor: '#f472b6',
          innerEarColor: '#fbcfe8',
          eyeColor: '#0284c7',
          blushColor: '#f472b6',
          pawsColor: '#ffffff',
          tailSvg: '<path d="M 21,44 Q 6,32 10,18" fill="none" stroke="#ffffff" stroke-width="6.5" stroke-linecap="round"/><path d="M 21,44 Q 6,32 10,18" fill="none" stroke="#f472b6" stroke-width="1.8" stroke-linecap="round"/>',
          bellyOrStripes: '<ellipse cx="43" cy="42" rx="14" ry="10" fill="#fff5f7"/>',
          accessorySvg: '<polygon points="56,12 60,-5 64,12" fill="#fbbf24" stroke="#d97706" stroke-width="1"/><circle cx="60" cy="-5" r="3.2" fill="#ec4899"/><circle cx="58.5" cy="4" r="1.3" fill="#38bdf8"/><circle cx="62" cy="7" r="1.3" fill="#a855f7"/><path d="M 52,43 Q 60,47 68,43" stroke="#f43f5e" stroke-width="2.5" fill="none"/><circle cx="60" cy="46" r="2.2" fill="#facc15"/>'
        })
      }),

      // 2. Bơ: Free 2D Roamer with Strawberry Hat
      new RoamingCat2D(runningCatContainer, {
        name: 'Bơ (Bé Mèo Mướp Cam Đội Dâu Tây)',
        quote: 'Meo! Bé Bơ đang đội dâu tây tung tăng rượt bướm khắp màn hình tặng bà Mer nè! 🍓✨',
        speed: 2.6,
        startX: window.innerWidth * 0.35,
        startY: window.innerHeight * 0.45,
        svg: createKawaiiCatSvg({
          bodyColor: '#fb923c',
          outlineColor: '#c2410c',
          innerEarColor: '#fed7aa',
          eyeColor: '#1e293b',
          blushColor: '#fb7185',
          pawsColor: '#ffffff',
          tailSvg: '<path d="M 21,44 Q 6,32 10,18" fill="none" stroke="#fb923c" stroke-width="6.5" stroke-linecap="round"/><path d="M 12,24 Q 9,21 11,18" stroke="#ea580c" stroke-width="2.5" fill="none"/>',
          bellyOrStripes: '<ellipse cx="43" cy="42" rx="15" ry="10" fill="#fff7ed"/><path d="M 33,33 Q 38,38 34,44 M 42,32 Q 47,38 43,44" stroke="#c2410c" stroke-width="2" fill="none" stroke-linecap="round"/>',
          accessorySvg: '<g transform="translate(53, -2)"><path d="M 7,14 C 4,5 16,5 13,14 C 11,18 10,19 10,19 C 10,19 9,18 7,14 Z" fill="#ef4444"/><circle cx="8.5" cy="11" r="0.7" fill="#fef08a"/><circle cx="11.5" cy="13" r="0.7" fill="#fef08a"/><path d="M 8,7 L 10,5 L 12,7" stroke="#22c55e" stroke-width="2" fill="none" stroke-linecap="round"/></g>'
        })
      }),

      // 3. Mimi: Floating Balloon Cat
      new BalloonCat(runningCatContainer, {
        name: 'Mimi (Bé Mèo Hồng Bay Bóng Trái Tim)',
        quote: 'Meo! Bé Mimi đang bay bóng trái tim gửi lời chúc tuổi 19 thật rạng rỡ tới bà Mer nè! 🎈💖',
        speed: 1.9,
        startX: window.innerWidth * 0.6,
        startY: window.innerHeight * 0.3,
        svg: createKawaiiCatSvg({
          bodyColor: '#fdf2f8',
          outlineColor: '#f472b6',
          innerEarColor: '#f472b6',
          eyeColor: '#831843',
          blushColor: '#fb7185',
          pawsColor: '#ffffff',
          tailSvg: '<path d="M 21,44 Q 6,32 10,18" fill="none" stroke="#fdf2f8" stroke-width="6.5" stroke-linecap="round"/><path d="M 21,44 Q 6,32 10,18" fill="none" stroke="#f472b6" stroke-width="1.8" stroke-linecap="round"/>',
          bellyOrStripes: '<ellipse cx="43" cy="42" rx="14" ry="10" fill="#ffffff"/>',
          accessorySvg: '<path d="M 60,38 Q 50,15 45,-20" fill="none" stroke="#f472b6" stroke-width="1.6" class="balloon-string"/><g class="cat-balloon-heart"><path d="M 45,-20 C 45,-32 30,-32 30,-20 C 30,-10 45,-4 45,0 C 45,-4 60,-10 60,-20 C 60,-32 45,-32 45,-20 Z" fill="#ff477e" filter="drop-shadow(0 4px 8px rgba(255,71,126,0.4))"/><circle cx="38" cy="-21" r="2.2" fill="#ffffff" opacity="0.8"/></g><circle cx="60" cy="10" r="3" fill="#f43f5e"/>'
        })
      }),

      // 4. Oreo: High-speed Zoomies Tuxedo Kitten
      new ZoomiesCat(runningCatContainer, {
        name: 'Oreo (Bé Mèo Tuxedo Tăng Động)',
        quote: 'Meo! Bé Oreo tăng động phóng ziczac khắp màn hình ăn mừng sinh nhật 19 tuổi của bà Mer nè! 🐾✨',
        speed: 3.6,
        startX: window.innerWidth * 0.2,
        startY: window.innerHeight * 0.6,
        svg: createKawaiiCatSvg({
          bodyColor: '#1e1b4b',
          outlineColor: '#0f172a',
          innerEarColor: '#f472b6',
          eyeColor: '#facc15',
          blushColor: '#ec4899',
          pawsColor: '#ffffff',
          tailSvg: '<path d="M 21,44 Q 6,32 10,18" fill="none" stroke="#1e1b4b" stroke-width="6.5" stroke-linecap="round"/><circle cx="10" cy="18" r="3.5" fill="#ffffff"/>',
          bellyOrStripes: '<ellipse cx="45" cy="42" rx="13" ry="11" fill="#ffffff"/>',
          accessorySvg: '<polygon points="55,14 62,-6 69,14" fill="#7c3aed" stroke="#5b21b6" stroke-width="1"/><circle cx="62" cy="-6" r="3.2" fill="#facc15"/><text x="59" y="8" font-size="7" fill="#fef08a">✦</text>'
        })
      })
    ];

    // 14.8 Animation Loop
    function animateKawaiiScreenCats() {
      // Animate fluttering butterfly
      const t = Date.now() * 0.0011;
      const w = window.innerWidth;
      const h = window.innerHeight;
      butterflyPos.x = (w * 0.5) + Math.cos(t * 0.9) * (w * 0.42);
      butterflyPos.y = (h * 0.48) + Math.sin(t * 1.3) * (h * 0.35);
      butterflyEl.style.transform = `translate3d(${butterflyPos.x}px, ${butterflyPos.y}px, 0)`;

      // Update all cats
      screenCats.forEach((cat) => cat.update());
      requestAnimationFrame(animateKawaiiScreenCats);
    }
    requestAnimationFrame(animateKawaiiScreenCats);
  }

  // --- 12. Theme Switcher (Pastel Fairycore <-> Starry Night) ---
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = document.body.getAttribute('data-theme');
      if (current === 'starry') {
        document.body.removeAttribute('data-theme');
        themeToggleBtn.innerHTML = '🌙';
      } else {
        document.body.setAttribute('data-theme', 'starry');
        themeToggleBtn.innerHTML = '☀️';
      }
    });
  }
});

