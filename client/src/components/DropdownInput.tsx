import React, {CSSProperties, FC, useEffect, useState} from 'react';
import {IEvent} from "../models/IEvent";
import {Select} from "antd";

interface DropdownInputProps {
    events: IEvent[];
    style?: CSSProperties;
}

const handleChange = (value: string) => {
};

const DropdownInput:FC<DropdownInputProps> = (props) => {
    const [search, setSearch] = useState<string>('')
    const [filterEvents, setFilterEvents] = useState<IEvent[]>([])
    useEffect(() => {
        setFilterEvents(props.events.filter(event => event.description.toLowerCase().includes(search.toLowerCase())))
    }, [search])

    return (
        <Select
            placeholder={'Поиск мероприятия по описанию'}
            showSearch
            value={search}
            style={props.style}
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            onSearch={e => setSearch(e)}
            notFoundContent={null}
            options={filterEvents.map((ev) => ({
                value: ev.description,
                label: ev.description,
            }))}
        />
    );
};

export default DropdownInput;