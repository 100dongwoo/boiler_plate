import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {loginUser} from "../../../_actions/user_action";
import {registerUser} from "../../../_actions/user_action";
import {withRouter}from "react-router-dom"

function RegisterPage(props) {
    const dispatch = useDispatch()

    const [Email, setEmail] = useState("")     //state
    const [Password, setPassword] = useState("")   //state
    const [Name, setName] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")


    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)           //currentTarget정해진메소드
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value) //currentTarget정해진메소드
    }


    const onNameHandler = (event) => {
        setName(event.currentTarget.value) //currentTarget정해진메소드
    }


    const onConfirmHandler = (event) => {
        setConfirmPassword(event.currentTarget.value) //currentTarget정해진메소드
    }


    const onSubmitHandler = (event) => {
        event.preventDefault();   //이게 없다면 페이지가 리플래쉬가된다!!!!!


        if (Password !== ConfirmPassword) {
            return alert('비밀번호랑 비밀번호확인이 같아야됩니다')
        }
        let body = {
            email: Email,
            password: Password,
            name: Name,
        }
        //Axios.post(/api/users/register',body') 이런형식 리덕스 사용 안할시


        dispatch(registerUser(body)) //액션취함
            .then(response => {
                if (response.payload.success)
                    props.history.push("/login")
                else
                    alert("Failed to sign up")

            })
    }


    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>
            <form style={{display: 'flex', flexDirection: 'column'}}
                  onSubmit={onSubmitHandler}>


                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}/>


                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler}/>


                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>


                <label>Confirm Password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmHandler}/>


                <br/>
                <button>
                    회원가입입
                </button>
            </form>
        </div>
    )
}

export default withRouter(RegisterPage);