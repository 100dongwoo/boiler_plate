import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {loginUser} from "../../../_actions/user_action";

function LoginPage(props) {

    const dispatch = useDispatch()
    const [Email, setEmail] = useState("")     //state
    const [Password, setPassword] = useState("")   //state
    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)           //currentTarget정해진메소드
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value) //currentTarget정해진메소드
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();   //이게 없다면 페이지가 리플래쉬가된다!!!!!

        let body = {
            email: Email,
            password: Password

        }
        dispatch(loginUser(body)) //액션취함        //로그인되면 첫페이지 가는거
            .then(response=>{
                if(response.payload.loginSuccess){
                    props.history.push('/')
                }
                else {
                    alert("에러발생")
                }
            })
    }
//onchage는 input 입력할떄마다 state값이 변경됨 value 값이 바뀐다

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>
            <form style={{display: 'flex', flexDirection: 'column'}}
                  onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}/>
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>
                <br/>
                <button>
                    Login
                </button>
            </form>
        </div>
    )

}

export default LoginPage