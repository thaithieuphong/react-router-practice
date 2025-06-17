import { useLoaderData } from "react-router-dom"

import EventItem from '../components/EventItem'

export default function EventDetail() {
    // const params = useParams()
    const data = useLoaderData()
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