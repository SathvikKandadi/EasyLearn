import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

function SignUp()
{
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [rePassword,setrePassword] = useState("");
    const [token, setToken] = useState(
        JSON.parse(localStorage.getItem('token')) || ""
      );
    const [status,setStatus] = useState(JSON.parse(localStorage.getItem('status')) || false);
    const navigate = useNavigate();

    const cardStyle={
        padding: '1%',
        width: "335px",
        height: "235px",
        
    }

    function signup()
    {
        if(status || token!="")
        {
            console.log("A user is already logged In");
            navigate('/courses');
            return;
        }
        if(password !== rePassword)
        {
            alert(`Both Password's don't match`);
            return;
        }
        let username=JSON.stringify(email);
    
        fetch("http://localhost:3000/admin/signup",{
            method:'POST',
            headers:{
                "Content-Type":"application/json",
                "username": username,
                "password": JSON.stringify(password),
            }
        })
        .then((resp)=>resp.json())
        .then((data)=>{
            if(data.message === "User successfully created")
            {
                localStorage.setItem('token', JSON.stringify(data.token));
                localStorage.setItem('status',JSON.stringify(!status));
                setToken(data.token);
                setStatus(!status);
                console.log(status);
                console.log(data.token);
                navigate('/courses');
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

    return(
        <>
            <div className="signUpBox">
            <div className='heading'>Welcome to Easy Learn. Sign up below</div>
            <Card  style={cardStyle}>
            <TextField  className="emailInput" id="outlined-basic" label="Email" variant="outlined" onChange={e => setEmail(e.target.value)}/>
            <div className='gap'></div>
            <TextField  className="passwordInput" id="outlined-basic" label="Password" variant="outlined" onChange={e => setPassword(e.target.value)}/>
            <div className='gap'></div>
            <TextField  className="passwordInput" id="outlined-basic" label="Re-Enter Password" variant="outlined" onChange={e => setrePassword(e.target.value)}/>
            <div className='gap'></div>
            <div className='buttonDiv'>
            <Button onClick={signup} variant="contained" >SignUp</Button>
            </div>
            </Card>
            </div>
        </>
    )
}

export default SignUp