import type { ApiInterface, Schedule, Session } from "./Api";

interface Response {
    name: string
    session_start: string,
    session_end: string | null,
}

export default class RemoteApi implements ApiInterface {
    constructor(
        private baseUrl: string,
    ) {
    }

    async getSchedule(): Promise<Schedule> {
        const response = await fetch(this.baseUrl + '/schedule')

        const data: Array<Response> = (await response.json()).items
        console.log(data)
        /*
name	"Mission"
session_key	"57"
session_start	"2019-01-25T15:00:00.000000Z"
session_end	"2019-01-25T16:00:00.000000Z"
session_type	"Physical Training [BRONZE]"
session_subtype	""
         */


        // todo: for now cast here. Later some mapper needed. Single place to control entities
        // todo: check date parsing. Not sure it's time-zone correct 

        const items: Array<Session> = data.map(i => ({
            name: i.name,
            session_start: new Date(i.session_start),
            session_end: i.session_end == null ? null : new Date(i.session_end),
            participants: [],
        }))

        return Promise.resolve({ items: items })
    }
}