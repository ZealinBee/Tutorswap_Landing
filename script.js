// Text animation for the hero section
class TextAnimator {
  constructor() {
    this.subjects = ["Finnish", "Guitar", "Spanish", "Cooking"];
    this.currentIndex = 0;
    this.element = document.getElementById("animated-subject");
    this.animationDelay = 2500; // Time between changes in milliseconds
    this.transitionDuration = 300; // CSS transition duration

    this.init();
  }

  init() {
    // Start the animation cycle after page load
    setTimeout(() => {
      this.startAnimation();
    }, 1000);
  }

  startAnimation() {
    setInterval(() => {
      this.changeText();
    }, this.animationDelay);
  }

  changeText() {
    // Add fade-out class
    this.element.classList.add("fade-out");

    // After fade-out completes, change text and fade-in
    setTimeout(() => {
      this.currentIndex = (this.currentIndex + 1) % this.subjects.length;
      this.element.textContent = this.subjects[this.currentIndex];

      // Remove fade-out and add fade-in
      this.element.classList.remove("fade-out");
      this.element.classList.add("fade-in");

      // Clean up fade-in class after animation
      setTimeout(() => {
        this.element.classList.remove("fade-in");
      }, this.transitionDuration);
    }, this.transitionDuration);
  }
}

// Initialize the text animator when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new TextAnimator();
});

// Add some interactive effects
document.addEventListener("DOMContentLoaded", () => {
  // Add subtle parallax effect to hero section
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector(".hero-section");
    if (heroSection && scrolled < window.innerHeight) {
      heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  });
});
