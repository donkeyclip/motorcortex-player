
# Teo MotorCortex Player  
## Installation    
```~ npm install @kissmybutton/motorcortex-player```    
or    
```~ yarn add @kissmybutton/motorcortex-player```    
## Purpose    
Teo MotorCortex Player is a video-like player specially designed for MotorCortex Clips.    
Among other functionality, the player allows the user to play / pause and seek a Clip, control the master volume and the playback speed and more.    
## Usage    
The player can be used with any MotorCortex Clip. Here is an example with the minimum possible configuration:    
```javascript    
const TeoPlayer = require('@kissmybutton/motorcortex-player');    
const player = new TeoPlayer({ clip: MyClip });    
```    
## Controls 
![Player Controls](https://github.com/kissmybutton/teo-motorcortex-player/blob/master/docs/teo-player-numbers.png?raw=true)
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
| Option        | Default value           | Description  |    
| ------------- |:-------------:| -----|    
| clip      | - | The MotorCortex Clip object that the Player will control |    
| preview      | false      |   Enable or disable the preview pane (#7)  |    
| showVolume      | false      |   Show or hide the master volume control (#3)  |   
| showIndicator      | false      |   Show or hide the (status) Indicator (#2)  |  
| host      | null      |   The Player by default "wraps" the Clip and seats at the bottom of its container taking advantage of the full width of it. In case you want the Player to get rendered on a different host (element) you can pass this element here  |  
| buttons      | shows all      |   An object via which you can select which of the four buttons (#8: Loop via the key "loop", #9: DonkeyClip via the key "donkeyclip", #10: Options via the key "settings", #11: Full Screen via the key "fullScreen"). Enable and disable the buttons by setting their corresponding keys to true or false, accordingly  |  
| timeFormat      |   ms    |   This option allows you to set the time units on the Time (#4) of the Player. The default is ms, which means the Time will be presented in the form: < elapsed milliseconds >/< total milliseconds >. In the case you want a representation in the form: mm:ss/mm:ss you can set this option to "ss"  |
| theme      | "transparent" |   Here you can pick one of the available themes of the player. The available themes are: "transparent", "dark", "whiteGold", "darkGold", "mc-green", "mc-blue". Screenshots of each theme are presented below  |
## Themes 
### dark
![Player Controls](https://github.com/kissmybutton/teo-motorcortex-player/blob/master/docs/dark.png?raw=true)
### whiteGold
![Player Controls](https://github.com/kissmybutton/teo-motorcortex-player/blob/master/docs/whiteGold.png?raw=true)
### darkGold
![Player Controls](https://github.com/kissmybutton/teo-motorcortex-player/blob/master/docs/darkGold.png?raw=true)
### mc-green
![Player Controls](https://github.com/kissmybutton/teo-motorcortex-player/blob/master/docs/mc-green.png?raw=true)
### mc-blue
![Player Controls](https://github.com/kissmybutton/teo-motorcortex-player/blob/master/docs/mc-blue.png?raw=true)

## License
[MIT License](https://opensource.org/licenses/MIT)

  
[![Kiss My Button](https://presskit.kissmybutton.gr/logos/kissmybutton-logo-small.png)](https://kissmybutton.gr)