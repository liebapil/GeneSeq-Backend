import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios'



export default function User(props) {

    const [userNameReg, setUserNameReg] = useState('')
    const [passwordReg, setPasswordReg] = useState('')

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const [allUser, setAllUser] = useState([])

    const register = async (e) => {
        e.preventDefault()
        const res = await axios.post(`http://localhost:8000/user/`, {
            user_name: userNameReg,
            password: passwordReg
        })
        console.log(res)

    }

    const login = async (e) => {
        e.preventDefault()
        for (let i = 0; i < allUser.length; i++) {
            if (userName === allUser[i].user_name) {
                if (password === allUser[i].password) {
                    props.history.push('/geneseq')
                } else {
                    console.log('you failed')
                }
            } else {
                console.log('no match')
            }
        }
        
    }

    const getAllUsers = async () => {
        await axios.get(`http://localhost:8000/user/`)
            .then(res => {
                setAllUser(res.data)

            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getAllUsers()
    }, [])







    return (
        <div className='register_form'>
            <form className='registers' onSubmit={register}>
                <label htmlFor='username'>User Name</label>
                <input
                    name='username'
                    type='text'
                    placeholder='user name'
                    onChange={(e) => {
                        setUserNameReg(e.target.value)
                    }}
                />
                <label htmlFor='password'>password</label>
                <input
                    name='password'
                    type='text'
                    placeholder='password'
                    onChange={(e) => {
                        setPasswordReg(e.target.value)
                    }}
                />
                <button >Register</button>
            </form>
            <form className='login' onSubmit={login} >
                <label htmlFor='username'>User Name</label>
                <input
                    name='username'
                    type='text'
                    placeholder='user name'
                    onChange={(e) => {
                        setUserName(e.target.value)
                    }}
                />
                <label htmlFor='password'>password</label>
                <input
                    name='password'
                    type='text'
                    placeholder='password'
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                />
                <button>Login</button>
            </form>

        </div>
    )
}