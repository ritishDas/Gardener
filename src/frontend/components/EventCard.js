
import { gardener } from '../gardener.js'

export default function EventCard(event) {
    const eventDate = new Date(event.event_date);
    const formattedDate = eventDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    const formattedTime = eventDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });

    const participantText = event.participant_count === '1' ? 'participant' : 'participants';

    return gardener({
        t: 'div',
        cn: ['bg-white', 'rounded-lg', 'shadow-md', 'overflow-hidden', 'hover:shadow-xl', 'transition-shadow', 'cursor-pointer', 'border', 'border-gray-200'],
        events: {
            click: () => window.location.href = `/events/${event.id}`
        },
        children: [
            {
                t: 'div',
                cn: ['relative', 'h-48', 'bg-gradient-to-br', 'from-blue-400', 'to-purple-500', 'flex', 'items-center', 'justify-center'],
                children: event.poster ? [
                    {
                        t: 'img',
                        cn: ['w-full', 'h-full', 'object-cover'],
                        attr: {
                            src: event.poster,
                            alt: event.name
                        }
                    }
                ] : [
                    {
                        t: 'span',
                        cn: ['text-white', 'text-6xl', 'font-bold'],
                        txt: event.name.charAt(0).toUpperCase()
                    }
                ]
            },
            {
                t: 'div',
                cn: ['p-4'],
                children: [
                    {
                        t: 'h3',
                        cn: ['text-xl', 'font-bold', 'mb-2', 'text-gray-800'],
                        txt: event.name
                    },
                    {
                        t: 'div',
                        cn: ['flex', 'items-center', 'text-gray-600', 'mb-2', 'text-sm'],
                        children: [
                            {
                                t: 'span',
                                cn: ['mr-1'],
                                txt: '📅'
                            },
                            {
                                t: 'span',
                                txt: `${formattedDate} at ${formattedTime}`
                            }
                        ]
                    },
                    {
                        t: 'div',
                        cn: ['flex', 'items-center', 'text-gray-600', 'mb-3', 'text-sm'],
                        children: event.venue ? [
                            {
                                t: 'span',
                                cn: ['mr-1'],
                                txt: '📍'
                            },
                            {
                                t: 'span',
                                txt: event.venue
                            }
                        ] : [
                            {
                                t: 'span',
                                cn: ['text-gray-400'],
                                txt: 'Location TBD'
                            }
                        ]
                    },
                    {
                        t: 'div',
                        cn: ['flex', 'justify-between', 'items-center', 'pt-3', 'border-t', 'border-gray-200'],
                        children: [
                            {
                                t: 'div',
                                children: [
                                    {
                                        t: 'span',
                                        cn: ['text-lg', 'font-bold', 'text-blue-600'],
                                        txt: event.fee === '0.00' ? 'Free' : `₹${parseFloat(event.fee).toFixed(0)}`
                                    },
                                    {
                                        t: 'span',
                                        cn: ['text-xs', 'text-gray-500', 'ml-1'],
                                        txt: event.fee !== '0.00' ? `/${event.fee_type}` : ''
                                    }
                                ]
                            },
                            {
                                t: 'div',
                                cn: ['text-sm', 'text-gray-600'],
                                children: [
                                    {
                                        t: 'span',
                                        txt: `${event.participant_count || 0} ${participantText}`
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        t: 'div',
                        cn: ['mt-3', 'flex', 'flex-wrap', 'gap-2'],
                        children: event.tags && event.tags.length > 0 && event.tags[0] !== null ?
                            event.tags.slice(0, 3).map(tag => ({
                                t: 'span',
                                cn: ['px-2', 'py-1', 'bg-blue-100', 'text-blue-600', 'text-xs', 'rounded-full'],
                                txt: tag
                            })) : []
                    }
                ]
            }
        ]
    })
}
