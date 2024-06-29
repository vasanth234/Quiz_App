import React, { useState, useEffect, useCallback } from 'react';

const Time = ({ setStop,questionset}) => {
    const [time, setTime] = useState(30);

    const decrementTime = useCallback(() => {
        setTime(prev => {
            if (prev > 0) {
                return prev - 1;
            } else {
                setStop(true);
                clearInterval(intervalRef.current);
                return prev;
            }
        });
    }, []);

    const intervalRef = React.useRef(null);

    useEffect(() => {
        intervalRef.current = setInterval(decrementTime, 1000);

        return () => {
            clearInterval(intervalRef.current);
        };
    }, [decrementTime,setStop,time]);

    useEffect(()=>{
        setTime(30);
    },[questionset])

    return (
        <div>
            <h2 className='timer'>{time}</h2>
        </div>
    );
}

export default Time;
