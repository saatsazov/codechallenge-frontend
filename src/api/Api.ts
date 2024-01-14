import FakeApi from "./FakeApi";
import RemoteApi from "./RemoteApi";

const fakeInstance = new FakeApi();
const remoteInstance = new RemoteApi('http://127.0.0.1:8000/api');

export default function api(): ApiInterface {
    return remoteInstance
}

export interface Participant {
    name: string,
    roles: Array<string>,
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
