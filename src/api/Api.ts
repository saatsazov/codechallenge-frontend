import FakeApi from "./FakeApi";

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

const fakeInstance = new FakeApi();

export default function api(): ApiInterface {
    return fakeInstance
}