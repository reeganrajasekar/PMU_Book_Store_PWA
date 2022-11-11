import home from "../assets/Nav/home.png"
import collection from "../assets/Nav/collection-color.png"
import profile from "../assets/Nav/profile.png"
import { useState,useEffect } from 'react';
import moment from 'moment';
import {Link} from "react-router-dom";

export default function Book(){
    const [data,setData] = useState([]);
  const [have,setHave] = useState([]);
  const [old,setOld] = useState([]);

  useEffect(() => {
    document.body.style = "background-color:whitesmoke !important;display:block";
    async function mine(){
          var jsonValue = localStorage.getItem('Login');
          if(jsonValue=="student"){
            
          }else if(jsonValue=="staff"){
            history.push('/staffHome')
          }else{
            history.push('/')
          }
        var jsonValue = localStorage.getItem("data")
        let list = JSON.parse(jsonValue)
      fetch('https://wakeful-flower-wind.glitch.me/api/lib?student_id='+list[0].student_id)
        .then((response) => response.json())
        .then((i) => {
          setData([])
          setHave([])
          setOld([])
          i.map((j)=>{
            if(j.data=="Waiting List"){
              setData(arr => [...arr , j])
            }else if(j.data=="You can pick"){
              setHave(oldArray => [...oldArray, j])
            }else{
              if(j.data!="Canceled"){

                setOld(oldArray => [...oldArray, j])
              }
            }
          })
        })
        .catch((error) => {
          alert(JSON.stringify(error));
          console.error(error);
        });
      }
      mine();
      
  },[]);
    return(
        <>
        <div style={{marginTop:30,width:'100%'}}>
            {(!have[0] && !data[0] && !old[0])?<p  style={{paddingTop:50,textAlign:'center',fontSize:22,fontWeight:'bold',color:'#F5DBCC'}}>Nothing Found !</p>:""}


            {(data[0])?<span style={{paddingTop:20,paddingLeft:15,fontSize:22,fontWeight:'bold',color:'#F67327'}}>Waiting List:</span>:""}
            {data.map((i)=>
                <div key={i._id} style={{display:"flex",padding:15,marginLeft:10,marginRight:10,width:"auto",height:'auto',marginTop:10,borderRadius:10,border:'1px solid #F5DBCC',backgroundColor:'#fff'}}>
                    <span style={{color:'#aaa',fontSize:20}}>Book    :<span style={{color:'#042744'}}>{i.book_name}</span></span>
                </div>
            )}
            {(have[0])?<span  style={{paddingTop:20,paddingLeft:15,fontSize:22,fontWeight:'bold',color:'#F67327'}}>Scheduled Books : </span>:""}
            {have.map((i)=>
                <div key={i._id} style={{display:"flex",flexDirection:"column",padding:15,justifyContent:'space-evenly',marginLeft:10,marginRight:10,width:"auto",height:150,marginTop:10,borderRadius:10,border:'1px solid #F5DBCC',backgroundColor:'#fff'}}>
                    <span style={{color:'#aaa',fontSize:20}}>Book       :{'\n'}<span style={{color:'#042744'}}>{'\t\t'}{i.book_name}</span></span>
                    <span style={{color:'#aaa',fontSize:20}}>Schedule :{'\n'}<span style={{color:'#042744'}}>{'\t\t'}{moment(new Date(i.gettime).toISOString().substr(0, 19)).format('MMMM Do YYYY, h:mm a')}</span></span>
                    <span style={{color:'#aaa',fontSize:20}}>Message :{'\n'}<span style={{color:'#042744'}}>{'\t\t'}{i.data}</span></span>
                </div>
            )}
            {(old[0])?<span style={{paddingTop:20,paddingLeft:15,fontSize:22,fontWeight:'bold',color:'#F67327'}}>Books you have : </span>:""}

            {old.map((i)=>
                <div  key={i._id} style={{display:"flex",flexDirection:"column",padding:10,justifyContent:'space-evenly',marginLeft:10,marginRight:10,width:"auto",height:150,marginTop:10,borderRadius:10,border:'1px solid #F5DBCC',backgroundColor:'#fff'}}>
                    <span style={{color:'#aaa',fontSize:20}}>Book       :{'\n'}<span style={{color:'#042744'}}>{'\t\t'}{i.book_name}</span></span>
                    <span style={{color:'#aaa',fontSize:20}}>Return Date :{'\n'}<span style={{color:'#042744'}}>{'\t\t'}{moment(new Date(i.gettime).toISOString().substr(0, 19)).add(30, 'days').format('MMMM Do YYYY')}</span></span>
                    <span style={{color:'#aaa',fontSize:20}}>Message :{'\n'}<span style={{color:'#042744'}}>{'\t\t'}{i.data}</span></span>
                </div>
            )}

            <div style={{marginBottom:80}}></div>
        </div>


        <div style={{position: 'fixed', left: 0, right: 0, bottom: 0,height:60,backgroundColor:"#F5DBCC",display:"flex",flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
            <Link to="/home">
                <img style={{width:30,height:30}} src={home} />
            </Link>

            <Link to="/book">
                <img style={{width:30,height:30}} src={collection} />
            </Link>

            <Link to="/profile">
                <img style={{width:30,height:30}} src={profile} />
            </Link>
        </div>
        </>
    )
}