import React, { useState ,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


function EditPage (){
  const { id } = useParams();
  const [detail,setData] = useState({title:"",description:"",price:"",isEdited:false});


  const navigate = useNavigate();
  useEffect(() => {
    fetch('https://dummyjson.com/products/'+id)
    .then( res => res.json())
    .then( data => {
        setData(data)
    })
  }, []);
  function handleSubmit()
  {
    detail.isEdited = true;
    navigate('/', { state: detail});
  }

  function handleChange(event,type)
  {
    const newDetail = { ...detail };
    if(type == 'title')
    {
      newDetail.title = event.target.value; 
    }
    else if(type == 'description')
    {
      newDetail.description = event.target.value;
    }   
    else
    {
      newDetail.price = event.target.value;
    }
    setData(newDetail);
  }
  return (
    <div>
      <h3>Title-</h3>
      <form onSubmit={handleSubmit}>
        <input type= "text" defaultValue={detail.title}   
        onChange={(event) => {handleChange(event,'title')}}/>
      <h3>Description -</h3><label> {detail.description}</label>
      <h3>Price - </h3> <input type= "text" defaultValue={detail.price}   
        onChange={(event) => {handleChange(event,'price')}}/>
      {/* <button><Link to={`/`}>Submit</Link></button> */}
      <button type="submit">Submit</button>
      </form>
      
    </div>
  )
}

export default EditPage