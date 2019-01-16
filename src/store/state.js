// mode
const PLAYING = Symbol('PLAYING') 
const STOP    = Symbol('STOP')
const INIT    = Symbol('INIT')

const state = {
    mode: INIT,
    messageQueue: []
};

export default state