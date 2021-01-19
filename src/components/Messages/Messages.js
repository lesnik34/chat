import React from 'react'
import {connect} from "react-redux";

function Messages(props) {
    const getMessages = () => {
        return props.messages.map((el, index) => (
            <li className={`chat__item ${el.user === props.name ? 'my-message' : ''}`} key={index}>
                <h3 className='chat__user'>{el.user}</h3>

                <div className='chat__item-wrap'>
                    <div className='chat__avatar' style={{backgroundImage: `url(${props.users[el.user].url})`}}/>

                    <div className='chat__message-wrap'>
                        {el.message ? <p className='chat__message'>{el.message}</p> : null}

                        {el.img ? <img className='chat__message-img' src={el.img} alt="Фотокарточка"/> : null}
                    </div>
                </div>
            </li>
        ))
    }

    return (
        <React.Fragment>
            { getMessages() }
        </React.Fragment>
    )
}

function mapStateToProps(state) {
    return {
        messages: state.messages.messages,
        name: state.profile.name,
        users: state.users.users
    }
}

export default connect(mapStateToProps)(Messages)