import { remote, app } from "electron";

export const userDataPaths = {
    CONTEXT: `context`
}

export const basePath = () => {
    return (app || remote.app).getPath('userData');
}