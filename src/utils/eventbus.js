const _events = new Map()

export default class EventBus {
    static on ( event, callback ) {
        if (typeof callback !== 'function') throw new Error('TypeError: Callback function must be function type')
        if (!_events[event]) _events[event] = []
        _events[event].push(callback)
    }

    static emit ( event, data ) {
        if (!_events[event]) return
        _events[event].forEach(ele => ele(data))
    }
}