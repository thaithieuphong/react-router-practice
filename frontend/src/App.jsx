import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Home from './pages/Home'
import Events, { Loader } from './pages/Events'
import EventDetail, { LoaderEventDetail, DeleteEventAction } from './pages/EventDetail'
import NewEvent from './pages/NewEvent'
import EditEvent from './pages/EditEvent'
import Layout from './pages/Layout'
import EventRootLayout from './pages/EventRootLayout'
import ErrorPage from './pages/Error'
import { AddNewEventAction as manipulateEventAction } from './components/EventForm'
import Newsletter, { action as newsletterAction } from './pages/Newsletter'

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
                            loader: Loader,
                            errorElement: <ErrorPage />
                        },
                        {
                            path: ':id',
                            id: 'event-detail',
                            loader: LoaderEventDetail,
                            children: [
                                {
                                    index: true,
                                    element: <EventDetail />,
                                    action: DeleteEventAction
                                },
                                {
                                    path: 'edit',
                                    element: <EditEvent />,
                                    action: manipulateEventAction
                                },
                            ],
                        },
                        {
                            path: 'new',
                            element: <NewEvent />,
                            action: manipulateEventAction
                        },
                    ]
                },
                {
                    path: 'newsletter',
                    element: <Newsletter />,
                    action: newsletterAction
                }
            ]
        },
    ]
)

function App() {
	return <RouterProvider router={router} />
}

export default App
