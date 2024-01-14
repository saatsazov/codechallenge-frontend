import type { ApiInterface, Schedule } from "./Api";

export default class FakeApi implements ApiInterface {
    async getSchedule(): Promise<Schedule> {
        // throw new Error("Method not implemented.");
        return Promise.resolve({ Items: [] })
    }
}