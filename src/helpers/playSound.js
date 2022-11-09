var Sound = require('react-native-sound');

export const playSound = (res) => {
    if (res == "OK") {
        const sound1 = new Sound(require('../assets/sound/levelup.mp3'), (error, _sound) => {
            if (error) {
                console.log('OK sound' + error.message);
                return;
            }
            sound1.play(() => {
                sound1.release();
            })
        })
    } else if (res == "NG") {
        const sound2 = new Sound(require('../assets/sound/buzzer.mp3'), (error, _sound) => {
            if (error) {
                console.log('NG sound' + error.message);
                return;
            }
            sound2.play(() => {
                sound2.release();
            })
        })
    }
}