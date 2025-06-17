import { useLoaderData } from 'react-router-dom';

import EventsList from '../components/EventsList';

function EventsPage() {

    const data = useLoaderData()
    if (data.isError) {
        return 
    }

    const events = data.events

    return (
        <>
            <EventsList events={events} />
        </>
    );
}

export default EventsPage;

export const LoadEvents = async () => {
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {
        throw new Response(JSON.stringify({ message: "Day la loi khi tao 1 response" }), { status: 500 })
    } else {
        return response
    }
}