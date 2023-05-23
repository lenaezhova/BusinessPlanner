import {MONTHS} from "./consts";

export const formateDate = (date:Date): string => {
    const year = date.getFullYear();
    const month = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    return `${year}.${month}.${day}`
}

export const getDateTime = (date:Date): string => {
    return date.toString().split(' ')[4] || ''
}

export const formateDateInRUDate = (date:Date ): string => {
    const newDate = formateDate(date).split('.')
    const day = newDate[2].replace(/^0+/, '')
    const month = MONTHS[Number(newDate[1]) - 1]
    const year = newDate[0]
    return `${day} ${month} ${year}`
}

export const formateDateStringInRUDate = (date?:string ): string => {
    const newDate = (date || '').split('.')
    const day = newDate[2].replace(/^0+/, '')
    const month = MONTHS[Number(newDate[1]) - 1]
    const year = newDate[0]
    return `${day} ${month} ${year}`
}