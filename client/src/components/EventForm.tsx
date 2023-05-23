import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import {Button, DatePicker, Form, Input, Row, theme} from "antd";
import {rules} from "../utils/rules";
import {IEvent} from "../models/IEvent";
import {IUser} from "../models/IUser";
import dayjs, {Dayjs} from "dayjs";
import {formateDate, formateDateInRUDate, formateDateStringInRUDate, getDateTime} from "../utils/date";
import ErrorMessage from "./ErrorMessage";
import TextArea from "antd/es/input/TextArea";
import {useTypedSelector} from "../hooks/useTypedSelector";
const { RangePicker } = DatePicker;
export const dateFormat = 'YYYY/MM/DD HH:mm:ss';

interface EventFormProps{
    submit: (event: IEvent) => void,
    user: IUser;
    events: IEvent[];
    type: 'add' | 'change' | 'info' | 'delete';
    event?: IEvent;
    uniqueKey?:string;
    setModalVisible?:Dispatch<SetStateAction<boolean>>;
    defaultDate?: Dayjs[] | null;
}

const EventForm:FC<EventFormProps> = (props) => {
    const {darkTheme} = useTypedSelector(state => state.auth)

    const [newEvent, setNewEvent] = useState<IEvent>({
        _id: props.event?._id,
        header: props.event?.header,
        email: props.user.email,
        endDate: props.event?.endDate || "",
        startDate: props.event?.startDate || "",
        endTime: props.event?.endTime || "",
        startTime: props.event?.startTime || "",
        description: props.event?.description || ""
    } as IEvent)

    const [isError, setIsError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage]= useState<string>('')
    const submitForm = () => {
        props.submit({...newEvent})
    }
    useEffect(() => {
        setIsError(false)
        setErrorMessage('')
    }, [props.uniqueKey])
    const onRangeChange = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
        setIsError(false)
        setErrorMessage("")
        if (dateStrings) {
            const startDate = dateStrings[0].split(' ')[0].replaceAll('/', '.')
            const startTime = dateStrings[0].split(' ')[1]
            const endDate = dateStrings[1].split(' ')[0].replaceAll('/', '.')
            const endTime = dateStrings[1].split(' ')[1]
            setNewEvent({...newEvent, startDate, startTime, endDate, endTime})
        }
    };

    const rangePickerValidation = (value: any) => {
        if (value[0] && value[1]) {
            const dateNow = dayjs().toDate()
            const datepickerForm = value[0].toDate();
            const datepickerTo = value[1].toDate();
            const dateNowString = formateDate(dateNow) + getDateTime(dateNow);
            const datepickerFromString = formateDate(datepickerForm) + getDateTime(datepickerForm);
            const datepickerToString = formateDate(datepickerTo) + getDateTime(datepickerTo);
            if (dateNowString > datepickerFromString || dateNowString > datepickerToString) {
                setIsError(true)
                setErrorMessage("нельзя создать событие на прошедшую дату")
            }
            for (let i = 0; i < props.events.length; i++) {
                if (props.events[i].startDate + props.events[i].startTime === datepickerFromString ||
                    props.events[i].endDate + props.events[i].endTime === datepickerToString) {
                    if (!(props.type === 'change' && props.events[i] === props.event)){
                        if (!isError) {
                            setIsError(true)
                            setErrorMessage("на одной из дат уже есть событие")
                        }
                    }
                }
            }
        }
    }
    if (props.type === 'delete'){
        return (
            <Form
                key={props.event?._id + (props.uniqueKey || '') + 'delete'}
                onFinish={submitForm}>
                <Form.Item>
                    <div>
                        Вы действительно хотите удалить событие?
                    </div>
                </Form.Item>
                <Row justify={'end'}>
                    <Button htmlType={'submit'} danger>
                        Подтвердить
                    </Button>
                </Row>
            </Form>
        )
    }

    return (
        <Form
            key={props.event?._id + (props.uniqueKey || '')}
            onFinish={submitForm}
        >
            <Form.Item
                style={{marginTop:25}}
                name={'header' + props.type}
                initialValue={props.type === 'add' ? '' : props.event?.header}
                rules={[rules.required()]}
            >
                {props.type === 'info'
                    ?
                    <div>
                        {props.event?.header}{' ('}
                        {formateDateStringInRUDate(props.event?.startDate)}{' '}
                        {props.event?.startTime}{' -> '}
                        {formateDateStringInRUDate(props.event?.endDate)}{' '}
                        {props.event?.endTime}{') '}
                    </div>
                    :
                    <Input
                        onChange={e => setNewEvent({...newEvent, header: e.target.value})}
                        value={newEvent.header}
                        placeholder="Заголовок события"
                        type="text"
                    />
                }
            </Form.Item>
            {(props.type === 'info' && props.event?.description ||  props.type !== 'info') &&
            <Form.Item
                style={{marginTop:25}}
                name={'description' + props.type}
                initialValue={props.type === 'add' ? '' : props.event?.description}
            >
                {props.type === 'info'
                ?
                    props.event?.description &&
                    <div
                        style={{
                            color: darkTheme ? 'white' : 'black',
                            cursor: 'text',
                            backgroundColor:  'transparent',
                            border: '0px',
                        }}
                    >
                        {props.event?.description}
                    </div>
                :
                    <TextArea
                        rows={4}
                        onChange={e => setNewEvent({...newEvent, description: e.target.value})}
                        value={newEvent.description}
                        placeholder="Описание события"
                        style={{height: '135px'}}
                    />
                }
            </Form.Item>
            }
            <ErrorMessage
                isError={isError}
                errorMessage={errorMessage}
                style={{color: 'red',}}
            />
            {props.type !== 'info' &&
            <Form.Item
                name="date"
                initialValue={props.defaultDate}
                rules={[
                    rules.required(),
                    // rules.isDateAfter(),
                    // rules.isNewDate(props.events, props.type, props.event)
                ]}
            >
                    <RangePicker
                        showTime
                        format={dateFormat}
                        onChange={onRangeChange}
                        // renderExtraFooter={() => <div>Привет</div>}
                        onOk={rangePickerValidation}
                    />
            </Form.Item>
            }
            <Form.Item>
                <Row justify="end">
                    {props.type === 'info'
                        ?
                        <Button
                            type="primary"
                            onClick={() => {
                                if (props.setModalVisible){
                                    return props.setModalVisible(false)
                                }}}
                        >
                            Закрыть
                        </Button>
                        :
                        <Button type="primary" disabled={isError} htmlType={'submit'}>
                            {props.type === 'add' && 'Создать'}
                            {props.type === 'change' && 'Изменить'}
                        </Button>
                    }
                </Row>
            </Form.Item>
        </Form>
    );
};

export default EventForm;