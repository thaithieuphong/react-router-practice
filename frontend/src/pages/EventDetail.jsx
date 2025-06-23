import { redirect, useRouteLoaderData } from "react-router-dom"

import EventItem from '../components/EventItem'

export default function EventDetail() {
    // const params = useParams()
    const data = useRouteLoaderData('event-detail')
    const event = data.event
    return (
        <EventItem event={event} />
    )
}

export async function LoadEventDetail({ params }) {
    const id = params.id
    const response = await fetch(`http://localhost:8080/events/${id}`)
    
    if (!response.ok) {
        throw new Error(JSON.stringify({ message: 'Khong tim thay thong tin su kien' }), { status: 400 })
    } else {
        return response
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