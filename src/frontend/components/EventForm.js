
import { gardener } from '../gardener.js'

export default function EventForm(onSubmit) {

    function handleSubmit(e) {
        e.preventDefault();

        const formData = {
            name: fetchElement('#event-name').value,
            poster: fetchElement('#event-poster').value || null,
            event_date: fetchElement('#event-date').value,
            venue: fetchElement('#event-venue').value || null,
            details_md: fetchElement('#event-details').value || null,
            fee: parseFloat(fetchElement('#event-fee').value) || 0,
            fee_type: fetchElement('#fee-type').value,
            min_team_size: parseInt(fetchElement('#min-team-size').value) || null,
            max_team_size: parseInt(fetchElement('#max-team-size').value) || null,
            tags: fetchElement('#event-tags').value
                .split(',')
                .map(tag => tag.trim())
                .filter(tag => tag.length > 0)
        };

        onSubmit(formData);
    }

    function fetchElement(selector) {
        return document.querySelector(selector);
    }

    return gardener({
        t: 'form',
        cn: ['bg-white', 'p-8', 'rounded-lg', 'shadow-lg'],
        events: {
            submit: handleSubmit
        },
        children: [
            {
                t: 'div',
                cn: ['mb-6'],
                children: [
                    {
                        t: 'label',
                        cn: ['block', 'text-gray-700', 'font-semibold', 'mb-2'],
                        attr: { for: 'event-name' },
                        txt: 'Event Name *'
                    },
                    {
                        t: 'input',
                        cn: ['w-full', 'p-3', 'border', 'border-gray-300', 'rounded-lg', 'focus:outline-none', 'focus:ring-2', 'focus:ring-blue-500'],
                        attr: {
                            type: 'text',
                            id: 'event-name',
                            required: 'true',
                            placeholder: 'Enter event name'
                        }
                    }
                ]
            },
            {
                t: 'div',
                cn: ['mb-6'],
                children: [
                    {
                        t: 'label',
                        cn: ['block', 'text-gray-700', 'font-semibold', 'mb-2'],
                        attr: { for: 'event-poster' },
                        txt: 'Poster Image URL'
                    },
                    {
                        t: 'input',
                        cn: ['w-full', 'p-3', 'border', 'border-gray-300', 'rounded-lg', 'focus:outline-none', 'focus:ring-2', 'focus:ring-blue-500'],
                        attr: {
                            type: 'url',
                            id: 'event-poster',
                            placeholder: 'https://example.com/poster.jpg'
                        }
                    }
                ]
            },
            {
                t: 'div',
                cn: ['mb-6'],
                children: [
                    {
                        t: 'label',
                        cn: ['block', 'text-gray-700', 'font-semibold', 'mb-2'],
                        attr: { for: 'event-date' },
                        txt: 'Event Date & Time *'
                    },
                    {
                        t: 'input',
                        cn: ['w-full', 'p-3', 'border', 'border-gray-300', 'rounded-lg', 'focus:outline-none', 'focus:ring-2', 'focus:ring-blue-500'],
                        attr: {
                            type: 'datetime-local',
                            id: 'event-date',
                            required: 'true'
                        }
                    }
                ]
            },
            {
                t: 'div',
                cn: ['mb-6'],
                children: [
                    {
                        t: 'label',
                        cn: ['block', 'text-gray-700', 'font-semibold', 'mb-2'],
                        attr: { for: 'event-venue' },
                        txt: 'Venue'
                    },
                    {
                        t: 'input',
                        cn: ['w-full', 'p-3', 'border', 'border-gray-300', 'rounded-lg', 'focus:outline-none', 'focus:ring-2', 'focus:ring-blue-500'],
                        attr: {
                            type: 'text',
                            id: 'event-venue',
                            placeholder: 'Enter event venue'
                        }
                    }
                ]
            },
            {
                t: 'div',
                cn: ['mb-6'],
                children: [
                    {
                        t: 'label',
                        cn: ['block', 'text-gray-700', 'font-semibold', 'mb-2'],
                        attr: { for: 'event-details' },
                        txt: 'Event Details'
                    },
                    {
                        t: 'textarea',
                        cn: ['w-full', 'p-3', 'border', 'border-gray-300', 'rounded-lg', 'focus:outline-none', 'focus:ring-2', 'focus:ring-blue-500', 'h-32'],
                        attr: {
                            id: 'event-details',
                            placeholder: 'Describe your event...'
                        }
                    }
                ]
            },
            {
                t: 'div',
                cn: ['grid', 'grid-cols-2', 'gap-4', 'mb-6'],
                children: [
                    {
                        t: 'div',
                        children: [
                            {
                                t: 'label',
                                cn: ['block', 'text-gray-700', 'font-semibold', 'mb-2'],
                                attr: { for: 'event-fee' },
                                txt: 'Registration Fee *'
                            },
                            {
                                t: 'input',
                                cn: ['w-full', 'p-3', 'border', 'border-gray-300', 'rounded-lg', 'focus:outline-none', 'focus:ring-2', 'focus:ring-blue-500'],
                                attr: {
                                    type: 'number',
                                    id: 'event-fee',
                                    min: '0',
                                    step: '0.01',
                                    required: 'true',
                                    placeholder: '0.00'
                                }
                            }
                        ]
                    },
                    {
                        t: 'div',
                        children: [
                            {
                                t: 'label',
                                cn: ['block', 'text-gray-700', 'font-semibold', 'mb-2'],
                                attr: { for: 'fee-type' },
                                txt: 'Fee Type *'
                            },
                            {
                                t: 'select',
                                cn: ['w-full', 'p-3', 'border', 'border-gray-300', 'rounded-lg', 'focus:outline-none', 'focus:ring-2', 'focus:ring-blue-500'],
                                attr: {
                                    id: 'fee-type',
                                    required: 'true'
                                },
                                children: [
                                    {
                                        t: 'option',
                                        attr: { value: 'perperson' },
                                        txt: 'Per Person'
                                    },
                                    {
                                        t: 'option',
                                        attr: { value: 'perteam' },
                                        txt: 'Per Team'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                t: 'div',
                cn: ['mb-6', 'p-4', 'bg-gray-50', 'rounded-lg', 'border', 'border-gray-200'],
                children: [
                    {
                        t: 'h3',
                        cn: ['text-lg', 'font-semibold', 'mb-3', 'text-gray-700'],
                        txt: 'Team Configuration (Optional)'
                    },
                    {
                        t: 'div',
                        cn: ['grid', 'grid-cols-2', 'gap-4'],
                        children: [
                            {
                                t: 'div',
                                children: [
                                    {
                                        t: 'label',
                                        cn: ['block', 'text-gray-700', 'font-semibold', 'mb-2'],
                                        attr: { for: 'min-team-size' },
                                        txt: 'Min Team Size'
                                    },
                                    {
                                        t: 'input',
                                        cn: ['w-full', 'p-3', 'border', 'border-gray-300', 'rounded-lg', 'focus:outline-none', 'focus:ring-2', 'focus:ring-blue-500'],
                                        attr: {
                                            type: 'number',
                                            id: 'min-team-size',
                                            min: '1',
                                            placeholder: 'e.g., 2'
                                        }
                                    }
                                ]
                            },
                            {
                                t: 'div',
                                children: [
                                    {
                                        t: 'label',
                                        cn: ['block', 'text-gray-700', 'font-semibold', 'mb-2'],
                                        attr: { for: 'max-team-size' },
                                        txt: 'Max Team Size'
                                    },
                                    {
                                        t: 'input',
                                        cn: ['w-full', 'p-3', 'border', 'border-gray-300', 'rounded-lg', 'focus:outline-none', 'focus:ring-2', 'focus:ring-blue-500'],
                                        attr: {
                                            type: 'number',
                                            id: 'max-team-size',
                                            min: '1',
                                            placeholder: 'e.g., 5'
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                t: 'div',
                cn: ['mb-6'],
                children: [
                    {
                        t: 'label',
                        cn: ['block', 'text-gray-700', 'font-semibold', 'mb-2'],
                        attr: { for: 'event-tags' },
                        txt: 'Tags (comma-separated)'
                    },
                    {
                        t: 'input',
                        cn: ['w-full', 'p-3', 'border', 'border-gray-300', 'rounded-lg', 'focus:outline-none', 'focus:ring-2', 'focus:ring-blue-500'],
                        attr: {
                            type: 'text',
                            id: 'event-tags',
                            placeholder: 'e.g., tech, workshop, hackathon'
                        }
                    }
                ]
            },
            {
                t: 'div',
                cn: ['flex', 'gap-4'],
                children: [
                    {
                        t: 'button',
                        cn: ['bg-blue-600', 'text-white', 'px-8', 'py-3', 'rounded-lg', 'font-semibold', 'hover:bg-blue-700', 'transition', 'flex-1'],
                        attr: {
                            type: 'submit',
                            id: 'submit-btn'
                        },
                        txt: 'Create Event'
                    },
                    {
                        t: 'button',
                        cn: ['bg-gray-200', 'text-gray-700', 'px-8', 'py-3', 'rounded-lg', 'font-semibold', 'hover:bg-gray-300', 'transition'],
                        attr: {
                            type: 'button'
                        },
                        txt: 'Cancel',
                        events: {
                            click: () => window.location.href = '/events'
                        }
                    }
                ]
            }
        ]
    })
}
