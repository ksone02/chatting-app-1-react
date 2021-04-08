import React, { useEffect, useState } from "react";
import './SidebarChat.css';
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import db from "./firebase";

function SidebarChat({ id, name, addNewChat }) {
    const [seed, setSeed] = useState(' ');
    const [messages, setMessages] = useState("");

    useEffect(() => {
        if(id) {
            db.collection("rooms")
                 .doc(id)
                 .collection("message")
                 .orderBy('timestamp', 'desc')
                 .onSnapshot((snapshot) => 
                     setMessages(snapshot.docs.map((doc) => doc.data()))
                 );
        }
    }, [id]);

    useEffect(() => {
       setSeed(Math.floor(Math.random() * 5000));
    }, []);

    const createChat = () => {
        const roomName = prompt("Please enter name for chat");

        if (roomName) {
            db.collection("rooms").add({
                name: roomName,
            });
        }
    };

    /* jshint ignore:start */
    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="sidebarChat_info">
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p> 
                </div>
            </div>
        </Link>
    ) : (
        <div onClick={createChat} className="sidebarChat">
            <h2>Add new chat</h2>
        </div>
    );
    /* jshint ignore:end */
}

export default SidebarChat;