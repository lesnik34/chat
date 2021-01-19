import React from 'react'
import './Users.scss'
import {connect} from "react-redux";
import {fetchUsersDelete} from "../../store/actions/users";
import socket from "../../socket/socket";
import {CHAT_DELETE} from "../../socket/socketTypes";
import {fetchMessagesDel} from "../../store/actions/messages";

function Users (props) {
    const getUserItem = (users) =>
        Object.keys(users)
            .sort(el => {
                return !users[el].isOnline
            }).map((el, index) => (
                <li key={index} className={`users__item ${users[el].isOnline ? 'online' : 'offline'}`}>
                    <div className='users__image' style={{backgroundImage: `url(${users[el].url})`}} />

                    <div className='users__info'>
                        <h2 className='users__name'>{ users[el].name }</h2>

                        <div className='users__status-wrap'>
                            <span className='users__status'>{ users[el].isOnline ? 'online' : 'offline' }</span>

                            {
                                !users[el].isOnline ?
                                    <button
                                        className='users__delete'
                                        type='button'
                                        onClick={() => {
                                            props.fetchMessagesDel(users[el].name);
                                            props.fetchUsersDelete(users[el].name);
                                            socket.emit(CHAT_DELETE, users[el].name);
                                        }}
                                    >
                                        Удалить
                                    </button>
                                    : null
                            }
                        </div>
                    </div>
                </li>
            ))

    return (
        <div className='users'>
            <ul className='users__list'>
                { getUserItem(props.users) }
            </ul>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        users: state.users.users
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchUsersDelete: (data) => dispatch(fetchUsersDelete(data)),
        fetchMessagesDel: (data) => dispatch(fetchMessagesDel(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);