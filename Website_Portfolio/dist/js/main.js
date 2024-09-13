// // Select DOM Items
// const menuBtn = document.querySelector('.menu-btn');
// const menu = document.querySelector('.menu');
// const menuNav = document.querySelector('.menu-nav');
// const menuBranding = document.querySelector('.menu-branding');
// const navItems = document.querySelectorAll('.nav-item');

// // Set Initial State Of Menu
// let showMenu = false;

// menuBtn.addEventListener('click', toggleMenu);

// function toggleMenu() {
//   if (!showMenu) {
//     menuBtn.classList.add('close');
//     menu.classList.add('show');
//     menuNav.classList.add('show');
//     menuBranding.classList.add('show');
//     navItems.forEach(item => item.classList.add('show'));

//     // Set Menu State
//     showMenu = true;
//   } else {
//     menuBtn.classList.remove('close');
//     menu.classList.remove('show');
//     menuNav.classList.remove('show');
//     menuBranding.classList.remove('show');
//     navItems.forEach(item => item.classList.remove('show'));

//     // Set Menu State
//     showMenu = false;
//   }
// }

const TypeWriter = function (txtElement, words, wait = 3000) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt = '';
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false;
  this.firstTime = true;
};

// Type Method
TypeWriter.prototype.type = function () {
  // Current index of word
  const current = this.wordIndex % this.words.length;
  // Get full text och current word
  const fullTxt = this.words[current];
  // Check if deleting
  if (this.isDeleting) {
    // Remove char
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    if (this.firstTime === true) {
      moveCursor();

      this.firstTime = false;
    }
  } else {
    // Add char
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  // Insert txt into Element
  this.txtElement.innerHTML = `<span class='txt'>${this.txt}</span`;

  // Initial Type Speed
  let typeSpeed = 300;
  if (this.isDeleting) {
    typeSpeed /= 2;
  }

  // Check if word is complete
  if (!this.isDeleting && this.txt === fullTxt) {
    // Make paus at end
    typeSpeed = this.wait;
    this.txtElement.classList.remove('type-cursor');

    // Set delete to true
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    // Move to next word
    this.wordIndex++;
    // Pause before start typing
    typeSpeed = 500;
  }
  if (this.wordIndex === this.words.length) {
    this.wordIndex = 1;
  }

  setTimeout(() => this.type(), typeSpeed);
};

// Init on DOM Load
document.addEventListener('DOMContentLoaded', init);
// Init App
function init() {
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  // Init Typewriter
  new TypeWriter(txtElement, words, wait);
}

const positions = ['.fourth', '.third', '.second', '.first'];
let posIndex = 0;

// const moveCursor = () => {
//   if (posIndex < positions.length) {
//     const pos = document.querySelector(positions[posIndex]);

//     console.log(pos);

//     pos.classList.add('type-cursor');
//     setTimeout(() => pos.classList.remove('type-cursor'), 1000);
//     posIndex++;
//     setTimeout(() => moveCursor, 1000);
//   }
//   const hideEl = document.querySelector('.hide');
//   if (hideEl.classList.contains('.hide')) {
//     hideEl.classList.remove('hide');
//   }
//   document.querySelector('.txt').classList.add('type-cursor');
// };

const moveCursor = async () => {
  if (posIndex < positions.length) {
    console.log(posIndex);
    const pos = document.querySelector(positions[posIndex]);

    await sleep(1000);

    pos.classList.add('type-cursor');

    await sleep(1000);
    pos.classList.remove('type-cursor');
    posIndex++;
    setTimeout(() => moveCursor, 1000);
  }

  await sleep(1000);
  const hideEl = document.querySelector('.hide');
  if (hideEl.classList.contains('hide')) {
    hideEl.classList.remove('hide');
  }

  await sleep(1000);
  const txtEl = document.querySelector('.txt');
  console.log(txtEl)
  txtEl.classList.add('type-cursor');
};

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
