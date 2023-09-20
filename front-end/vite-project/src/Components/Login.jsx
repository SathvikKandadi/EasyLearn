import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
function Login()
{
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    
    const [token, setToken] = useState(
        JSON.parse(localStorage.getItem('token')) || ""
      );
    const [status,setStatus] = useState(JSON.parse(localStorage.getItem('status')) || false);
    const cardStyle={
        padding: '1%',
        width: "335px",
        height: "175px",
    };
    const navigate = useNavigate();
    // localStorage.clear();



    if(token !== "")
    {
        // console.log("Y");
        fetch("http://localhost:3000/admin/verify",{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "authorization":"Bearer "+token,
            }
        })
        .then(resp => resp.json())
        .then((data) => {
            if(data.message === "Invalid Admin credentials")
            {
                localStorage.clear();
                setToken("");
                setStatus(false);
            }
            else
            {
                // console.log(data.username);
                navigate('/');
            }
        })
    }


    function login()
    {
        
        fetch("http://localhost:3000/admin/login",{
            method:'POST',
            headers:{
                "Content-Type":"application/json",
                "username":email,
                "password":password,
            }
        })
        .then(response => response.json())
        .then(data => {  
          if(data.message == 'Login is Successfull')
          {
            localStorage.setItem('token', JSON.stringify(data.token));
            localStorage.setItem('status',JSON.stringify(!status));
            setToken(data.token);
            setStatus(!status);
            // console.log(status);
            // console.log(data.token);
            navigate('/');
          }
          else
          {
            console.log(data.message);
          }   
        })
        .catch(error => {
              console.error('An error occurred:', error);
        });
    }

    return (
        <>
            <div className="loginBox">
            <div className='heading'>Welcome to Easy Learn. Log in below</div>
            <Card  style={cardStyle} >
            <TextField  className="emailInput" id="outlined-basic" label="Email" variant="outlined" onChange={e => setEmail(e.target.value)}/>
            <div className='gap'></div>
            <TextField  className="passwordInput" id="outlined-adorment-password" label="Password" variant="outlined" type="Password" onChange={e => setPassword(e.target.value)} onKeyUp={(e) => {
          if (e.key === "Enter") {
            login();
          }
        }}/>
            <div className='gap'></div>
            <div className='buttonDiv'>
            <Button variant="contained" onClick={login}>LogIn</Button>
            </div>
            </Card>
            </div>
            
        </>
    )
}

export default Login




