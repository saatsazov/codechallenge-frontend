import type { ApiInterface, Schedule } from "./Api";

import { mapSessions } from './RemoteApi'

import fakeResponse from './fakeresponse.json';

export default class FakeApi implements ApiInterface {
    async getSchedule(): Promise<Schedule> {
        const items = mapSessions(fakeResponse.items)
        return Promise.resolve({ items: items })
    }
}