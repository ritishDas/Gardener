import { fetchElement, appendElement, replaceElement } from "./gardener.js";
import EventList from "./components/EventList.js";

const eventsContainer = fetchElement('#events-container');
const loadingDiv = fetchElement('#loading');
const noEventsDiv = fetchElement('#no-events');
const searchInput = fetchElement('#search-input');

let allEvents = [];

// Fetch and display events
async function loadEvents() {
    try {
        loadingDiv.classList.remove('hidden');
        eventsContainer.innerHTML = '';

        const response = await fetch('/api/events');
        const data = await response.json();

        if (data.success) {
            allEvents = data.events;
            displayEvents(allEvents);
        } else {
            console.error('Failed to load events:', data.error);
            noEventsDiv.classList.remove('hidden');
        }
    } catch (error) {
        console.error('Error loading events:', error);
        noEventsDiv.classList.remove('hidden');
    } finally {
        loadingDiv.classList.add('hidden');
    }
}

function displayEvents(events) {
    eventsContainer.innerHTML = '';

    if (events.length === 0) {
        noEventsDiv.classList.remove('hidden');
        return;
    }

    noEventsDiv.classList.add('hidden');
    appendElement(eventsContainer, EventList(events));
}

// Search functionality
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();

    const filteredEvents = allEvents.filter(event => {
        const nameMatch = event.name.toLowerCase().includes(searchTerm);
        const venueMatch = event.venue && event.venue.toLowerCase().includes(searchTerm);
        const tagMatch = event.tags && event.tags.some(tag =>
            tag && tag.toLowerCase().includes(searchTerm)
        );

        return nameMatch || venueMatch || tagMatch;
    });

    displayEvents(filteredEvents);
});

// Load events on page load
loadEvents();
