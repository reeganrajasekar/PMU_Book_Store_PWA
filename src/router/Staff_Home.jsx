import home from "../assets/Nav/home-color.png"
import collection from "../assets/Nav/collection.png"
import profile from "../assets/Nav/profile.png"
import { useState,useEffect } from 'react';
import {Link , useHistory} from "react-router-dom";


export default function Home(){
    const history = useHistory();
    const [data,setData] = useState([]);
    const [person_name,setName] = useState("");
    const [person_id,setId] = useState("");
    useEffect(() => {
        document.body.style = "background-color:whitesmoke !important;display:block";
        var jsonValue = localStorage.getItem('Login');
          if(jsonValue=="student"){
            history.push('/home')
          }else if(jsonValue=="staff"){
            history.push('/staffHome')
          }else{
            history.push('/')
          }
        async function mine(){
            fetch('https://wakeful-flower-wind.glitch.me/api/staff/books')
              .then((response) => response.json())
              .then((data) => {setData(data)})
            .catch((error) => {
              alert(JSON.stringify(error));
              console.error(error);
            });
            const student = localStorage.getItem("data")
            const student_list = JSON.parse(student)
            setName(student_list[0].staff_name)
            setId(student_list[0].staff_id)
          }
          mine();
      },[]);
    return(
        <>
            <div style={{display:"flex",justifyContent:'center',alignItems:'center',flexDirection:'column',width:"100%"}}>
                <div style={{position:'sticky',top:0,padding:10,width:"98vw",backdropFilter:"blur(8px)",borderRadius:"0px 0px 15px 15px"}}>
                    <input onChange={
                        async (text) => {
                            const jsonValue = localStorage.getItem("data")
                            let list = JSON.parse(jsonValue)
                            fetch('https://wakeful-flower-wind.glitch.me/api//staff/books?dept='+list[0].dept+'&book_name='+text.target.value)
                              .then((response) => response.json())
                              .then((data) => {setData(data)})
                            .catch((error) => {
                              alert("Something went wrong");
                              console.error(error);
                            });
                          }
                    } type="text" style={{width:"100%",height:50,borderRadius:15,border:'1px solid #F67327',fontSize:22,textAlign:'left',paddingLeft:15,}} placeholder="Search "/>
                </div>
                
                {(!data[0])?<p  style={{paddingTop:50,textAlign:'center',fontSize:22,fontWeight:'bold',color:'#F5DBCC'}}>Nothing Found !</p>:""}

                {
                    data.map((item)=>

                        <div key={item._id} onClick={
                            ()=>{
                                if(confirm("Create Request:\n"+"\tBook Name : "+item.book_name+"\n"+"\tAuthor Name : "+item.author_name)){
                                    fetch('https://wakeful-flower-wind.glitch.me/api/staff/request', {
                                        method: 'POST',
                                        body: JSON.stringify({
                                            staff_id : person_id,
                                            staff_name: person_name,
                                            book_id: item._id,
                                            book_name : item.book_name,
                                        }),
                                        headers: {
                                        "Content-Type": "application/json"
                                        },
                                    })
                                    .then((response) => response.json())
                                    .then((data) => {
                                        if(data.code=="Requested"){
                                            history.push("/staffBook")
                                        }else{
                                            alert(data.code)
                                        }
                                    })
                                    .catch((error) => {
                                        console.error(error);
                                    })
                                }
                            }} 
                            style={{boxShadow:"0px 0px 2px #F67327",display:"flex",padding:10,justifyContent:'space-evenly',marginLeft:10,flexDirection:'column',marginRight:10,width:"95%",height:'100%',minHeight:150,marginTop:15,borderRadius:10,border:'1px solid #F5DBCC',backgroundColor:'#fff'}}>
                        <span style={{color:'#aaa',fontSize:20}}>Book    :{"\t"}<span style={{color:'#042744'}}>{item.book_name}</span></span>
                        <span style={{color:'#aaa',fontSize:20}}>Author :{"\t"}<span style={{color:'#042744'}}>{item.author_name}</span></span>
                        <span style={{color:'#aaa',fontSize:20}}>ISBN    :{"\t"}<span style={{color:'#042744'}}>{item.ISBN}</span></span>
                        <span style={{color:'#aaa',fontSize:20}}>Edition :{"\t"}<span style={{color:'#042744'}}>{item.version} / {item.year}</span></span>
                        <span style={{color:'#aaa',fontSize:20}}>Dept    :{"\t"}<p style={{color:'#042744',fontSize:16,textAlign:'justify'}}>{item.dept.map((i)=><span >&ensp;&ensp;&ensp;{i}<br/></span>)}</p></span>
                        </div>

                    )
                }


                <div style={{height:80}}></div>
            </div>
            <div style={{position: 'fixed', left: 0, right: 0, bottom: 0,height:60,backgroundColor:"#F5DBCC",display:"flex",flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
                <Link to="/staffHome">
                    <img style={{width:30,height:30}} src={home} />
                </Link>

                <Link to="/staffBook">
                    <img style={{width:30,height:30}} src={collection} />
                </Link>

                <Link to="/staffProfile">
                    <img style={{width:30,height:30}} src={profile} />
                </Link>
            </div>
        </>
    )
}