import React, { useEffect, useState} from 'react'
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function HelloWorld() {
    const [records, setRecords]= useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [firstNumberInPage,setFirstNumberInPage] = useState(1);
    const [lastNumberInPage,setLastNumberInPage] = useState(5)
    const [numbers,setNumbers] = useState([...Array(lastNumberInPage + 1).keys()].slice(1));
    const [selectedValue, setSelectedValue] = useState('');
    const [inputDisable, setInputDisable]  = useState(true);
    const [updateValue,setUpdatedValue] = useState('');
    const [selectedId, setSelectedId] = useState(0);
    const location = useLocation();
    const data = location.state;
    const navigate = useNavigate();
    
    useEffect(() => {
      if(!inputDisable)
      {
        afterSubmit();
      }
      
    }, [records]);
  function afterSubmit()
  {   
    if(data != null && records.length > 0)
    {   
        let ind = records.findIndex((rec)=>{return location.state?.id  == rec.id});
        if(ind> -1)
        {
          records[ind].title = location?.state.title;
          records[ind].price =  location?.state.price;
          setRecords(records); 
          setInputDisable(true);
        }
        
    }
  }
   
    useEffect(() => {
      if (records.length === 0) {
        console.log("iii")
        fetch('https://dummyjson.com/products?limit=5&skip=0&select=title,price')
        .then( res => res.json())
        .then( data => {
            setRecords(data.products)
            setInputDisable(false);
        })
      }
      }, []);
    

  function onPreviousClick()
  {     
    if(currentPage != 1)
    {   
        let prevPage = currentPage-1
        if(currentPage % 5 === 1)
        {   
            setNumbers(numbers.map((n) => n - 5))
        }
        setCurrentPage(prevPage);
        getRecordPerPage(prevPage);
    }
  }

  function onPageNumerClick(num)
  {     
        console.log("num click",num);
        setCurrentPage(num);
        getRecordPerPage(num)
  }

  function onNextClick()
  { 
    if(currentPage < lastNumberInPage)
    {
        let nxtPage = currentPage + 1;
        setCurrentPage(nxtPage);
        getRecordPerPage(nxtPage);
    }
    else
    {   
        setLastNumberInPage(lastNumberInPage+5)
        setCurrentPage(lastNumberInPage+1,()=>{
            setFirstNumberInPage(lastNumberInPage+1)
        });
        setNumbers(numbers.map((n) => n + 5))
        getRecordPerPage(firstNumberInPage);
    }
       
  }
  function getRecordPerPage(num)
  {
    const skipVal = (num - 1) * 5
    console.log("skipVal",skipVal);
    fetch('https://dummyjson.com/products?limit=5&'+'skip='+skipVal+'&select=title')
    .then(resp => resp.json())
    .then(data => setRecords(data.products))
  }
  function onRemoveClick()
  { 
    setSelectedValue('');
    setUpdatedValue('');
    setRecords([]);

  }


  function handleRowDoubleClick(title,selectedId) {
    setSelectedValue(title);
    setSelectedId(selectedId);
    if(updateValue == '')
    {
        setUpdatedValue(title)
    }
    navigate(`/edit/${selectedId}`);
    
  }

  function onEditClick()
  { 
    setInputDisable(false);
  }
  function onUpdateClick(event)
  {
    
    let index = records.findIndex((val)=>(
         val.title === selectedValue
    ));
    if(index > -1)
    {
        records[index].title = updateValue;
        setRecords(records);
        setSelectedValue(updateValue);
    }
    setInputDisable(true);
   
  }
function onDeleteClick()
  { 
    if(records.length)
    {
        const newRecord =records.filter((rec)=>(
            rec.title != selectedValue
         ))
         console.log("newRecord",newRecord);
         setRecords(newRecord);
    }
 
  }
  return (
    <div>
    <table style={{border: '1px solid black'}}>
            <thead>
            <tr>
            <th>Title</th>
            <th>Price</th>
          </tr>
            </thead>
            <tbody>
            {records.map((list) =>(
                <tr key= {list.id} id={toString(list.id)}>
                    <td style={{ border: '1px solid black',padding:'0.5rem',
                    
                }} onClick={() =>{handleRowDoubleClick(list.title,list.id)}}>{list.title}</td>
                   {/* {<td>{list.category}</td>}
                {<td style={{ border: '1px solid black',padding:'0.5rem'}}>{list.description}</td>}
                {<td style={{ border: '1px solid black',padding:'0.5rem'}}>{list.brand}</td>} */}
                
                {<td  key= {list.id} id={toString(list.id)} style={{ border: '1px solid black',padding:'0.5rem'}} 
                 onClick={() =>{handleRowDoubleClick(list.title,list.id)}}
                >{list.price}</td>}
                </tr>
            ))}
            </tbody>
           
    </table>

    {/* <ButtonEdit
      inputDisable={inputDisable}
      selectedValue={selectedValue}
      setUpdatedValue ={setUpdatedValue}
onEditClick={onEditClick}
onUpdateClick={onUpdateClick}
onDeleteClick={onDeleteClick}
    ></ButtonEdit> */}
              

    <nav>
        <ul>

            <li style={{display: 'inline-block',
                    marginRight: '10px'}}>
                <a href="#" onClick={onPreviousClick}
                >Previous</a>
            </li>
            {numbers.map((num,index) =>(
                <li key ={index} style={{display: 'inline-block',
                    marginRight: '10px'}}>
                    <a href='#' onClick={() => {onPageNumerClick(num)}}>{num}</a>
                </li>
            ))}
            <li style={{display: 'inline-block',
                    marginRight: '10px'}}>
                <a href="#" onClick={onNextClick}
                >Next</a>
            </li>
        </ul>
    </nav>
    <button style={{"color":'red',fontWeight:'bold'}} onClick={onRemoveClick}>Remove All</button>
    </div>
  )
}
