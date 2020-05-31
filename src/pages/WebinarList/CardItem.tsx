import React, {useEffect} from 'react';
//import {Card} from 'semantic-ui-react';
import styles from './WebinarsList.module.css';
import LiveImg from "../../assets/images/liveStatus.png";
import {useHistory} from "react-router-dom";
import {socket} from "./WebinarList";

interface CardProps {
    webinarName: string,
    usersOnline: number,
    firstName: string,
    surName: string,
    id: string,
}

interface Props {
    item: CardProps
}

export default function (props: Props) {

    const history = useHistory();

    const {webinarName, firstName, surName, id, usersOnline} = props.item;

    useEffect(() => {
        socket.on('update_online_users', (data:{id: string, usersOnline:number}) => {
            const el = document.querySelector(`a[data-key="${data.id}"] span`) as HTMLElement;
            el.innerText=String(data.usersOnline);
        })

        return () => {
            socket.off('update_online_users');
        }

    });

    const goToWebinar = (webinarId: string) => {
        const path = `/webinar/${webinarId}`;
        history.push(path);
    }


    return (
        <div className="card" id={styles.cards} onClick={(event: React.MouseEvent<HTMLElement>) => goToWebinar(id)}>
            <div className="image">
                <img
                    src="https://c1.sfdcstatic.com/content/dam/blogs/ca/Blog%20Posts/Go-Live-with-a-Webinar-to-Close-the-Sale-opengraph.png"></img>
            </div>
            <div className={styles.content}>
                <div className="header" id={styles.headerTitle}>{webinarName}</div>
                <div className="meta">
                    <p>{`By ${firstName} ${surName}`} </p>
                </div>
            </div>
            <div className={styles.liveContainer}>
                <img src={LiveImg} alt="Online status" className={styles.liveImg}/>
                <a className={styles.userAmount} data-key={id}><span>{usersOnline}</span> Users</a>
            </div>
        </div>
    )
}