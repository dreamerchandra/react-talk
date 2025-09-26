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

// function marker(fn, { label, track, group, color = "primary-dark" }) {
//   const logo = (...args) => `⚛️  ${args.join(" ")}`;
//   const startMark = logo`${label} start`;
//   const endMark = logo`${label} end`;

//   performance.mark(startMark);
//   fn();
//   performance.mark(endMark);

//   const measure = performance.measure(logo(label), {
//     start: startMark,
//     end: endMark,
//     detail: {
//       track: track || "main track",
//       group: group || "Main script",
//       color: color || "primary-dark",
//     },
//   });

//   console.timeStamp(
//     label,
//     measure.startTime,
//     measure.endTime,
//     track,
//     group,
//     color
//   );
// }

// measure(longPrimeCalculation, {
//   label: "Prime Calculation",
//   track: "main track",
//   group: "Main script",
// });

// setTimeout(() => {
//   measure(longPrimeCalculation, {
//     label: "Prime Calculation",
//     track: "setTimeout track",
//     group: "Main script",
//   });
// }, 1000);
