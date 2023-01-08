import axios from "axios";
import Vacation from "../Model/vacation-model";


export const setList = (vList: Vacation[], followedV:number[] ) => {
    return { type: "UPDATE_LIST", vList, followedV }
};

export const setAdmin = () => {
    return { type: "ADMIN" }
};

export const setUser = () => {
    return { type: "USER" }
};

export const followV = (vId: number) => {
    return { type: "FOLLOW", vId}
};

export const unFollowV = (vId: number) => {
    return { type: "UNFOLLOW", vId }
};

export const setFollow = (followedVacations: any) => {
    return { type: "SETFOLLOW", followedVacations }
};

export const setName = (username: string) => {
    return { type: "NAME", username }
};