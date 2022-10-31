import home from "../assets/Nav/home.png"
import collection from "../assets/Nav/collection.png"
import profile from "../assets/Nav/profile-color.png"
import Logo from '../assets/icon.png'
import {Link} from "react-router-dom";
import { useState,useEffect } from 'react';
import {useHistory} from "react-router-dom";


export default function Profile(){
    const history = useHistory();

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [dept,setDept] = useState("");
    const [id,setId] = useState("");

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
            setName(list[0].student_name)
            setDept(list[0].dept)
            setId(list[0].student_id)
            setEmail(list[0].student_email)
        }
        mine();
      },[]);

    return(
        <>
        <div style={{marginTop:10}}>
          <div style={{display:'flex',flexDirection:"column",paddingTop:10,alignItems:'center',justifyContent:'center'}}>
            <img
              style={{width:100,height:100}}
              src={Logo}
            />
            <span style={{fontSize:26,fontWeight:'bold',paddingTop:20,paddingBottom:20,color:'#042744'}}>PMU BookStore</span>
            <div style={{display:'flex',flexDirection:"column",width:'100%',height:'auto',padding:20}}>
              <span style={{color:'#aaa',fontSize:20}}>Name    :</span>
              <p style={{color:'#042744',fontSize:26}}>&ensp;&ensp;{name}{"\n"}</p>
              <span style={{color:'#aaa',fontSize:20}}>Register No :</span>
              <p style={{color:'#042744',fontSize:26}}>&ensp;&ensp;{id}{"\n"}</p>
              <span style={{color:'#aaa',fontSize:20}}>Email :</span>
              <p style={{color:'#042744',fontSize:26}}>&ensp;&ensp;{email}{"\n"}</p>
              <span style={{color:'#aaa',fontSize:20}}>Department    :</span>
              <p style={{color:'#042744',fontSize:26}}>&ensp;&ensp;{dept}</p>
            </div>

            <button
                style={{
                    paddingLeft: 90,
                    paddingRight: 90,
                    fontSize:22,
                    paddingTop:8,
                    paddingBottom:8,
                    color:'#fff',
                    border:'none',
                    borderRadius:30,
                    backgroundColor: '#F67327'
                }}
                onClick={async ()=> {
                    localStorage.removeItem('Login')
                    localStorage.removeItem("data")
                    history.push("/")
                    
                }}
            >
                <b>Logout</b>
            </button>
            <div style={{height:80}}></div>

          </div>
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