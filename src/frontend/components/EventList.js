
import { gardener } from '../gardener.js'
import EventCard from './EventCard.js'

export default function EventList(events) {
    if (!events || events.length === 0) {
        return gardener({
            t: 'div',
            cn: ['text-center', 'py-12'],
            children: [
                {
                    t: 'p',
                    cn: ['text-gray-500', 'text-lg'],
                    txt: 'No events found. Be the first to create one!'
                }
            ]
        })
    }

    return gardener({
        t: 'div',
        cn: ['grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'gap-6'],
        children: events.map(event => EventCard(event))
    })
}
