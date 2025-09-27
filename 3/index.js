function isPrime(n) {
  if (n < 2) return false;

  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }

  return true;
}

function longPrimeCalculation() {
  for (let i = 0; i < 1e6; i++) {
    isPrime(i);
  }
}
longPrimeCalculation();

// // Example 1: Basic performance measurement
// console.log("🚀 Starting performance measurement demo");
// performance.mark("prime-calc-start");
// performance.mark("prime-calc-end");
// performance.measure("Prime Calculation", "prime-calc-start", "prime-calc-end");

// // Custom performance marker function for better DevTools visualization
// function performanceMarker(
//   fn,
//   { label, track, group, color = "primary-dark" }
// ) {
//   const logo = (...args) => `⚛️ ${args.join(" ")}`;
//   const startMark = `${logo(label)} start`;
//   const endMark = `${logo(label)} end`;

//   performance.mark(startMark);
//   const startTime = performance.now();

//   fn();

//   performance.mark(endMark);
//   const endTime = performance.now();

//   const measure = performance.measure(logo(label), {
//     start: startMark,
//     end: endMark,
//     detail: {
//       track: track || "main-track",
//       group: group || "Main Script",
//       color: color || "primary-dark",
//     },
//   });

//   // Create custom timeline entries
//   console.timeStamp(
//     `${label} - Duration: ${(endTime - startTime).toFixed(2)}ms`
//   );

//   console.log(`📊 ${label} completed in ${measure.duration.toFixed(2)}ms`, {
//     startTime: measure.startTime,
//     duration: measure.duration,
//     track,
//     group,
//   });

//   return measure;
// }

// // Example 2: Measure with custom tracking
// performanceMarker(longPrimeCalculation, {
//   label: "Prime Calculation (Main Thread)",
//   track: "main-thread",
//   group: "CPU Intensive Tasks",
//   color: "tertiary",
// });

// // Example 3: Measure async operation
// setTimeout(() => {
//   performanceMarker(longPrimeCalculation, {
//     label: "Prime Calculation (Delayed)",
//     track: "setTimeout-thread",
//     group: "Deferred Tasks",
//     color: "secondary",
//   });
// }, 1000);

// // Example 4: Real-world scenario - DOM operations
// function heavyDOMOperation() {
//   const container = document.createElement("div");
//   for (let i = 0; i < 1000; i++) {
//     const element = document.createElement("span");
//     element.textContent = `Item ${i}`;
//     container.appendChild(element);
//   }
//   document.body.appendChild(container);
// }

// setTimeout(() => {
//   performanceMarker(heavyDOMOperation, {
//     label: "Heavy DOM Operations",
//     track: "dom-thread",
//     group: "UI Operations",
//     color: "primary",
//   });
// }, 2000);

// // Show all performance entries
// setTimeout(() => {
//   console.log(
//     "📈 All Performance Measures:",
//     performance.getEntriesByType("measure")
//   );
//   console.log(
//     "🎯 All Performance Marks:",
//     performance.getEntriesByType("mark")
//   );
// }, 3000);
