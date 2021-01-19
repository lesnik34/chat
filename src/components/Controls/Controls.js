import React, {useRef, useState} from 'react'
import './Controls.scss'
import {fetchMessagesSend} from "../../store/actions/messages";
import {connect} from "react-redux";
import {getBase64Image} from "../../utils/getBase64Image";

function Controls(props) {
    const [message, setMessage] = useState('');
    const [file, setFile] = useState('');
    const [fileVision, setFileVision] = useState(false);
    const fileInput = useRef(null);

    const changeHandler = (e) => {
        if (e.target.files[0]) {
            setFileVision(true);
            getBase64Image(e.target.files[0]).then(data => {
                setFile(data)
            });
        }
    }

    const sendHandler = () => {
        setTimeout(props.scroller, 100);

        if (message || file) {
            props.fetchMessagesSend({img: file, message, user: props.name});
            setMessage('');
            setFileVision(false);
            fileInput.current.value = '';
            setTimeout(() => setFile(''), 300);
        }
    }

    const enterHandler = (ev) => {
        if (ev.code === 'Enter') {
            ev.preventDefault();
            sendHandler();
        }
    }

    return (
        <footer className='controls'>
            <div className={`controls__promo-wrap ${fileVision ? 'active' : ''}`}>
                <img className='controls__promo-img' src={file} alt="Добавленный файл"/>

                <span
                    onClick={() => {
                        setFileVision(false);
                        fileInput.current.value = '';
                        setTimeout(() => setFile(null), 300);
                    }}
                    className='controls__promo-btn'
                    type='button'
                    aria-label='Закрыть'
                />
            </div>

            <div className='controls__background'>
                <div className='container'>
                    <div className='controls__wrapper'>
                        <input
                            id='controls__file'
                            ref={fileInput}
                            type="file"
                            className='controls__file'
                            accept='image/*'
                            onChange={changeHandler}
                        />

                        <label className='controls__file-icon' htmlFor="controls__file" />

                        <textarea
                            className='controls__text'
                            name=""
                            id=""
                            cols="30"
                            rows="1"
                            placeholder='Сообщение...'
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            onKeyPress={enterHandler}
                        />

                        <button
                            type='button'
                            className='controls__btn'
                            onClick={sendHandler}
                        />
                    </div>
                </div>
            </div>
        </footer>
    )
}

function mapStateToProps(state) {
    return {
        name: state.profile.name
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchMessagesSend: (data) => dispatch(fetchMessagesSend(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Controls)