import type { ApiInterface, Schedule, Session } from "./Api";

interface User {
    id: number;
    username: string;
    joined: string;
    name: string;
    email: string;
    url: string;
    about: string;
    avatar: string;
}

interface Participant {
    userid: number;
    sessionid: string;
    updated: string;
    usertype: string;
    user: User;
}
interface Response {
    name: string
    session_start: string,
    session_end: string | null,
    speakers: Array<Participant>
}

export function mapSessions(response: Array<any>): Array<Session> {
    const data: Array<Response> = response

    // todo: for now cast here. Later some mapper needed. Single place to control entities
    // todo: check date parsing. Not sure it's time-zone correct 

    const items: Array<Session> = data.map(i => ({
        name: i.name,
        session_start: new Date(i.session_start),
        session_end: i.session_end == null ? null : new Date(i.session_end),
        participants: i.speakers.map(p => ({
            name: p.user.name,
            role: p.usertype,
        }))
    }))

    return items
}


export default class RemoteApi implements ApiInterface {
    constructor(
        private baseUrl: string,
    ) {
    }

    async getSchedule(): Promise<Schedule> {
        const response = await fetch(this.baseUrl + '/schedule')

        const data: Array<Response> = (await response.json()).items

        const items = mapSessions(data)

        return Promise.resolve({ items: items })
    }
}