// Sound Engine Initialization
let isStarted = false;
const statusEl = document.getElementById('status');

// Instruments
const kick = new Tone.MembraneSynth({
    envelope: { sustain: 0, attack: 0.02, decay: 0.8 }
}).toDestination();

const snare = new Tone.NoiseSynth({
    noise: { type: 'white' },
    envelope: { sustain: 0, attack: 0.005, decay: 0.1 }
}).toDestination();

const hihat = new Tone.MetalSynth({
    frequency: 200,
    envelope: { sustain: 0, attack: 0.001, decay: 0.05 },
    harmonicity: 5.1,
    modulationIndex: 32,
    resonance: 4000,
    octaves: 1.5
}).toDestination();

const openhat = new Tone.MetalSynth({
    frequency: 200,
    envelope: { sustain: 0, attack: 0.001, decay: 0.3 },
    harmonicity: 5.1,
    modulationIndex: 32,
    resonance: 4000,
    octaves: 1.5
}).toDestination();

const bass = new Tone.MonoSynth({
    oscillator: { type: 'sawtooth' },
    envelope: { attack: 0.05, decay: 0.2, sustain: 0.2, release: 0.5 }
}).toDestination();

const lead = new Tone.DuoSynth({
    vibratoAmount: 0.5,
    vibratoRate: 5,
    harmonicity: 1.5,
    voice0: {
        oscillator: { type: 'sawtooth' },
        envelope: { attack: 0.1, decay: 0.2, sustain: 0.5, release: 0.8 }
    },
    voice1: {
        oscillator: { type: 'sine' },
        envelope: { attack: 0.1, decay: 0.2, sustain: 0.5, release: 0.8 }
    }
}).toDestination();

const synth = new Tone.PolySynth(Tone.Synth).toDestination();

// Recording & Loop Logic
let isRecording = false;
let recordedEvents = [];
const loopLength = '2m'; // 2 measures

const part = new Tone.Part((time, value) => {
    playSound(value.index, true);
}, []).start(0);

part.loop = true;
part.loopEnd = loopLength;

// Sound Mapping
const playSound = (index, fromLoop = false) => {
    if (!isStarted) {
        Tone.start();
        isStarted = true;
        statusEl.textContent = 'Engine Ready';
    }

    switch(index) {
        case 0: kick.triggerAttackRelease('C1', '8n'); break;
        case 1: snare.triggerAttackRelease('8n'); break;
        case 2: hihat.triggerAttackRelease('32n'); break;
        case 3: openhat.triggerAttackRelease('16n'); break;
        case 4: bass.triggerAttackRelease('C2', '8n'); break;
        case 5: bass.triggerAttackRelease('D2', '8n'); break;
        case 6: bass.triggerAttackRelease('E2', '8n'); break;
        case 7: bass.triggerAttackRelease('G2', '8n'); break;
        case 8: lead.triggerAttackRelease('C3', '8n'); break;
        case 9: lead.triggerAttackRelease('D3', '8n'); break;
        case 10: lead.triggerAttackRelease('E3', '8n'); break;
        case 11: lead.triggerAttackRelease('G3', '8n'); break;
        case 12: synth.triggerAttackRelease('C4', '8n'); break;
        case 13: synth.triggerAttackRelease('D4', '8n'); break;
        case 14: synth.triggerAttackRelease('E4', '8n'); break;
        case 15: synth.triggerAttackRelease('G4', '8n'); break;
    }

    // Visual Feedback
    const pad = document.querySelector(`.pad[data-index="${index}"]`);
    if (pad) {
        pad.classList.add('active');
        setTimeout(() => pad.classList.remove('active'), 100);
    }

    // Record if recording is active and not from playback
    if (isRecording && !fromLoop) {
        const time = Tone.Transport.seconds % Tone.Time(loopLength).toSeconds();
        recordedEvents.push({ time, index });
        part.add(time, { index });
    }
};

// Transport Controls
const recordBtn = document.getElementById('record');
const playBtn = document.getElementById('play');
const stopBtn = document.getElementById('stop');
const clearBtn = document.getElementById('clear');
const progressEl = document.getElementById('progress');
const tempoDisplay = document.getElementById('tempo-display');

// Initialize tempo display
tempoDisplay.textContent = `${Math.round(Tone.Transport.bpm.value)} BPM`;

recordBtn.addEventListener('click', () => {
    if (!isStarted) { Tone.start(); isStarted = true; }
    isRecording = !isRecording;
    recordBtn.classList.toggle('recording', isRecording);

    if (isRecording) {
        statusEl.textContent = 'Recording...';
    } else {
        statusEl.textContent = Tone.Transport.state === 'started' ? 'Playing' : 'Stopped';
    }

    if (isRecording && Tone.Transport.state !== 'started') {
        Tone.Transport.start();
    }
});

playBtn.addEventListener('click', () => {
    if (!isStarted) { Tone.start(); isStarted = true; }
    Tone.Transport.start();
    statusEl.textContent = 'Playing';
});

stopBtn.addEventListener('click', () => {
    Tone.Transport.stop();
    isRecording = false;
    recordBtn.classList.remove('recording');
    statusEl.textContent = 'Stopped';
});

clearBtn.addEventListener('click', () => {
    recordedEvents = [];
    part.clear();
    statusEl.textContent = 'Cleared';
});

// Progress Bar Update
const updateProgress = () => {
    if (Tone.Transport.state === 'started') {
        const progress = (Tone.Transport.seconds % Tone.Time(loopLength).toSeconds()) / Tone.Time(loopLength).toSeconds();
        progressEl.style.width = `${progress * 100}%`;
    } else {
        progressEl.style.width = '0%';
    }
    requestAnimationFrame(updateProgress);
};
updateProgress();

// UI Interaction
document.querySelectorAll('.pad').forEach(pad => {
    pad.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        const index = parseInt(pad.dataset.index);
        playSound(index);
    });
});
