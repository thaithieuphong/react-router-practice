import { useRouteError } from "react-router-dom";
import PageContent from "../components/PageContent";
import MainNavigation from "../components/MainNavigation";

export default function ErrorPage() {

    const eventsError = useRouteError()

    let title = 'Day la loi aaa'
    let message = 'Co gi do khong dung o day aaaa'

    if (eventsError.status === 500) {
        message = JSON.parse(eventsError.data).message
    }

    if (eventsError.status === 404) {
        title = 'Khong tim thay trang'
        message = 'Chung toi khong tim thay trang ban dang truy cap'
    }
    return (
        <>
            <MainNavigation/>
            <PageContent title={title} >
                <p>{message}</p>
            </PageContent>
        </>
    )
}