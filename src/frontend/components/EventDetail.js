
import { gardener } from '../gardener.js'

export default function EventDetail(event, currentUserId) {
    const eventDate = new Date(event.event_date);
    const formattedDate = eventDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const formattedTime = eventDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });

    const participantText = event.participant_count === '1' ? 'participant' : 'participants';

    function handleRegister() {
        if (!currentUserId) {
            alert('Please set a user ID to register for events');
            return;
        }

        const registerBtn = document.querySelector('#register-btn');
        registerBtn.disabled = true;
        registerBtn.innerText = 'Registering...';

        fetch(`/api/events/${event.id}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: currentUserId })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    alert('Successfully registered for the event!');
                    window.location.reload();
                } else {
                    alert('Failed to register: ' + data.error);
                    registerBtn.disabled = false;
                    registerBtn.innerText = 'Register for Event';
                }
            })
            .catch(err => {
                console.error('Error registering:', err);
                alert('Failed to register for event');
                registerBtn.disabled = false;
                registerBtn.innerText = 'Register for Event';
            });
    }

    return gardener({
        t: 'div',
        cn: ['max-w-4xl', 'mx-auto'],
        children: [
            {
                t: 'div',
                cn: ['bg-white', 'rounded-lg', 'shadow-lg', 'overflow-hidden'],
                children: [
                    {
                        t: 'div',
                        cn: ['relative', 'h-96', 'bg-gradient-to-br', 'from-blue-400', 'to-purple-500', 'flex', 'items-center', 'justify-center'],
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
                                cn: ['text-white', 'text-9xl', 'font-bold'],
                                txt: event.name.charAt(0).toUpperCase()
                            }
                        ]
                    },
                    {
                        t: 'div',
                        cn: ['p-8'],
                        children: [
                            {
                                t: 'h1',
                                cn: ['text-4xl', 'font-bold', 'mb-4', 'text-gray-800'],
                                txt: event.name
                            },
                            {
                                t: 'div',
                                cn: ['flex', 'flex-wrap', 'gap-6', 'mb-6', 'text-gray-700'],
                                children: [
                                    {
                                        t: 'div',
                                        cn: ['flex', 'items-center'],
                                        children: [
                                            {
                                                t: 'span',
                                                cn: ['text-2xl', 'mr-2'],
                                                txt: '📅'
                                            },
                                            {
                                                t: 'div',
                                                children: [
                                                    {
                                                        t: 'div',
                                                        cn: ['font-semibold'],
                                                        txt: formattedDate
                                                    },
                                                    {
                                                        t: 'div',
                                                        cn: ['text-sm', 'text-gray-600'],
                                                        txt: formattedTime
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    event.venue ? {
                                        t: 'div',
                                        cn: ['flex', 'items-center'],
                                        children: [
                                            {
                                                t: 'span',
                                                cn: ['text-2xl', 'mr-2'],
                                                txt: '📍'
                                            },
                                            {
                                                t: 'span',
                                                cn: ['font-semibold'],
                                                txt: event.venue
                                            }
                                        ]
                                    } : null,
                                    {
                                        t: 'div',
                                        cn: ['flex', 'items-center'],
                                        children: [
                                            {
                                                t: 'span',
                                                cn: ['text-2xl', 'mr-2'],
                                                txt: '💰'
                                            },
                                            {
                                                t: 'span',
                                                cn: ['font-semibold'],
                                                txt: event.fee === '0.00' ? 'Free' : `₹${parseFloat(event.fee).toFixed(0)} per ${event.fee_type}`
                                            }
                                        ]
                                    },
                                    {
                                        t: 'div',
                                        cn: ['flex', 'items-center'],
                                        children: [
                                            {
                                                t: 'span',
                                                cn: ['text-2xl', 'mr-2'],
                                                txt: '👥'
                                            },
                                            {
                                                t: 'span',
                                                cn: ['font-semibold'],
                                                txt: `${event.participant_count || 0} ${participantText}`
                                            }
                                        ]
                                    }
                                ].filter(Boolean)
                            },
                            event.min_team_size || event.max_team_size ? {
                                t: 'div',
                                cn: ['mb-6', 'p-4', 'bg-blue-50', 'rounded-lg', 'border', 'border-blue-200'],
                                children: [
                                    {
                                        t: 'div',
                                        cn: ['flex', 'items-center', 'text-blue-800'],
                                        children: [
                                            {
                                                t: 'span',
                                                cn: ['text-xl', 'mr-2'],
                                                txt: '👥'
                                            },
                                            {
                                                t: 'span',
                                                cn: ['font-semibold'],
                                                txt: 'Team Event'
                                            }
                                        ]
                                    },
                                    {
                                        t: 'p',
                                        cn: ['text-sm', 'text-blue-700', 'mt-2'],
                                        txt: `Team size: ${event.min_team_size || 'any'} - ${event.max_team_size || 'unlimited'} members`
                                    }
                                ]
                            } : null,
                            event.tags && event.tags.length > 0 && event.tags[0] !== null ? {
                                t: 'div',
                                cn: ['mb-6'],
                                children: [
                                    {
                                        t: 'h3',
                                        cn: ['text-lg', 'font-semibold', 'mb-2', 'text-gray-700'],
                                        txt: 'Tags'
                                    },
                                    {
                                        t: 'div',
                                        cn: ['flex', 'flex-wrap', 'gap-2'],
                                        children: event.tags.map(tag => ({
                                            t: 'span',
                                            cn: ['px-3', 'py-1', 'bg-blue-100', 'text-blue-600', 'rounded-full', 'text-sm'],
                                            txt: tag
                                        }))
                                    }
                                ]
                            } : null,
                            event.details_md ? {
                                t: 'div',
                                cn: ['mb-6'],
                                children: [
                                    {
                                        t: 'h3',
                                        cn: ['text-2xl', 'font-semibold', 'mb-3', 'text-gray-800'],
                                        txt: 'Event Details'
                                    },
                                    {
                                        t: 'div',
                                        cn: ['prose', 'max-w-none', 'text-gray-700', 'whitespace-pre-wrap'],
                                        txt: event.details_md
                                    }
                                ]
                            } : null,
                            {
                                t: 'div',
                                cn: ['flex', 'gap-4', 'mt-8'],
                                children: [
                                    {
                                        t: 'button',
                                        cn: ['bg-blue-600', 'text-white', 'px-8', 'py-3', 'rounded-lg', 'font-semibold', 'hover:bg-blue-700', 'transition', 'disabled:bg-gray-400', 'disabled:cursor-not-allowed'],
                                        attr: {
                                            id: 'register-btn'
                                        },
                                        txt: 'Register for Event',
                                        events: {
                                            click: handleRegister
                                        }
                                    },
                                    {
                                        t: 'button',
                                        cn: ['bg-gray-200', 'text-gray-700', 'px-8', 'py-3', 'rounded-lg', 'font-semibold', 'hover:bg-gray-300', 'transition'],
                                        txt: 'Back to Events',
                                        events: {
                                            click: () => window.location.href = '/events'
                                        }
                                    }
                                ]
                            }
                        ].filter(Boolean)
                    }
                ]
            }
        ]
    })
}
