import readline from 'readline';
import chalk from 'chalk';
import spinnersData from './spinners.json'; // Importing spinners data

let defaultSpinnerPattern = 0;
let defaultSpinnerInterval = 60;

const defaultTickHandler = function(message) {
  this.clearLine(this.outputStream);
  this.outputStream.write(message);
};

const spinnit = (options) => {
  const spinner = {};

  if (typeof options === 'string') {
    options = { message: options };
  } else if (!options) {
    options = {};
  }

  spinner.message = options.message || '';
  spinner.characters = getSpinnerPattern(defaultSpinnerPattern, spinnersData);
  spinner.interval = defaultSpinnerInterval;
  spinner.onTick = options.onTick || defaultTickHandler;
  spinner.outputStream = options.outputStream || process.stdout;
  spinner.timerId = undefined;

  spinner.start = function() {
    if (this.outputStream === process.stdout && this.outputStream.isTTY !== true) {
      return this;
    }

    let currentIndex = 0;
    const self = this;

    const iterate = function() {
      const msg = self.message.includes('%s')
        ? self.message.replace('%s', self.characters[currentIndex])
        : self.characters[currentIndex] + ' ' + self.message;

      self.onTick(msg);
      currentIndex = ++currentIndex % self.characters.length;
    };

    iterate();
    this.timerId = setInterval(iterate, this.interval);

    return this;
  };

  spinner.isSpinning = function() {
    return this.timerId !== undefined;
  };

  spinner.setSpinnerInterval = function(interval) {
    this.interval = interval;
    return this;
  };

  spinner.setSpinnerPattern = function(pattern) {
    this.characters = Array.isArray(pattern) ? pattern : getSpinnerPattern(pattern, spinnersData);
    return this;
  };

  spinner.setSpinnerMessage = function(message) {
    this.message = message;
    return this;
  };

  spinner.stop = function(clearOutput) {
    if (!this.isSpinning()) {
      return this;
    }

    clearInterval(this.timerId);
    this.timerId = undefined;

    if (clearOutput) {
      this.clearLine(this.outputStream);
    }

    return this;
  };

  spinner.clearLine = function(stream) {
    readline.clearLine(stream, 0);
    readline.cursorTo(stream, 0);
    return this;
  };

  spinner.setLoadingBar = async function(totalSteps, interval, character = '=', background = '-') {
    for (let step = 1; step <= totalSteps; step++) {
      const bar = character.repeat(step) + background.repeat(totalSteps - step);
      process.stdout.write(`\r[${bar}] ${Math.round((step / totalSteps) * 100)}%`);
      await new Promise(resolve => setTimeout(resolve, interval));
    }
    process.stdout.write('\n');
  };
  spinner.setFillingText = async function(text, interval) {
    let filledText = '';
    for (let i = 0; i < text.length; i++) {
      filledText += text[i];
      process.stdout.write(`\r${filledText}`);
      await new Promise(resolve => setTimeout(resolve, interval));
    }
    process.stdout.write('\n');
  };

  return spinner;
};

spinnit.spinners = spinnersData;

spinnit.setDefaultSpinnerPattern = function(value) {
  defaultSpinnerPattern = value;
  return this;
};

spinnit.setDefaultSpinnerInterval = function(value) {
  defaultSpinnerInterval = value;
  return this;
};

// Helper functions

const isInteger = (value) => {
  return typeof value === 'number' && Number.isInteger(value);
};

const getSpinnerPattern = (value, spinners) => {
  if (isInteger(value)) {
    const length = spinners.length;
    value = (value >= length) ? 0 : value;
    value = (value < 0) ? length + value : value;

    return spinners[value].spinner;
  } else {
    const spinner = spinners.find(sp => sp.name === value);
    if (spinner) {
      return spinner.spinner;
    } else {
      return value.split('');
    }
  }
};

export { spinnit };
