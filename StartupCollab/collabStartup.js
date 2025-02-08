let votes = 0;

function vote(amount) {
  votes += amount;
  document.getElementById("votes").innerText = `Votes: ${votes}`;
}

function react(emoji) {
  alert(`Reaction: ${emoji}`);
}

function nextPitch() {
  document.getElementById("pitch-screen").innerText = "🎤 New Startup Pitch!";
}

let slideIndex = 1;
function nextSlide() {
  slideIndex = (slideIndex % 5) + 1;
  document.getElementById(
    "deck-viewer"
  ).innerText = `📊 Slide ${slideIndex} of 5`;
}

function prevSlide() {
  slideIndex = slideIndex === 1 ? 5 : slideIndex - 1;
  document.getElementById(
    "deck-viewer"
  ).innerText = `📊 Slide ${slideIndex} of 5`;
}
