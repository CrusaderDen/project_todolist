import React, {useEffect, useState} from 'react';
import s from './Clock.module.css'

export const Clock = () => {
    let [time, setTime] = useState(new Date())

    useEffect(() => {
        const id = setInterval(() => {
            setTime(new Date())
        }, 1000)
        return () => {
            clearInterval(id)
        }
    }, [])

    const getTwoDigitString = (time: number) => time < 10 ? '0' + time : time

    return (
        <div className={s.clockWrapper}>
            <time className={s.clock}>{`${getTwoDigitString(time.getHours())} : ${getTwoDigitString(time.getMinutes())} : ${getTwoDigitString(time.getSeconds())}
            `}</time>
        </div>
    );
};