import type { ApiInterface, Schedule } from "./Api";

export default class FakeApi implements ApiInterface {
    getSchedule(): Promise<Schedule> {
        throw new Error("Method not implemented.");
    }
}