import React, { useEffect, useState } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import "./Chat.css";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import AttachFile from "@material-ui/icons/AttachFile";
import MoreVert from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { useParams } from "react-router-dom";
import db from "./firebase";
import firebase from "firebase";
import { useStateValue } from "./StateProvider";

function Chat() {
    const [input, setInput] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        if (roomId) {
            db.collection("rooms")
                .doc(roomId)
                .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

            db.collection("rooms")
            .doc(roomId)
            .collection("message")
            .orderBy('timestamp', 'asc')
            .onSnapshot((snapshot)  => 
                setMessages(snapshot.docs.map((doc) => doc.data()))
            );
        }
    }, [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        console.log("You typed >>> ", input);

        db.collection('rooms').doc(roomId).collection('message').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

        setInput("");
    };

    /* jshint ignore:start */
    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${Math.floor(Math.random() * 5000)}.svg`} />

                <div className="chat_headerInfo">
                    <h3>{roomName}</h3>
                    <p>
                        last seen{" "}
                        {new Date(
                        messages[messages.length -1]?.timestamp?.toDate()
                    ).toUTCString()}</p>
                </div>

                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="chat_body">
                {messages.map((message) => (
                    <p className={`chat_message ${message.name === user.displayName && "chat_reciever"}`}>
                        <span className="chat_name">{message.name}</span>
                        {message.message}
                        <span className="chat_timestamp">
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                    </p>
                ))}
            </div>

            <div className="chat_footer">
                <InsertEmoticonIcon />
                <form>
                    <input 
                        value={input} 
                        onChange={(e) => setInput(e.target.value)} 
                        placeholder="Type a message" 
                        type="text"
                    />
                    <button onClick={sendMessage} type="submit">Send</button>
                </form>
                <MicIcon />
            </div>
        </div>
    );
    /* jshint ignore:end */
}

export default Chat;