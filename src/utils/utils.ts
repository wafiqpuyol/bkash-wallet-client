import dayjs from "dayjs";
import { IHeartbeat } from '@/interfaces/monitor';

export const getLocalStorageItem = (key: string) => {
    const data = window.localStorage.getItem(key) as string;
    return JSON.parse(data);
};

export const setLocalStorageItem = (key: string, value: string): void => {
    window.localStorage.setItem(key, value);
};

export const convertFrequency = (frequency: number): string => {
    const hours = frequency / (60 * 60);
    const minutes = frequency / 60;
    if (hours > 1) {
        return `${hours} hours`;
    }
    if (minutes > 1 && minutes <= 59) {
        return `${minutes} mins`;
    }
    return `${frequency}s`
}

export const timeFromNow = (date: string) => {
    if (date === 'null') {
        return 'None';
    }
    return dayjs(new Date(JSON.parse(date))).fromNow();
}

export const uptimePercentage = (heartbeats: IHeartbeat[]): number => {
    if (!heartbeats) {
        return 0;
    }
    const totalHeartbeats: number = heartbeats.length;
    const downtimeHeartbeats: number = heartbeats.filter((heartbeat: IHeartbeat) => heartbeat.status === 1).length;
    return Math.round(((totalHeartbeats - downtimeHeartbeats) / totalHeartbeats) * 100) || 0;
};