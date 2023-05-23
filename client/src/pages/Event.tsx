import React, {FC, useEffect} from 'react';
import {useTypedSelector} from "../hooks/useTypedSelector";
import EmailActivate from "./EmailActivate";
import EventCalendar from "../components/EventCalendar";
import {Layout} from "antd";
import {EventActionCreators} from "../store/reducers/event/action-creators";
import {useDispatch} from "react-redux";
import Loader from "../components/Loader";

const Event:FC = () => {
    const {user} = useTypedSelector(state => state.auth)
    const {isEventLoading,events} = useTypedSelector(state => state.event)
    const dispatch = useDispatch();

    useEffect(() => {
        EventActionCreators.fetchEvents(user.email)(dispatch)
    }, [])

    return (
        <Layout>
            {isEventLoading
            ?
                <Loader/>
            :
            user.isActivated
                ?
                    <EventCalendar
                        events={events}
                        email={user.email}
                    />
                :
                <EmailActivate/>
            }
        </Layout>
    );
};

export default Event;