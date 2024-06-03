import { Spinnit } from './main';
import spinnersData from './spinners.json';

const totalSteps = 20;
const loadingBarInterval = 200;
const text = 'L o a d i n g . . .  ';
const fillingTextInterval = 300;
const totalSpinners = spinnersData.length;
const pauseDuration = 5000;
const slowInterval = 200; // Slower interval for all spinners
const fastInterval = 50;  // Fast interval for custom spinner

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function loadingBarExample() {
  console.log('Loading Bar Example:');
  const loadingBarSpinner = Spinnit('Loading Bar');
  await loadingBarSpinner.setLoadingBar(totalSteps, loadingBarInterval);
  console.log('Loading Bar Complete\n');
}

async function fillingTextExample() {
  console.log('Filling Text Example:');
  const fillingTextSpinner = Spinnit('Filling Text');
  await fillingTextSpinner.setFillingText(text, fillingTextInterval);
  console.log('Filling Text Complete\n');
}

async function cycleThroughSpinners(waitTime = 0, spinnerIndex = 0, currentSpinner = null) {
  await delay(waitTime);

  if (currentSpinner) {
    currentSpinner.stop(true);
  }

  if (spinnerIndex < totalSpinners) {
    const spinnerData = spinnersData[spinnerIndex];
    currentSpinner = Spinnit(`Spinner ${spinnerIndex + 1} of ${totalSpinners}`);
    currentSpinner.setSpinnerPattern(spinnerData.spinner).setSpinnerInterval(spinnerData.speed).start();

    return cycleThroughSpinners(pauseDuration, spinnerIndex + 1, currentSpinner);
  } else {
    currentSpinner = Spinnit('Set the spinner position %s <--');
    currentSpinner.setSpinnerInterval(slowInterval).start();

    await delay(pauseDuration);
    currentSpinner.stop(true);

    currentSpinner = Spinnit('Custom spinner with custom speed');
    currentSpinner.setSpinnerPattern(['|', '/', '-', '\\']).setSpinnerInterval(fastInterval).start();
  }
}

async function runExamples() {
  await loadingBarExample();
  await fillingTextExample();
  console.log('Cycling Through Spinners Example:');
  await cycleThroughSpinners();
}

runExamples();