import React from 'react'
import './Home.scss'
import {connect} from "react-redux"
import {fetchProfile, fetchProfileSetLoading} from "../../store/actions/profile"
import {fetchUsers} from "../../store/actions/users";
import {Loader} from "../../components/Loader/Loader"
import {fetchMessages} from "../../store/actions/messages";
import socket from "../../socket/socket";

const Home = (props) => {
    const clickHandle = async () => {
        await props.fetchProfile();
        await props.fetchUsers();
        await props.fetchMessages();
        props.fetchProfileSetLoading();
    }

    return (
        <main className='home'>
            <div className='home__wrapper'>
                <h1 className='home__header'>
                    Добро пожаловатьв чат
                </h1>

                <p className='home__text'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris, placerat imperdiet fermentum, enim in
                    pretium odio. Et convallis urna eu ut orci vel sed in cras ut neque ac.
                </p>

                <button
                    className='home__btn'
                    disabled={props.loading}
                    type='button'
                    onClick={clickHandle}
                >
                    {
                        props.loading ? <Loader /> : null
                    }

                    Войти
                </button>
            </div>
        </main>
    )
}

function mapStateToProps(state) {
    return {
        name: state.profile.name,
        isAuth: state.profile.isAuth,
        loading: state.profile.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchProfile: () => dispatch(fetchProfile()),
        fetchProfileSetLoading: () => dispatch(fetchProfileSetLoading()),
        fetchUsers: () => dispatch(fetchUsers()),
        fetchMessages: () => dispatch(fetchMessages())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);