import FakeApi from "./FakeApi";
import RemoteApi from "./RemoteApi";

const fakeInstance = new FakeApi();
const remoteInstance = new RemoteApi('http://127.0.0.1:8000/api');

export default function api(): ApiInterface {
    if (import.meta.env.DEV) {
        console.log("use remote api")
        return remoteInstance
    }

    console.log("use fake api")
    return fakeInstance
}

export interface Participant {
    name: string,
    role: string,
}

export interface Session {
    name: string,
    session_start: Date,
    session_end: Date | null,
    participants: Array<Participant>,
}

export interface Schedule {
    items: Array<Session>
}

export interface ApiInterface {
    getSchedule(): Promise<Schedule>
}
