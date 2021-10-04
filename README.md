# MotorCortex Player

## Installation

`~ npm install @donkeyclip/motorcortex-player`  
or  
`~ yarn add @donkeyclip/motorcortex-player`

## Purpose

MotorCortex Player is a video-like player specially designed for MotorCortex Clips.  
Among other functionality, the player allows the user to play / pause and seek a Clip, control the master volume and the playback speed and more.

## Usage

The player can be used with any MotorCortex Clip. Here is an example with the minimum possible configuration:

```javascript
import MCPlayer from "@donkeyclip/motorcortex-player";
const player = new MCPlayer({ clip: MyClip });
```

## Controls

![Player Controls](https://donkey-spaces.ams3.digitaloceanspaces.com/assets/motorcortex-player/teo-player-numbers.png)

1. Play / pause button
2. Indicator: indicates the status of the Clip
3. Master volume
4. Time: the time passed on the Clip's playback
5. Current time pointer: points the current time on the Clip's timeline. You can grab it and drag it in order to fast move forwards or backwards on the Clip
6. Clip's timeline: the full timeline of the Clip
7. Preview pane: appears on hover on any point of the Clip's timeline showing the Clip at the specific point
8. Loop: Click on this button if you want to set loop on Clip's playback. Two anchor points (start / end) of the loop will appear on the Clip's timeline so you can set your loop anywhere you want
9. DonkeyClip: Opens the Clip on DonkeyClip
10. Options: Click to open the options panel (#12)
11. Full Screen: Clip to go full screen
12. The options panel
13. Pointer Events: Enabling "pointer events" will allow your mouse to access the contents of the Clip. Otherwise all mouse (pointer) events are disabled on the Clip's content
14. Show preview: enables or disables the preview pane
15. Show indicator: shows or hides the Indicator (#2)
16. Show volume: shows or hides the master volume control (#3)
17. Speed: click to open the speed change control

## Options

Except the (mandatory) `clip` option that should be passed on the player on instantiation there is a list of other supported options:  
| Option | Default value | Description |  
| ------------- |:-------------:| -----|  
| clip | - | The MotorCortex Clip object that the Player will control |  
| preview | false | Enable or disable the preview pane (#7) |  
| showVolume | false | Show or hide the master volume control (#3) |  
| showIndicator | false | Show or hide the (status) Indicator (#2) |  
| host | null | The Player by default "wraps" the Clip and seats at the bottom of its container taking advantage of the full width of it. In case you want the Player to get rendered on a different host (element) you can pass this element here |  
| buttons | shows all | An object via which you can select which of the four buttons (#8: Loop via the key "loop", #9: DonkeyClip via the key "donkeyclip", #10: Options via the key "settings", #11: Full Screen via the key "fullScreen"). Enable and disable the buttons by setting their corresponding keys to true or false, accordingly |  
| timeFormat | ms | This option allows you to set the time units on the Time (#4) of the Player. The default is ms, which means the Time will be presented in the form: < elapsed milliseconds >/< total milliseconds >. In the case you want a representation in the form: mm:ss/mm:ss you can set this option to "ss" |
| theme | "transparent on-top" | Here you can pick one of the available themes of the player. The available themes are: "transparent", "dark", "whiteGold", "darkGold", "mc-green", "mc-blue". Screenshots of each theme are presented below. Also you can pick the position of the player controls by adding either 'on-top' or 'position-bottom' after the preferable theme |
| volume| 1 | With this option you can define the volume value. Acceptable values are any flat number between or equal to 0 and 1 |
| speed| 1 | A property from witch you can select the execution speed. any value positive or negative is acceptable|
| loop|false| A boolean indicator whether the clip will initalize with the loop option on|
| autoplay|false| With this option you can auto-start the clip when the loading is complete|
| controls|true| This option allows you to select if the player controls will be visible, therefore availble to the users|
| scaleToFit|true| A property to define if the clip will be auto-scaled to fit to its' host element or not|
| overflow| "hidden" | A property to define if the you want elements outside the scene to be visible or not. Any css overflow values are acceptable|
| outline|unset| A property to define the border style of your clip. This can be useful on edit time. Any css border value is accepted|
| visible|unset| A property to define if you want your clip to be above the player controls. Accepted values are undefined, "always"|
| pointerEvents|true| This options adds a transparent div element on top of the clip in order to prevent user events (eg selection) on the clip element|
| backgroundColor|'transparent'| A css color value to define the players background|
| speedValues| [-2, -1, -0.5, 0, 0.5, 1, 2] | An array of number values to provide as supported options on the speed setting panel. This option will not prevent the player to change the clip speed if programmatically the user change the speed to another value not provided in the speedValues property|
| muted| false | A Boolean property to define if the clip will be muted on start|
| currentScript| <script></script>| If the clip will be loaded from a script with an external source where the player will be included, you can provide the script element refernce and use all the available control properties as data-\* attributes of the script (eg currentScript=document.currentScript)|
| millisecond| 0| The millisecond from witch the clip will start|

overflow: "visible",
outline: "1px dashed #333",
visible: "always",

## Methods

| Name                |                Arguments                 | Description                                                                                                                                                                                                                                                               |
| ------------------- | :--------------------------------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| onMillisecondChange |          function(millisecond)           | A function callback to be called after every millisecond change of the clip                                                                                                                                                                                               |
| createJourney       | function(millisecond, clipCommands = {}) | A function from witch you can create a journey over the clips timeline. The clipCommands accepts the properties 'before' and 'after', from where you can for example pause the clip before the journey and 'play' it after (eg clipCommands={before:'pause',after:'play'} |
| createLoop          |         function(msStart, msEnd)         | With this method your can define a loop with boundaries. The loop option must be set to true for this to work                                                                                                                                                             |
| changeSettings      |           function(newOptions)           | This function allows you to manipulate the player options after the initialization. All the options provided in the 'Options' section can be used here                                                                                                                    |

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
```

## Script Usage

By the use of the embeddable scripts of DonkeyClip you can create a bundle of a clip on a portable <script> that can be placed anywhere inside any html page. This script not only builds the clip but also wrapps it, out of the box, with this player.
Here's a typical use of an embeddable script, with all of the supported attrs present:

```html
<script
  src="https://staging-api.donkeyclip.com/embed/xxxxxxxx-xxxx/"
  data-width="100%"
  data-height="100%"
  data-preview
  data-show-volume
  data-show-indicator
  data-controls
  data-autoplay
  data-scale-to-fit
  data-loop
  data-pointer-events
  data-muted
  data-theme="mc-blue"
  data-speed="2"
  data-volume="0.8"
></script>
```

All of the data attrs can be manipulated after the initialization and on-the-fly will update the player control settings status, witch practically means that the developer can manipulate the Clip through the scrip element. With this feature you can delete the `data-controls` attribute from the script and create your own player controls if that's what you want. The minimum properties for a plug-n-play clip via the script method are

```html
<script
  src="https://staging-api.donkeyclip.com/embed/xxxxxxxx-xxxx/"
  data-scale-to-fit
/>
```

## Themes

### dark

![Player Controls](https://donkey-spaces.ams3.digitaloceanspaces.com/assets/motorcortex-player/dark.png)

### whiteGold

![Player Controls](https://donkey-spaces.ams3.digitaloceanspaces.com/assets/motorcortex-player/whiteGold.png)

### darkGold

![Player Controls](https://donkey-spaces.ams3.digitaloceanspaces.com/assets/motorcortex-player/darkGold.png)

### mc-green

![Player Controls](https://donkey-spaces.ams3.digitaloceanspaces.com/assets/motorcortex-player/mc-green.png)

### mc-blue

![Player Controls](https://donkey-spaces.ams3.digitaloceanspaces.com/assets/motorcortex-player/mc-blue.png)

## License

[MIT License](https://opensource.org/licenses/MIT)

[![Kiss My Button](https://presskit.kissmybutton.gr/logos/kissmybutton-logo-small.png)](https://kissmybutton.gr)
