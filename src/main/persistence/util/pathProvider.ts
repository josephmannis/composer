import { remote, app } from "electron";

const base =  (app || remote.app).getPath('userData')

export const userDataPaths = {
    BASE: base,
    CONTEXT: `${base}/context`
}