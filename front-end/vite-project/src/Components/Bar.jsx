import AppBar from '@mui/material/AppBar';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Bar.css';
import { useEffect, useState } from 'react';
function Bar()
{
    const navigate = useNavigate();
    const token=JSON.parse(localStorage.getItem('token')) || "";
    const [username,setUsername]=useState("");
    const buttonStyle= {
        color: 'white',
        marginTop:'5px',
    };

    const barStyle={
        height:'5vh',
        minHeight:'41.5px',
    };
    if(token != "")
    {
        // console.log(token);      
        fetch("http://localhost:3000/admin/verify",{
            method:"GET",
            headers:{
            "Content-Type":"application/json",
            "authorization":'Bearer '+ token,
        }
        })
        .then((resp) => resp.json())
        .then((data) => {
            if(data.message !== "Invalid Admin credentials")
            {
                setUsername(data.username);
            }
            else
            {
                console.log(data.message);
            }
        })
    }
    if(username !== "")
    {
        return (
            <div >
                <AppBar style={barStyle}className="appBar" >
                <div className='content'>
                    <div className='begin'>Easy Learn</div>
                    <div className='end'>
                    <Button style={buttonStyle} variant="text" onClick={() => {
                        localStorage.clear();
                        setUsername("");
                        navigate('/login')}}
                    >LogOut</Button>
                    </div> 
                </div></AppBar>
        </div>
        )
    }
    else
    {
        return (
            <div >
                <AppBar style={barStyle}className="appBar" >
                <div className='content'>
                    <div className='begin'>SkillSurge</div>
                    <div className='end'>
                    <Button style={buttonStyle} variant="text" onClick={() => navigate('/login')}>LogIn</Button>
                    <Button style={buttonStyle}  variant="text" onClick={() => navigate('/signup')}>SignUp</Button>
                    </div> 
                </div></AppBar>
            </div>
        )
    }
    
}

export default Bar