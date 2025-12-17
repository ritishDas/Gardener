import { fetchElement, appendElement } from "./gardener.js";
import EventForm from "./components/EventForm.js";

const formContainer = fetchElement('#event-form-container');

// Simple user ID storage (in real app, this would be from auth)
let currentUserId = localStorage.getItem('current_user_id');

if (!currentUserId) {
    const demoUserId = prompt('Enter your user ID to create events:');
    if (!demoUserId) {
        alert('User ID is required to create events');
        window.location.href = '/events';
    } else {
        localStorage.setItem('current_user_id', demoUserId);
        currentUserId = demoUserId;
    }
}

async function handleFormSubmit(formData) {
    const submitBtn = fetchElement('#submit-btn');
    submitBtn.disabled = true;
    submitBtn.innerText = 'Creating...';

    try {
        // Add owner_id to form data
        formData.owner_id = currentUserId;

        const response = await fetch('/api/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (data.success) {
            alert('Event created successfully!');
            window.location.href = `/events/${data.event.id}`;
        } else {
            alert('Failed to create event: ' + data.error);
            submitBtn.disabled = false;
            submitBtn.innerText = 'Create Event';
        }
    } catch (error) {
        console.error('Error creating event:', error);
        alert('Failed to create event');
        submitBtn.disabled = false;
        submitBtn.innerText = 'Create Event';
    }
}

// Render the form
appendElement(formContainer, EventForm(handleFormSubmit));
