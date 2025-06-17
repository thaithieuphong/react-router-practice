import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Home from './pages/Home'
import Events, { LoadEvents } from './pages/Events'
import EventDetail, { LoadEventDetail } from './pages/EventDetail'
import NewEvent from './pages/NewEvent'
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
                            element: <EventDetail />,
                            loader: LoadEventDetail
                        },
                        {
                            path: 'new',
                            element: <NewEvent />
                        },
                        {
                            path: ':id/edit',
                            element: <EditEvent />
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
