// Windows 98 system sounds
export const SOUNDS = {
  CLICK: "/sounds/click.mp3",
  STARTUP: "/sounds/startup.mp3",
};

// Sound utility function to play sounds
export const playSound = (soundPath) => {
  const audio = new Audio(soundPath);
  audio.volume = 0.5; // Set a reasonable default volume
  audio.play().catch((error) => {
    // Silently handle any autoplay restrictions
    console.debug("Sound playback failed:", error);
  });
};
