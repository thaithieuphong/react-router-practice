import { useLoaderData, Await } from 'react-router-dom';

import EventsList from '../components/EventsList';
import { Suspense } from 'react';

function EventsPage() {

    const { events } = useLoaderData()

    return (
        <>
            <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
                <Await resolve={events}>
                    {(events) => <EventsList events={events} />}
                </Await>
            </Suspense>
        </>
    );
}

export default EventsPage;

const LoadEvents = async () => {
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {
        throw new Response(JSON.stringify({ message: "Day la loi khi tao 1 response" }), { status: 500 })
    } else {
        const resData = await response.json()
        return resData.events
    }
}

export const Loader = () => {
    return {
        events: LoadEvents()
    }
}