import { Await, redirect, useRouteLoaderData } from "react-router-dom"

import EventItem from '../components/EventItem'
import EventsList from "../components/EventsList"
import { Suspense } from "react"

export default function EventDetail() {
    // const params = useParams()
    const { event, events } = useRouteLoaderData('event-detail')

    return (
        <>
            <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
                <Await resolve={event}>
                    {(event) => <EventItem event={event} />}
                </Await>
            </Suspense>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <Await resolve={events}>
                    {(events) => <EventsList events={events} />}
                </Await>
            </Suspense>
        </>

    )
}

const LoadEvents = async () => {
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {
        throw new Response(JSON.stringify({ message: "Day la loi khi tao 1 response" }), { status: 500 })
    } else {
        const resData = await response.json()
        return resData.events
    }
}

const LoadEventDetail = async (id) => {

    const response = await fetch(`http://localhost:8080/events/${id}`)

    if (!response.ok) {
        throw new Error(JSON.stringify({ message: 'Khong tim thay thong tin su kien' }), { status: 400 })
    } else {
        const resData = await response.json()
        return resData.event
    }
}

export const LoaderEventDetail = async ({ params }) => {
    const id = params.id
    return {
        event: await LoadEventDetail(id),
        events: LoadEvents()
    }
}

export async function DeleteEventAction({ params, request }) {
    const id = params.id
    const response = await fetch(`http://localhost:8080/events/${id}`, {
        method: request.method
    })

    if (!response.ok) {
        throw new Error(JSON.stringify({ message: 'Khong the xoa su kien' }), { status: 400 })
    }

    return redirect('/events')
}