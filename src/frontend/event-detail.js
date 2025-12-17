import { fetchElement, appendElement } from "./gardener.js";
import EventDetail from "./components/EventDetail.js";

const eventDetailContainer = fetchElement('#event-detail-container');
const loadingDiv = fetchElement('#loading');

// Get event ID from URL
const pathParts = window.location.pathname.split('/');
const eventId = pathParts[pathParts.length - 1];

// Simple user ID storage (in real app, this would be from auth)
let currentUserId = localStorage.getItem('current_user_id');

if (!currentUserId) {
    // For demo purposes, create a random user ID
    // In production, this would come from authentication
    const demoUserId = prompt('Enter your user ID (or leave blank to browse only):');
    if (demoUserId) {
        localStorage.setItem('current_user_id', demoUserId);
        currentUserId = demoUserId;
    }
}

// Fetch and display event details
async function loadEventDetail() {
    try {
        const response = await fetch(`/api/events/${eventId}`);
        const data = await response.json();

        if (data.success) {
            loadingDiv.classList.add('hidden');
            appendElement(eventDetailContainer, EventDetail(data.event, currentUserId));
        } else {
            loadingDiv.innerHTML = `<p class="text-red-500">Error: ${data.error}</p>`;
        }
    } catch (error) {
        console.error('Error loading event:', error);
        loadingDiv.innerHTML = '<p class="text-red-500">Failed to load event details</p>';
    }
}

// Load event on page load
loadEventDetail();
