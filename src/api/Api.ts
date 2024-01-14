import FakeApi from "./FakeApi";

export interface Participant {
    name: string,
    roles: Array<string>,
}

export interface Session {
    name: string,
    time_start: Date,
    time_end?: Date,
    participants: Array<Participant>,
}

export interface Schedule {
    Items: Array<Session>
}

export interface ApiInterface {
    getSchedule(): Promise<Schedule>
}

const fakeInstance = new FakeApi();

export default function api(): ApiInterface {
    return fakeInstance
}