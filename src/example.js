import { spinnit } from './main.js';
import { createRequire } from 'module'; // Import createRequire
const require = createRequire(import.meta.url); // Initialize require
const spinnersData = require('./spinners.json'); // Use require to import JSON
// import spinnersData from './spinners.json' assert { type: 'json' };

const totalSteps = 20;
const loadingBarInterval = 200;
const text = 'L o a d i n g . . . ';
const fillingTextInterval = 300;
const totalSpinners = spinnersData.length;
const pauseDuration = 5000;
const slowInterval = 200; // Slower interval for all spinners
const fastInterval = 50;  // Fast interval for custom spinner

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function loadingBarExample() {
  console.log('Loading Bar Example:');
  const loadingBarSpinner = spinnit({ spinner: 'loadingbar', steps: totalSteps, speed: loadingBarInterval });
  await loadingBarSpinner.start();
  console.log('Loading Bar Complete\n');
}

async function fillingTextExample() {
  console.log('Filling Text Example:');
  const fillingTextSpinner = spinnit({ spinner: 'loadingtext', speed: fillingTextInterval, text: text });
  await fillingTextSpinner.start();
  console.log('Filling Text Complete\n');
}

async function cycleThroughSpinners(waitTime = 0, spinnerIndex = 0, currentSpinner = null) {
  await delay(waitTime);

  if (currentSpinner) {
    currentSpinner.stop(true);
  }

  if (spinnerIndex < totalSpinners) {
    const spinnerData = spinnersData[spinnerIndex];
    currentSpinner = spinnit({
      spinner: spinnerData.name,
      speed: spinnerData.speed,
      message: `Spinner ${spinnerIndex + 1} of ${totalSpinners}`
    });
    currentSpinner.start();

    return cycleThroughSpinners(pauseDuration, spinnerIndex + 1, currentSpinner);
  } else {
    currentSpinner = spinnit({ spinner: 'loadingtext', speed: slowInterval, text: 'Set the spinner position %s <--' });
    currentSpinner.start();

    await delay(pauseDuration);
    currentSpinner.stop(true);

    currentSpinner = spinnit({ spinner: 'loadingtext', speed: fastInterval, text: 'Custom spinner with custom speed' });
    currentSpinner.setSpinnerPattern(['|', '/', '-', '\\']).start();
  }
}

async function runExamples() {
  await loadingBarExample();
  await fillingTextExample();
  console.log('Cycling Through Spinners Example:');
  await cycleThroughSpinners();
}

runExamples();
