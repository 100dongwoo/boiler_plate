import React, {useEffect} from "react";
import Axios from "axios";
import {useDispatch} from "react-redux"//history 사용시 필요
import {auth} from "../_actions/user_action";

export default function (SpecificComponent, option, adMinRoute = null) {

    //null  아무나출입가능한 페이지
    //true  로그인한유저만 출입가능
    //false 로그인한유저는 출입불가능

    function AuthenicationCheck(props) {

        const dispatch = useDispatch()

        useEffect(() => {

            dispatch(auth()).then(response => {      //백엔드에서 가져온정보들이 responcse에있다
                console.log(response)


//로그인하지않은 상태
                if (!response.payload.isAuth) {
                    if (option)//true면
                    {
                        props.history.push('/login')
                    }
                } else {   //로그인한 상태
                    if (adMinRoute && !response.payload.isAdmin) {
                        props.history.push('/')
                    } else {       //로그인유저가 출입물가능한 페이지(로그인페이지)
                        if (option === false)
                            props.history.push('/')
                    }
                }
            })

            // Axios.get('/api/users/auth')
        }, [])           ///[]?????????????????????????????????
        return (
            <SpecificComponent/>
        )

    }

    return AuthenicationCheck

}

