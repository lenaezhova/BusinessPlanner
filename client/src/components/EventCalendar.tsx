import React, {FC, useEffect, useState} from 'react';
import {Badge, BadgeProps, Button, Calendar, Layout, Menu, MenuProps, Row, theme} from "antd";
import {IEvent} from "../models/IEvent";
import {formateDate, formateDateInRUDate} from "../utils/date";
import dayjs, {Dayjs} from "dayjs";
import {
    CalendarOutlined, CloseOutlined, InfoOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";
import {Content, Header} from "antd/es/layout/layout";
import EventModal from "./EventModal";
type MenuItem = Required<MenuProps>['items'][number];

interface EventCalendarProps{
    events:IEvent[];
    email: string;
}

const EventCalendar:FC<EventCalendarProps> = (props) => {
    const [modalVisible, setModalVisible] = useState(false)
    const [modalChangeVisible, setModalChangeVisible]= useState(false)
    const [modalDeleteVisible,setModalDeleteVisible]= useState(false)
    const [modalInfoVisible, setModalInfoVisible] = useState(false)
    const [date, setDate] = useState<Dayjs>(dayjs())
    const [collapsed, setCollapsed] = useState(true);
    const [items, setItems] = useState<MenuItem[]>([])
    const [currentEvent, setCurrentEvent] = useState<IEvent>({} as IEvent)
    const {token: {colorBgContainer}} = theme.useToken();
    useEffect(() => {
        let arr:MenuItem[] = []
        props.events.filter(ev => ev.startDate === formateDate(date.toDate()))
            .forEach((el) => {
            arr.push(
                {
                    key: el._id,
                    children: [
                        {
                            label:
                                <div onClick={()  => {
                                    setCurrentEvent(el)
                                    setModalChangeVisible(true)
                                }}>
                                    <div>
                                        <CalendarOutlined style={{
                                            marginRight: 15
                                        }}/>
                                        Изменить событие
                                    </div>
                            </div>,
                            key: 'change' + el._id
                        },
                        {
                            label:
                                <div onClick={() => {
                                    setCurrentEvent(el)
                                    setModalInfoVisible(true)
                                }}>
                                    <div>
                                        <InfoOutlined style={{
                                            marginRight: 15
                                        }}/>
                                        Посмотреть описание
                                    </div>
                                </div>,
                            key: 'info' + el._id,
                        },
                        {
                            label:
                                <div onClick={() => {
                                    setCurrentEvent(el)
                                    setModalDeleteVisible(true)
                                }}>
                                    <div>
                                        <CloseOutlined style={{
                                            marginRight: 15
                                        }}/>
                                        Удалить событие
                                    </div>
                                </div>,
                            key: 'delete' + el._id,
                            danger: true,
                        },
                    ],
                    label:
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'start',
                                    overflow:'hidden'
                                }}
                            >
                                {formateDateInRUDate(new Date(el.startDate))} {el.startTime}
                                {' - '}
                                {formateDateInRUDate(new Date(el.endDate))} {el.endTime}:
                                <div
                                    style={{
                                        overflow: 'hidden',
                                        marginLeft: 10
                                    }}
                                >
                                    {el.header}
                                </div>
                            </div>
                        </div>
                })
        })
        setItems(arr)
    }, [date, props.events])


    const onSelect = (newValue: Dayjs) => {
        if (newValue.toString() === date.toString()) {
            setCollapsed(prev => !prev);
        } else {
            setDate(newValue)
            setCollapsed(false);
        }
    };
    const cellRender = (value: Dayjs) => {
        const formatedDate = formateDate(value.toDate());
        const currentDayEvents = (props.events.filter(ev => {
            return ev.startDate === formatedDate;
        }).sort((a, b) => {
            if (a.startTime > b.startTime) { return 1; }
            if (a.startTime < b.startTime) { return -1; }
            if (a.startTime === b.startTime) {
                if (a.endTime > b.endTime) { return 1; }
                if (a.endTime < b.endTime) { return -1; }
            }
            return 0;
        }));
        return (
            <ul className="events">
                {currentDayEvents.map(ev =>
                    <li key={ev._id}>
                        <Badge status={'success' as BadgeProps['status']}
                               text={ev.header}
                        />
                    </li>)
                }
            </ul>
        );
    };

    return (
        <Layout>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                collapsedWidth="0"
                width={'500px'}
                style={{
                    overflow: 'auto',
                    overflowX: 'hidden',
                    height: '109.2vh',
                    background: colorBgContainer,
            }}
            >
                <div className="demo-logo-vertical" />
                <Header
                    style={{
                        display:'flex',
                        overflow: 'hidden',
                        justifyContent: 'center',
                        background: colorBgContainer,
                        fontSize:"19px",
                    }}
                >
                    {formateDateInRUDate(date.toDate())}
                </Header>
                <Menu
                        theme="light"
                        mode="inline"
                        items={items}
                    />
            </Sider>
            <Layout>
                <Header style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 0,
                    background: colorBgContainer,
                }}>
                    {/*<div>*/}
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'start'
                            }}
                        >
                            <Button
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                                onClick={() => setCollapsed(!collapsed)}
                                style={{fontSize: '16px', width: 64, height: 64}}
                            />
                        </div>
                        <EventModal
                            type='info'
                            modalVisible={modalInfoVisible}
                            setModalVisible={setModalInfoVisible}
                            events={props.events}
                            event={currentEvent}
                            showButton={false}
                            message={'Информация о событии'}
                        />
                        <EventModal
                            type='delete'
                            modalVisible={modalDeleteVisible}
                            setModalVisible={setModalDeleteVisible}
                            events={props.events}
                            event={currentEvent}
                            showButton={false}
                            message={'Удалить событие'}
                        />
                        <EventModal
                            type='change'
                            modalVisible={modalChangeVisible}
                            setModalVisible={setModalChangeVisible}
                            events={props.events}
                            event={currentEvent}
                            showButton={false}
                            message={'Изменить событие'}
                        />
                        <EventModal
                            type='add'
                            modalVisible={modalVisible}
                            setModalVisible={setModalVisible}
                            events={props.events}
                            style={{marginRight: '30px'}}
                            showButton={true}
                            message={'Добавить событие'}
                            event={currentEvent}
                        />
                    {/*</div>*/}
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        height: '100vh',
                        background: colorBgContainer,
                }}
                >
                    <Calendar
                        onSelect={onSelect}
                        cellRender={cellRender}
                    />
                </Content>
            </Layout>
        </Layout>

    );
};

export default EventCalendar;