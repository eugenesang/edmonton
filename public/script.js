// let autoScroll = false;
// let lastScrollTime = 0;
// let yScroll = scrollY;

// function scrollPageDecelerating(direction = 'down') {
//   if (autoScroll) {
//     return;
//   }

//   // Define the parameters
//   const initialY = window.scrollY; // Initial scroll position
//   const distance = direction === 'up' ? -300 : 300; // Distance to scroll
//   const targetY = initialY + distance; // Target scroll position
//   const duration = 1000; // Animation duration in milliseconds (1 second)

//   // Calculate the start time
//   const startTime = performance.now();

//   // Animation function
//   function animate(currentTime) {
//     autoScroll = true;
//     // Calculate the progress of the animation
//     const elapsedTime = currentTime - startTime;
//     const progress = Math.min(elapsedTime / duration, 1);

//     // Calculate the new scroll position
//     const newY = initialY + distance * easeOutQuart(progress);

//     // Scroll to the new position
//     window.scrollTo(0, newY);

//     // Continue the animation if it's not finished
//     if (progress < 1) {
//       requestAnimationFrame(animate);
//     }
//   }

//   // Easing function (Quartic Out)
//   function easeOutQuart(t) {
//     return 1 - Math.pow(1 - t, 4);
//   }

//   // Start the animation
//   requestAnimationFrame(animate);
// }

// window.addEventListener('scroll', (event) => {
//   console.log(event)
//   const currentTime = Date.now();
//   if (currentTime - lastScrollTime > 400) {
//     autoScroll = false;
//   }

//   lastScrollTime = currentTime;
//   const diff = yScroll - scrollY;
//   const direction = diff > 0 ? 'up' : 'down';
//   yScroll = scrollY;

//   if (!autoScroll) {
//     scrollPageDecelerating(direction);
//   }
// });
