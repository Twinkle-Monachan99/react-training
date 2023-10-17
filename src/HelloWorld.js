import React, { useEffect, useState } from 'react'

export default function HelloWorld() {
    const [records, setRecords]= useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecords, getTotalRecord] = useState(0);
    const recordsInPage = 5;
    const [firstNumberInPage,setFirstNumberInPage] = useState(1);
    const [lastNumberInPage,setLastNumberInPage] = useState(5)
    const [numbers,setNumbers] = useState([...Array(lastNumberInPage + 1).keys()].slice(1));
    const [selectedValue, setSelectedValue] = useState('');
    const [inputDisable, setInputDisable]  = useState(true);
    const [updateValue,setUpdatedValue] = useState('');
    useEffect(() => {
        fetch('https://dummyjson.com/products?limit=5&skip=0&select=title,price')
        .then( res => res.json())
        .then( data => {
            setRecords(data.products)
            getTotalRecord(data.total);
        })
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


  function handleRowDoubleClick(event) {
    setSelectedValue(event.target.textContent);
    if(updateValue == '')
    {
        setUpdatedValue(event.target.textContent)
    }
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
                </tr>
            </thead>
            <tbody>
            {records.map((list) =>(
                <tr key= {list.id} id={list.id}>
                    <td style={{ border: '1px solid black',padding:'0.5rem',
                    
                }} onClick={handleRowDoubleClick}>{list.title}</td>
                   {/* <td>{list.category}</td>  */}
                </tr>
            ))}
            </tbody>
    </table>
    <span style={{fontWeight:'bold'}}>Title:
     {!inputDisable ? <input type="text" defaultValue={selectedValue}
     onChange={event=> setUpdatedValue(event.target.value)}
     /> :
     <label>{selectedValue}</label>}
     </span>
    <button style={{fontWeight:'bold'}} onClick={onEditClick}>Edit</button>
    {!inputDisable ? <button style={{fontWeight:'bold'}} onClick={onUpdateClick}>Update</button>
    : <button style={{fontWeight:'bold'}} onClick={onDeleteClick} >Delete</button>
    }  

    
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
