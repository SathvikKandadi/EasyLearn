import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Typography from "@mui/material/Typography";
import Card from '@mui/material/Card';
import './Courses.css';

function Courses()
{
    
    const [courses,setCourses]=useState([]);
    const navigate=useNavigate();
    useEffect(() => {
        // console.log("useEffect");
        let token=JSON.parse(localStorage.getItem('token')) || "";
        if(token === "")
        {
            console.log("Authorization Required");
            navigate('/login');
        }
        else
        {

            token='Bearer '+token;
            // console.log(token);
            fetch("http://localhost:3000/admin/verify",{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "authorization":token,
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
                    console.log(JSON.stringify(data.username) );
                    fetch("http://localhost:3000/admin/courses",{
                    method: 'GET',
                    headers:{
                        "Content-Type":"application/json",
                        authorization:token
                    }
                    })
                    .then(res => res.json())
                    .then((data) => {
                    // console.log("Courses are retrieved");
                    console.log(data)
                    setCourses(data);
                    })
                }
            })
        }
    },[]);
    
    return (
        <>
            <div className="coursesMain">
                {courses.map((course)=>{
                    return <Course key={course.courseId} course={course}/>
                }
                )}
            </div>
        </>
    )
}

function Course(props)
{
    const navigate=useNavigate();
    const cardStyle={
        maxWidth:"400px",
        maxHeight:"280px",
        margin:"10px",
    };

    const course=props.course;
    return(
        <Card style={cardStyle} onClick={() => {navigate(`/course/${course.courseId}`)}}>
            <Typography>{course.title}</Typography>
            <Typography>{course.description}</Typography>
            <img  width="317" height="159"src={`${course.imageLink}`}></img>
            <Typography>{course.price}</Typography>
        </Card>
    )
}

export default Courses