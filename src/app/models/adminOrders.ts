import { Status } from "./status"

export type Order = {
    id: number,
    date: string,
    user: string,
    status: Status
}
