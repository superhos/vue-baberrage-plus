import uuidv4 from 'uuid/v4'
const _events = new Map()

export default class EventBus {
    static on (event, callback) {
        if (typeof callback !== 'function') throw new Error('TypeError: Callback function must be function type')
        if (!_events[event]) _events[event] = []
        let id = uuidv4()
        _events[event].push({
            id,
            callback
        })
        return id
    }

    static off (event, id) {
        if (!_events[event])return
        for (let evt in _events[event]) {
            console.log(_events[event][evt])
            console.log(id)
            if (_events[event][evt].id === id) {
                _events[event].splice(evt,1)
                return
            }
        }
    }

    static emit (event, data) {
        if (!_events[event]) return
        _events[event].forEach(ele => ele.callback(data))
    }
}