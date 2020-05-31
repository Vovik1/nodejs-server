//import {socket} from "../../App";
import {socket} from "./Webinar";

export const peerUpdating = (peerConnection: any, userId: string) => {
    peerConnection.onicecandidate = (event:any) => {
        if (event.candidate) {
            socket.emit("candidate", userId, event.candidate);
        }
    };

    peerConnection
        .createOffer()
        .then((sdp: string) => peerConnection.setLocalDescription(sdp))
        .then(() => {
            socket.emit("make-offer", {
                offer: peerConnection.localDescription,
                to: userId
            });
        });
}