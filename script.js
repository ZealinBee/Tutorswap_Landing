// Single Page App Router
class SPARouter {
  constructor() {
    this.routes = {
      home: "home-page",
      aboutapp: "aboutapp-page",
    };
    this.defaultRoute = "home";
    this.init();
  }

  init() {
    // Handle initial load
    this.handleRoute();

    // Listen for hash changes
    window.addEventListener("hashchange", () => {
      this.handleRoute();
    });

    // Handle navigation clicks
    document.addEventListener("click", (e) => {
      if (e.target.matches(".nav-link")) {
        e.preventDefault();
        const href = e.target.getAttribute("href");
        if (href.startsWith("#")) {
          window.location.hash = href;
        }
      }
    });
  }

  handleRoute() {
    const hash = window.location.hash.slice(1) || this.defaultRoute;
    this.showPage(hash);
    this.updateActiveNav(hash);
  }

  showPage(route) {
    // Hide all pages
    document.querySelectorAll(".page").forEach((page) => {
      page.classList.remove("active");
    });

    // Show target page
    const targetPageId = this.routes[route] || this.routes[this.defaultRoute];
    const targetPage = document.getElementById(targetPageId);
    if (targetPage) {
      targetPage.classList.add("active");
    }

    // Update document title
    this.updateTitle(route);
  }

  updateActiveNav(route) {
    // Remove active class from all nav links
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.remove("active");
    });

    // Add active class to current nav link
    const activeLink = document.querySelector(`.nav-link[href="#${route}"]`);
    if (activeLink) {
      activeLink.classList.add("active");
    }
  }

  updateTitle(route) {
    const titles = {
      home: "TutorSwap - Teach to Learn, Learn to Teach",
      aboutapp: "About App - TutorSwap",
    };
    document.title = titles[route] || titles[this.defaultRoute];
  }
}

// Text animation for the hero section
class TextAnimator {
  constructor() {
    this.subjects = [
      "Finnish",
      "Guitar",
      "Spanish",
      "Cooking",
      "C++",
      "Knitting",
    ];
    this.currentIndex = 0;
    this.element = document.getElementById("animated-subject");
    this.animationDelay = 1750; // Time between changes in milliseconds
    this.transitionDuration = 300; // CSS transition duration

    this.init();
  }

  init() {
    // Only start animation if element exists (home page)
    if (this.element) {
      setTimeout(() => {
        this.startAnimation();
      }, 1000);
    }
  }

  startAnimation() {
    setInterval(() => {
      this.changeText();
    }, this.animationDelay);
  }

  changeText() {
    if (!this.element) return;

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

// Hamburger menu functionality
class MobileNav {
  constructor() {
    this.hamburger = document.getElementById("hamburger");
    this.navMenu = document.getElementById("nav-menu");
    this.navLinks = document.querySelectorAll(".nav-link");

    this.init();
  }

  init() {
    if (this.hamburger && this.navMenu) {
      this.hamburger.addEventListener("click", () => {
        this.toggleMenu();
      });

      // Close menu when clicking on nav links
      this.navLinks.forEach((link) => {
        link.addEventListener("click", () => {
          this.closeMenu();
        });
      });

      // Close menu when clicking outside
      document.addEventListener("click", (e) => {
        if (
          !this.hamburger.contains(e.target) &&
          !this.navMenu.contains(e.target)
        ) {
          this.closeMenu();
        }
      });
    }
  }

  toggleMenu() {
    this.hamburger.classList.toggle("active");
    this.navMenu.classList.toggle("active");
  }

  closeMenu() {
    this.hamburger.classList.remove("active");
    this.navMenu.classList.remove("active");
  }
}

// Initialize all components when the DOM is loaded

document.addEventListener("DOMContentLoaded", () => {
  new SPARouter();
  new TextAnimator();
  new MobileNav();

  // Email icon click handler for platform-specific behavior
  const email = "meeting@tutorswap.app";
  const emailLink = document.getElementById("footer-email");
  if (emailLink) {
    function isIOS() {
      return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    }
    function isMac() {
      return navigator.platform.toUpperCase().indexOf("MAC") >= 0;
    }
    function isAndroid() {
      return /Android/.test(navigator.userAgent);
    }
    function isWindows() {
      return navigator.platform.toUpperCase().indexOf("WIN") >= 0;
    }
    emailLink.addEventListener("click", function (e) {
      e.preventDefault();
      if (isIOS() || isMac()) {
        window.location.href = "mailto:" + email;
      } else if (isAndroid() || isWindows()) {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(email).then(
            function () {
              alert("Email address is copied to your clipboard!");
            },
            function () {
              alert("Failed to copy email address.");
            }
          );
        } else {
          // Fallback for older browsers
          const tempInput = document.createElement("input");
          tempInput.value = email;
          document.body.appendChild(tempInput);
          tempInput.select();
          try {
            document.execCommand("copy");
            alert("Email address copied to clipboard!");
          } catch (err) {
            alert("Failed to copy email address.");
          }
          document.body.removeChild(tempInput);
        }
      } else {
        // Default: try mailto
        window.location.href = "mailto:" + email;
      }
    });
  }
});
