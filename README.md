# Introduction

The `Spinnit` module provides a flexible way to create terminal spinners with customizable messages, patterns, and intervals. This module is useful for indicating ongoing processes in command-line applications. Additionally, you can create loading bars and text filling effects.

![example.js](./img/spinnit.gif)

## Installation

First, install the module and its dependencies:

```bash
npm install spinnit
```

Ensure you have a `spinners.json` file in the same directory as your main file. This JSON file should contain an array of spinner patterns.

## JSON Structure

The `spinners.json` should follow this structure:

```json
[
  {
    "name": "yingyang",
    "spinner": "◐◓◑◒",
    "speed": 100
  },
  {
    "name": "bar-updown",
    "spinner": "▁▃▄▅▆▇█▇▆▅▄▃",
    "speed": 100
  },
  {
    "name": "arrows",
    "spinner": "←↖↑↗→↘↓↙",
    "speed": 100
  },
  {
    "name": "globe",
    "spinner": ["🌍", "🌎", "🌏"],
    "speed": 200
  },
  {
    "name": "moon",
    "spinner": ["🌑", "🌒", "🌓", "🌔", "🌕", "🌝", "🌖", "🌗", "🌘", "🌚"],
    "speed": 200
  },
  {
    "name": "clock",
    "spinner": ["🕛", "🕐", "🕑", "🕒", "🕓", "🕔", "🕕", "🕖", "🕗", "🕘", "🕙", "🕚"],
    "speed": 300
  },
  {
    "name": "equation",
    "spinner": ["е=∑∞ⁿ⁼⁰¹ₙ", "༄˖.🪐.ೃ࿔*:･", "༘⋆⊹★🔭๋࣭ ⭑⋆｡˚", "е=∑∞ⁿ⁼⁰¹ₙ", "🖊️📖✏️📚", "✎ᝰ.📓🗒 ˗", "✖️➗➕➖🟰", "∞︎︎+ ∞︎︎= ??", "𝞹📈🧠📚", "🥽🧪🔬", "˙✧˖°📷 ༘ ", "˚✧₊⁎🌙🌟🌌", "mi = ∑∞ⁿ⁼⁰ ¹ₙ", "☪︎ ִ ࣪𖤐 𐦍 ☾𖤓", "✎ᝰ.📓🗒 ˎˊ˗", "📜⌛🏛️🏺"],
    "speed": 150
  }
]
```

## Usage

1. **Import the Module:**

   ```javascript

   import { Spinnit } from './spinner';
   ```

2. **Create a Spinner:**

   Create a new spinner instance with a custom message:

   ```javascript
   let spinner = Spinnit('Loading...');
   ```

3. **Set Spinner Pattern:**

   You can set the spinner pattern using either a predefined pattern index or a custom array of characters:

   ```javascript
   spinner.setSpinnerPattern(0); // Using predefined pattern by index
   // OR
   spinner.setSpinnerPattern(['-', '\\', '|', '/']); // Using custom pattern array
   ```

4. **Set Spinner Interval:**

   Customize the interval (in milliseconds) for the spinner updates:

   ```javascript
   spinner.setSpinnerInterval(100); // Sets the spinner update interval to 100ms
   ```

5. **Start the Spinner:**

   Start the spinner:

   ```javascript
   spinner.start();
   ```

6. **Stop the Spinner:**

   Stop the spinner. Optionally, clear the spinner line from the terminal:

   ```javascript
   spinner.stop(true); // Stops and clears the spinner line
   ```

7. **Use a Named Spinner:**

   Use a spinner by its name defined in the JSON file:

   ```javascript
   const spinnerName = 'yingyang'; // Change this to the name of the spinner you want to use
   const spinnerData = spinnersData.find(sp => sp.name === spinnerName);

   if (spinnerData) {
     const customSpinner = Spinnit('Using custom spinner');
     customSpinner.setSpinnerPattern(spinnerData.spinner).setSpinnerInterval(spinnerData.speed).start();
   }
   ```

8. **Loading Bar:**

   Create a loading bar:

   ```javascript
   const totalSteps = 20;
   const loadingBarInterval = 200;
   const loadingBarSpinner = Spinnit('Loading Bar');
   loadingBarSpinner.setLoadingBar(totalSteps, loadingBarInterval);
   ```

9. **Filling Text:**

    Create a text filling effect:

```javascript
   const options = {
    text: 'Processing',
    interval: 300,
    fillCharacter: '*'
  };
  const fillingTextSpinner = Spinnit('Filling Text');
  fillingTextSpinner.setFillingText(options.text, options.interval, options.fillCharacter);
```
