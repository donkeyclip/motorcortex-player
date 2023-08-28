# MotorCortex-Player

**Table of Contents**

- [MotorCortex-Player](#motorcortex-player)
  - [Demo](#demo)
- [Intro / Features](#intro--features)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Importing](#importing)
- [Creating Player](#creating-player)
  - [Options](#options)
  - [Methods](#methods)
  - [Themes](#themes)
    - [transparent](#transparent)
    - [blue](#blue)
    - [green](#green)
    - [yellow](#yellow)
    - [dark](#dark)
    - [darkGold](#darkgold)
    - [whiteGold](#whitegold)
    - [custom](#custom)
  - [DonkeyClip QueryParams](#donkeyclip-queryparams)
- [Contributing](#contributing)
- [License](#license)
- [Sponsored by](#sponsored-by)

## Demo

[Check it out here](https://donkeyclip.github.io/motorcortex-player/demo/)

# Intro / Features

MotorCortex Player is a video-like player specially designed for MotorCortex Clips.
Among other functionality, the player allows the user to play/pause and seek a Clip, control the master volume and the playback speed and more.

What does our player include?

![Player Controls Image](https://donkey-spaces.ams3.digitaloceanspaces.com/assets/motorcortex-player/teo-player-numbers.png?)

1. Play/pause button
2. Master volume
3. Time: the time passed on the Clip's playback/total clip time
4. Loop: Click on this button if you want to set a loop on Clip's playback. Two grey anchor points will appear on the timeline from where you can define the loop boundaries.
5. Options: Click to open the options panel
6. Full Screen: Clip to go fullscreen
7. Pointer Events: Enabling "pointer-events" will allow your mouse to access the contents of the Clip. Otherwise, all mouse (pointer) events are disabled on the Clip's content
8. Show volume: shows or hides the master volume control (#2)
9. Speed: click to open the speed change control
10. Player's background-color
11. The actual motorcortex clip

# Getting Started

## Installation

```bash
$ npm install --save @donkeyclip/motorcortex-player
# OR
$ yarn add @donkeyclip/motorcortex-player
```

## Importing

```javascript
import MCPlayer from "@donkeyclip/motorcortex-player";
```

# Creating Player

The player can be used with any MotorCortex Clip. Here is an example with the minimum possible configuration:

```javascript
const player = new MCPlayer({ clip: MyClip });
```

## Options

Except for the (mandatory) `clip` option that should be passed on the player on instantiation there is a list of other supported options:
| Option | Default value | Description |
| ------------- |:-------------:| -----|
| clip | - | The MotorCortex Clip object that the Player will control |
| showVolume | false | Show or hide the master volume control (#2) |
| host | null | The Player by default "wraps" the Clip and seats at the bottom of its container taking advantage of the full width of it. In case you want the Player to get rendered on a different host (element) you can pass this element here |
| buttons | { loop: true, fullScreen: true, settings: true }| An object via which you can select which of the three buttons (#4: Loop via the key "loop", #5: Settings via the key "settings", #6: Full Screen via the key "fullScreen"). Enable and disable the buttons by setting their corresponding keys to true or false, accordingly |
| timeFormat | ss | This option allows you to set the time units on the Time (#3) of the Player. The default is ss, which means the Time will be presented in the form: < elapsed seconds >/< total seconds >. In the case you want a representation in the form: ms/ms you can set this option to "ms" |
| theme | "transparent" | Here you can pick one of the available themes of the player. The available themes are: "transparent", "blue", "yellow", "green","whiteGold","darkGold","dark" and "default" |
| themeCSS| - | Define your own theme using this property. [Checkout how to define custom themes](#custom)
| volume| 1 | With this option you can define the volume value. Acceptable values are any number between or equal to 0 and 1 |
| speed| 1 | A property from witch you can select the execution speed. Any value positive or negative is acceptable|
| loop|false| A boolean indicator whether the clip will initalize with the loop option on|
| autoPlay|false| With this option you can auto-start the clip when the loading is complete|
| controls|true| This option allows you to select if the player controls will be visible, therefore availble to the users. You cannot play or pause the clip by click events when this option is disabled. Scroll events are available if the player's type is set to "scroller" |
| scaleToFit|true| A property to define if the clip will be auto-scaled to fit to its' host element or not|
| overflow| "hidden" | A property to define if the you want elements outside the clip borders to be visible or not. Any css overflow values are acceptable|
| outline|unset| A property to define the border style of your clip. This can be useful on edit time. Any css border value is accepted|
| visible|unset| A property to define if you want your clip to be above the player controls. Accepted values are undefined, "always"|
| pointerEvents|true| This options adds a transparent div element on top of the clip in order to prevent user events (eg selection) on the clip element. When enabled, any click event on the clip triggers the play or pause event|
| backgroundColor|'black'| A css color value to define the players background |
| speedValues| [ -1, 0.5, 1, 2] | An array of number values to provide as supported options on the speed setting panel. This option will not prevent the user to change the clip speed programmatically to another value not provided in the speedValues property|
| muted| false | A Boolean property to define if the clip will be muted on start|
| currentScript| <script></script>| (Interests donkeyclip developers) If the clip will be loaded from a script with an external source where the player will be included, you can provide the script element refernce and use all the available control properties as data-\* attributes of the script (eg currentScript=document.currentScript)|
| millisecond| 0| The millisecond from witch the clip will start|
| thumbnail| - | A thumbnail image url to display in idle state|
| thumbnailColor| - | A thumbnail background color to display in idle state|
| type| "default" | You can select of the types "scroller" or "default". If you don't define this property the default player is active|
|scrollAnimation|false| If you set this property to true you can add animation to you scroll by extending the time of scroll|
|maxScrollStorage|50| You can store scroll events to extend the scroll experience. This property works best with scrollAnimation set to true and it takes an interger value greater than zero|
|sections|-| You can define sections as an array of milliseconds when you want to ankor the scroll events. (eg [0,1000,2000,3000]). Note that the zero(start) and clip's duration(end) are needed as values.

## Methods

| Name                |                Arguments                 | Description                                                                                                                                                                                                                                                               |
| ------------------- | :--------------------------------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| onMillisecondChange |          function(millisecond)           | A function callback to be called after every millisecond change of the clip                                                                                                                                                                                               |
| goToMillisecond     | function(millisecond, clipCommands = {}) | A function from witch you can create a journey over the clips timeline. The clipCommands accepts the properties 'before' and 'after', from where you can for example pause the clip before the journey and 'play' it after (eg clipCommands={before:'pause',after:'play'} |
| createLoop          |         function(msStart, msEnd)         | With this method your can define a loop with boundaries. The loop option must be set to true for this to work                                                                                                                                                             |
| changeSettings      |           function(newOptions)           | This function allows you to manipulate the player options after the initialization. All the options provided in the 'Options' section can be used here                                                                                                                    |
| changeInitParams    |       the clips initparams object        | You can change any initial parameters of the clip by providing new values through this method. Any parameters that won't be defined here will remain the same as the previous state of initial parameters.                                                                |
| enterFullScreen     |                    -                     | You can enter fullscreen mode with code                                                                                                                                                                                                                                   |
| exitFullScreen      |                    -                     | You can exit fullscreen mode with code                                                                                                                                                                                                                                    |

```javascript
//example using player methods
import MClayer from "@donkeyclip/motorcortex-player";
const player = new MCPlayer({
  clip: MyClip,
  onMillisecondChange: (ms) =>
    console.log("There goes another millisecond. I am gonna live forever"),
});
player.changeSettings({ controls: false, speed: "2", loop: true });
player.createLoop(1000, 3000);
player.changeInitParams({ text: "hello world" });
```

## Themes

### transparent

![Player Controls](https://donkey-spaces.ams3.digitaloceanspaces.com/assets/motorcortex-player/transparent.png?)

### blue

![Player Controls](https://donkey-spaces.ams3.digitaloceanspaces.com/assets/motorcortex-player/blue.png?)

### green

![Player Controls](https://donkey-spaces.ams3.digitaloceanspaces.com/assets/motorcortex-player/green.png?)

### yellow

![Player Controls](https://donkey-spaces.ams3.digitaloceanspaces.com/assets/motorcortex-player/yellow.png?)

### dark

![Player Controls](https://donkey-spaces.ams3.cdn.digitaloceanspaces.com/assets/motorcortex-player/dark.png?)

### darkGold

![Player Controls](https://donkey-spaces.ams3.digitaloceanspaces.com/assets/motorcortex-player/darkGold.png?)

### whiteGold

![Player Controls](https://donkey-spaces.ams3.digitaloceanspaces.com/assets/motorcortex-player/whiteGold.png?)

### custom

All you have to do is define the following css text within the property `themeCSS` and use the name in the property theme of player options

```javascript
const player = new MCPlayer({
  clip: MyClip,
  themeCSS: `
  .--mc-player.theme-test {
    --activeColor: 136, 136, 500;
    --defaultColor: 136, 136, 136;
    --backgroundColor: 29, 31, 37, 1;
    --loopBarColor: rgba(var(--activeColor), 0.2);
    --grad-display: none;
  }`,
  theme: "theme-test",
});
```

## DonkeyClip QueryParams

All player options can be exploited by donkeyclips through query parameters. Any option of type boolean can be enabled without the need of the value "true". To disable options that are enabled by default you have to set the value the "false" for example:

```
https://api.donkeyclip.com/v1/embed/xxxxxxxxxx?controls=false&autoPlay&scaleToFit&theme=yellow&speed=2
```

For development purposes you can use the following query parameters to test different MotorCortex, Player, and Bundler versions:

- mcversion
- playerversion
- bundlerversion

For example: `https://api.donkeyclip.com/v1/embed/xxxxxxxxxx?controls&mcversion=7.4.0&playerversion=2.5.0&bundlerversion=7.0.1`

# Contributing

In general, we follow the "fork-and-pull" Git workflow, so if you want to submit patches and additions you should follow the next steps:

1. **Fork** the repo on GitHub
2. **Clone** the project to your own machine
3. **Commit** changes to your own branch
4. **Push** your work back up to your fork
5. Submit a **Pull request** so that we can review your changes

# License

[MIT License](https://opensource.org/licenses/MIT)

# Sponsored by

[<img src="https://presskit.donkeyclip.com/logos/donkey%20clip%20logo.svg" width=250></img>](https://donkeyclip.com)
