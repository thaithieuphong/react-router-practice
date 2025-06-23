import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Home from './pages/Home'
import Events, { LoadEvents } from './pages/Events'
import EventDetail, { LoadEventDetail, DeleteEventAction } from './pages/EventDetail'
import NewEvent, { AddNewEventAction } from './pages/NewEvent'
import EditEvent from './pages/EditEvent'
import Layout from './pages/Layout'
import EventRootLayout from './pages/EventRootLayout'
import ErrorPage from './pages/Error'

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <Layout />,
            errorElement: <ErrorPage />,
            children: [
                {
                    index: true,
                    element: <Home />
                },
                {
                    path: 'events',
                    element: <EventRootLayout />,
                    children: [
                        {
                            index: true,
                            element: <Events />,
                            loader: LoadEvents,
                            errorElement: <ErrorPage />
                        },
                        {
                            path: ':id',
                            id: 'event-detail',
                            loader: LoadEventDetail,
                            children: [
                                {
                                    index: true,
                                    element: <EventDetail />,
                                    action: DeleteEventAction
                                },
                                {
                                    path: 'edit',
                                    element: <EditEvent />
                                },
                            ],
                        },
                        {
                            path: 'new',
                            element: <NewEvent />,
                            action: AddNewEventAction
                        },
                    ]
                },
            ]
        },
    ]
)

function App() {
	return <RouterProvider router={router} />
}

export default App
