import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Typography from "@mui/material/Typography";
import Card from '@mui/material/Card';
import  './Course.css';
import { Button, TextField } from '@mui/material';
import axios from "axios";

function Course()
{
    let { courseId } = useParams();
    const [courses,setCourses]=useState([]);
    const [courseDetails, setCourseDetails] = useState(null);
    const [doubt,setDoubt]=useState("");
    const [username,setUsername]=useState("");
    let token=JSON.parse(localStorage.getItem('token')) || "";
    const cardStyle={
        width:"1160px",
        height:"635px",
        
    };
    const textStyle={
        width:"90%",
    }
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
                    console.log(JSON.stringify(data.username) );
                    setUsername(data.username);
                    console.log("In getting courses "+token);
                    fetch("http://localhost:3000/admin/courses",{
                    method: 'GET',
                    headers:{
                        "Content-Type":"application/json",
                        authorization:"Bearer "+token
                    }
                    })
                    .then(res => res.json())
                    .then((data) => {
                    // console.log("Courses are retrieved");
                    // console.log(data)
                    setCourses(data);
                    })
                }
            })
        }
    },[]);

    useEffect(() => {
        // Find the course details that match the courseId
        const matchingCourse = courses.find(course => course.courseId == courseId);
        setCourseDetails(matchingCourse);
    }, [courses, courseId]);


    async function  raiseDoubt()
    {
        try{
            const doubtInfo={
                username:username,
                doubt:doubt,
                title:courseDetails.title,
                status:true,
            }
            console.log(doubtInfo);
            console.log(token);
           
            const response = await axios.post("http://localhost:3000/admin/createDoubt", doubtInfo, {
                headers: {
                    Authorization: `Bearer ${token}`, // Set the Authorization header correctly.
                },
            });
                let data=response.data;
                console.log(data);
                setDoubt("");
            
        }
        catch (error){
            console.error("Error:", error);
        }
    }
    

    return (
        <div>
            {courseDetails ? (
                <div className='courseContent'>
                    <div className='lecture'>
                        <Card style={cardStyle}>
                        <Typography>{courseDetails.title}</Typography>
                        <Typography>{courseDetails.description}</Typography>
                        <img width="317" height="159" src={`${courseDetails.imageLink}`} alt="Course" />
                        <Typography>{courseDetails.price}</Typography>
                        </Card>
                        <div className='doubt'><TextField style={textStyle} placeholder='Enter your doubt here ' value={doubt}  onChange={e => setDoubt(e.target.value)}></TextField><Button onClick={raiseDoubt}>Submit</Button></div>
                    </div>
                    <div className='sidebar'>SideBar</div> 
                </div>
                
            ) : (
                <div>No Course Found!</div>
            )}
        </div>
    );
}

export default Course;