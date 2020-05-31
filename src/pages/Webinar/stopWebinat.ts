import {socket} from "./Webinar";

export const stopWebinar = () => {
    const video = <HTMLVideoElement>document.querySelector('#local-video');
    const stream = <MediaStream>video.srcObject;
    stream.getTracks().forEach(track => track.stop());

    window.location.reload();
}

export const leavePage = () => {
    const video = <HTMLVideoElement>document.querySelector('#local-video');
    const stream = <MediaStream>video.srcObject;
    stream.getTracks().forEach(track => track.stop());
    socket.emit('stop_webinar', '');
}