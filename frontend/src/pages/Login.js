import { useState } from 'react';
import './Login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {

    const [isLoggedIn, setIsLoggedIn] = useState(true)
    const [loginErr, setLoginErr] = useState(null)
    const navigate = useNavigate()

    function login() {
        const accessKeyId = document.getElementById('accessKeyId').value;
        const secretAccessKey = document.getElementById('secretAccessKey').value;

        const data = {
            aws_access_key_id: accessKeyId,
            aws_secret_access_key: secretAccessKey
        };
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Accept': '*/*',
                'Conncetion': 'keep-alive'
            },
        };
        axios.post('http://localhost:5000/login', data, config)
            .then(response => {
                if (response.data.message) {
                    sessionStorage.setItem('logged_in',true)
                    navigate('/dashboard')
                    console.log(response.data.message)
                }
                else {
                    setIsLoggedIn(false)
                    sessionStorage.setItem('logged_in',false)
                    setLoginErr(response.data.error)
                    console.log(response.data.error)
                }
            })
    }

    return (
        <div className="container d-flex justify-content-center mt-5 page-container bg-dark">
            <div className='card w-50 login-form p-2 '>

                <div className='card-header m-2 text-center'>
                    <h2>
                        Login
                    </h2>
                </div>

                <div className='card-body '>
                    {
                        !isLoggedIn && <p className='text-danger text-center'>{loginErr}, check your credentials and try again</p>
                    }
                    <div className='d-flex flex-column align-items-center card-content h-75 mt-3'>
                        <div className='d-flex m-2 flex-row w-75 align-items-center '>
                            <label className='label'>Access Key Id: </label>
                            <input id="accessKeyId" className='form-control w-50 p-2' type='text' placeholder='Enter your access key id..'></input>

                        </div>
                        <div className='d-flex m-2 flex-row w-75 align-items-center '>
                            <label className=' label'>Secret Access Key: </label>
                            <input id="secretAccessKey" className='form-control w-50  p-2 ' type='password' placeholder='Enter your secret access key.. '></input>
                        </div>
                        <button onClick={login} className='btn btn-outline-dark mt-4'>Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;