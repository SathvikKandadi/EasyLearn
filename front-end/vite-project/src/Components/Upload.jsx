import './Upload.css';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



function Upload()
{

    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const [price,setPrice]=useState(0);
    const [image,setImage]=useState("");
    const [video,setVideo]=useState("");
    let token=JSON.parse(localStorage.getItem('token')) || "";
    if(token!="")
        token='Bearer '+token;
    const cardStyle={
        padding: '1%',
        width: "335px",
        height: "375px",
    };

    const buttonStyle={
        font:'large',
        width: "85px",
    };

    const data = {
        title: title,
        description: description,
        price: price,
        imageLink: image,
        published: true, // Note: Use a boolean value, not a string
      };

    
    const jsonData = JSON.stringify(data);

    function upload(){
        fetch('http://localhost:3000/admin/courses',{
            method:'POST',
            headers:{
                "Content-Type":"application/json",
                authorization:token,
            },
            body:jsonData,
        })
        .then(resp => resp.json)
        .then(data => console.log(data));
    }


    return (
        <div className='uploadBox'>
            <div className='courseHeader'>Enter Course Details</div>
            <Card style={cardStyle}>
            <TextField  className="titleInput" id="outlined-basic" label="Title" variant="outlined" onChange={e => setTitle(e.target.value)}/>
            <div className='gap'></div>
            <TextField  className="descriptionInput" id="outlined-basic" label="Description" variant="outlined" onChange={e => setDescription(e.target.value)}/>
            <div className='gap'></div>
            <TextField  className="priceInput" id="outlined-basic" label="Price" variant="outlined" onChange={e => setPrice(e.target.value)}/>
            <div className='gap'></div>
            <TextField  className="imageInput" id="outlined-basic" label="Imagelink" variant="outlined" onChange={e => setImage(e.target.value)}/>
            <div className='gap'></div>
            <TextField  className="videoInput" id="outlined-basic" label="Videolink" variant="outlined" onChange={e => setVideo(e.target.value)}/>
            <div className='gap'></div>
            <div className='buttonDiv'>
            <Button style={buttonStyle} onClick={upload} variant="contained" >Save</Button>
            </div>
            </Card>
        </div>
    )
}

export default Upload;