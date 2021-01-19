import React, {useEffect, useRef, useState} from 'react'
import {Profile} from "../../components/Profile/Profile"
import Controls from "../../components/Controls/Controls"
import {connect} from "react-redux"
import './Chat.scss'
import socket from '../../socket/socket'
import {fetchUsersAdd, fetchUsersDelete, fetchUsersOff} from "../../store/actions/users"
import Users from "../../components/Users/Users"
import {fetchMessagesAdd, fetchMessagesDel} from "../../store/actions/messages";
import Messages from "../../components/Messages/Messages";
import {CHAT_DELETED, CHAT_DISCONNECT, CHAT_JOINED, CHAT_SENT} from "../../socket/socketTypes";
import {animateScroll} from 'react-scroll'
import {CSSTransition} from 'react-transition-group'

function Chat(props) {
    const [usersVision, setUsersVision] = useState(false);
    const chatRef = useRef(null);

    const scroller = () => animateScroll.scrollToBottom({containerId: 'chat', duration: 300});

    useEffect(() => {
        socket.on(CHAT_DISCONNECT, (user) => {
            props.fetchUsersOff(user);
        })

        socket.on(CHAT_JOINED, (user) => {
            props.fetchUsersAdd(user);
        })

        socket.on(CHAT_SENT, (message) => {
            const isNearOfBottom = chatRef.current.scrollTop > chatRef.current.scrollHeight - 1000;
            props.fetchMessageAdd(message);

            if (isNearOfBottom) {
                scroller();
            }
        })

        socket.on(CHAT_DELETED, (user) => {
            props.fetchMessagesDel(user);
            props.fetchUsersDelete(user);
        })

        setTimeout(() => scroller(),500);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='chat'>
            <Profile userName={props.name} url={props.url} setUsersVision={setUsersVision} usersVision={usersVision} />

            <main className='chat__wrapper'>
                <CSSTransition
                    in={usersVision}
                    timeout={50}
                    classNames='users'
                >
                    <Users users={props.users} />
                </CSSTransition>

                <div className='chat__container' id='chat' ref={chatRef}>
                    <div className="container">
                        <ul className='chat__list'>
                            <Messages />
                        </ul>
                    </div>
                </div>
            </main>

            <Controls scroller={scroller} />
        </div>
    )
}

function mapStateToProps(state) {
    return {
        name: state.profile.name,
        url: state.profile.url,
        users: state.users.users
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchUsersAdd: (data) => dispatch(fetchUsersAdd(data)),
        fetchUsersOff: (data) => dispatch(fetchUsersOff(data)),
        fetchMessageAdd: (data) => dispatch(fetchMessagesAdd(data)),
        fetchUsersDelete: (data) => dispatch(fetchUsersDelete(data)),
        fetchMessagesDel: (data) => dispatch(fetchMessagesDel(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)