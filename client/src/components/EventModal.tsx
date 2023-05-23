import React, {CSSProperties, Dispatch, FC, SetStateAction, useEffect, useRef, useState} from 'react';
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {Button, Modal} from "antd";
import {IEvent} from "../models/IEvent";
import {EventActionCreators} from "../store/reducers/event/action-creators";
import Draggable, {DraggableData, DraggableEvent} from "react-draggable";
import EventForm, {dateFormat} from "./EventForm";
import dayjs, {Dayjs} from "dayjs";

export interface EventModalProps  {
    events: IEvent[];
    event: IEvent;
    showButton?: boolean;
    message?:  string;
    style?: CSSProperties;
    modalVisible:boolean;
    setModalVisible:Dispatch<SetStateAction<boolean>>;
    type: 'add' | 'change' | 'delete' | 'info';
}

const EventModal : FC<EventModalProps> = (props) => {
    const {user} = useTypedSelector(state => state.auth)
    const dispatch = useDispatch();
    const [disabled, setDisabled] = useState(true);
    const [bounds, setBounds] = useState({left: 0, top: 0, bottom: 0, right: 0});
    const draggleRef = useRef<HTMLDivElement>(null);

    const [uniqueKey, setUniqueKey] = useState<string>('')
    useEffect(() => {
        setUniqueKey('form' + dayjs())
    }, [props.modalVisible])

    const addNewEvent = async (event: IEvent) => {
        props.setModalVisible(false)
        await EventActionCreators.createEvent(event)(dispatch)
    }

    const changeEvent = async (event: IEvent) => {
        props.setModalVisible(false)
        await EventActionCreators.updateEvent(event.email, props.event, event)(dispatch)
    }

    const deleteEvent = async (event: IEvent) => {
        props.setModalVisible(false)
        await EventActionCreators.deleteEvent(props.event)(dispatch)
    }

    const onStart = (_event: DraggableEvent, uiData: DraggableData) => {
        const {clientWidth, clientHeight} = window.document.documentElement;
        const targetRect = draggleRef.current?.getBoundingClientRect();
        if (!targetRect) {
            return;
        }
        setBounds({
            left: -targetRect.left + uiData.x,
            right: clientWidth - (targetRect.right - uiData.x),
            top: -targetRect.top + uiData.y,
            bottom: clientHeight - (targetRect.bottom - uiData.y),
        });
    };
    return (
        <div style={props.style}>
            {props.showButton &&
                <Button onClick={() => props.setModalVisible(true)}>
                    {props.message}
                </Button>
            }
            <Modal
                title={
                    <div style={{width: '100%', cursor: 'move',}}
                        onMouseOver={() => {if (disabled) {setDisabled(false);}}}
                        onMouseOut={() => {setDisabled(true);}}
                    >
                        {props.message}
                    </div>
                }
                open={props.modalVisible}
                footer={null}
                onCancel={() => {
                    props.setModalVisible(false)
                    dispatch(EventActionCreators.setErrorEvent(''))
                }}
                modalRender={(modal) => (
                    <Draggable
                        disabled={disabled}
                        bounds={bounds}
                        onStart={(event, uiData) => onStart(event, uiData)}
                    >
                        <div ref={draggleRef}>{modal}</div>
                    </Draggable>
                )}
            >
                <EventForm
                    submit={event => {
                        if (props.type === 'change') {return changeEvent(event)}
                        if (props.type === 'delete') {return deleteEvent(event)}
                        return addNewEvent(event)
                    }}
                    user={user}
                    events={props.events}
                    type={props.type}
                    event={props.event}
                    setModalVisible={props.setModalVisible}
                    uniqueKey={uniqueKey}
                    defaultDate={
                        props.type !== 'add' && props.event.startDate
                            ?
                            [dayjs(`${props.event.startDate.replaceAll('.', '/')} ${props.event.startTime}`, dateFormat),
                                dayjs(`${props.event.endDate.replaceAll('.', '/')} ${props.event.endTime}`, dateFormat)]
                            : null
                    }
                />
            </Modal>
        </div>
    );
};

export default EventModal;