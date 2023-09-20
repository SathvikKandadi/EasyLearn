import { useState ,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Doubts.css';
import { Button } from '@mui/material';
import { Typography ,Card } from '@mui/material';

function Doubts(){
    const [doubts,setDoubts]=useState([]);
    let token=JSON.parse(localStorage.getItem('token')) || "";


    const navigate=useNavigate();
    useEffect(() => {
        // console.log("useEffect");
        if(token === "")
        {
            console.log("Authorization Required");
            navigate('/login');
        }
        else
        {
            //
            // token='Bearer '+token;
            console.log("in use Efetc "+token);
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
                    console.log(data.message);
                    localStorage.clear();
                    navigate('/login');
                }
                else
                {
                    console.log("In getting Doubts "+token);
                    fetch("http://localhost:3000/admin/doubts",{
                    method: 'GET',
                    headers:{
                        "Content-Type":"application/json",
                        authorization:"Bearer "+token
                    }
                    })
                    .then(res => res.json())
                    .then((data) => {
                    setDoubts(data);
                    console.log(doubts);
                    })
                }
            })
        }
    },[]);
    return(
        <>
           <div className="doubtsMain">
                {doubts.map((doubt)=>{
                    return <Doubt key={doubt.doubtId} doubt={doubt}/>
                }
                )}
            </div>
        </>
    )
}

function Doubt(props)
{
    const navigate=useNavigate();
    const cardStyle={
        paddingTop:"5px",
        paddingLeft:"5px",
        paddingRight:"5px",
        width:"430px",
        minHeight:"110px",
        maxHeight:"280px",
        margin:"15px",
    };

    const titleStyle={
        fontSize:"25px",
    }

    const buttonStyle={
        fontSize:"15px",
        marginLeft:"3px",
    }

    const doubt=props.doubt;
    return(
        <Card style={cardStyle} >
            <Typography style={titleStyle}>{doubt.title}</Typography>
            <Typography>{doubt.text}</Typography>
            <div className='buttonContainer'>
            <Button style={buttonStyle}>Accept</Button>
            </div>
        </Card>
    )
}

export default Doubts;