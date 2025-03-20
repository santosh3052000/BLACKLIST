import { useState,useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [drivers,setDrivers] = useState([])
  const [filterDrivers,setFilterDrivers] = useState([])
  const [isModelOpen,setIsModelOpen] = useState(false)
  const [driverData,setDriverData] = useState({Name:'',Car:'',Rank:''})
  const getDrivers = async()=>{
    try{
      const res = await axios.get("http://localhost:1000/drivers")
      setDrivers(res.data)
      setFilterDrivers(res.data)
    }catch(err){
      console.error("Error fetching users:", err)
    }
  }
  useEffect(()=>{
    getDrivers()
  },[])
  const searchFunc = async(e)=>{
    const searchText = e.target.value.toLowerCase()
    const filteredDriver = drivers?.filter((driver)=>
      driver.Name.toLowerCase().includes(searchText) ||
      driver.Car.toLowerCase().includes(searchText))
      setFilterDrivers(filteredDriver)
  }
  const handleDelete = async(id)=>{
    const isConfirm = window.confirm('U wanna delete !')
    if(isConfirm){
      await axios.delete(`http://127.0.0.1:1000/drivers/${id}`)
      getDrivers()
    }
  }
  const handleAddRacer = ()=>{
    setDriverData({Name:'',Car:'',Rank:''})
    setIsModelOpen(true)
  }
  const handleClose = ()=>{
    setIsModelOpen(false)
  }
  const handleInput = (e)=>{
    const {name,value} = e.target
    setDriverData({
      ...driverData,
      [name]: name === 'Rank' ? Number(value) : value,
    })
  }
  const handleSubmit = async(e)=>{
    e.preventDefault()
    if(driverData.id){
      await axios.put(`http://127.0.0.1:1000/drivers/${driverData.id}`,driverData)
      setIsModelOpen(false)
      getDrivers()
    }else{
      await axios.post("http://127.0.0.1:1000/drivers",driverData)
      setIsModelOpen(false)
      getDrivers()
    }
  }
  const handleEdit = (driver,id)=>{
    setDriverData({...driver,id})
    setIsModelOpen(true)
  }
  return (
    <>
    <div className='container'>
      <h2>Rap Sheet</h2>
      <div className='search'>
        <input type='text' className='search-text' placeholder='Search...'
          onChange={searchFunc} />
        <button className='add-racer' onClick={handleAddRacer}>Add Racer</button>
      </div>
      <table className='inter-text'>
        <thead>
          <tr className='t-hrow'>
            <td>Rank</td>
            <td>Name</td>
            <td>Car</td>
            <td>Edit</td>
            <td>Delete</td>
          </tr>
        </thead>
        <tbody>
          {filterDrivers.map((driver,index)=>{
            return(
              <tr key={driver._id} className='trow'>
              <td>{driver.Rank}</td>
              <td>{driver.Name}</td>
              <td>{driver.Car}</td>
              <td><button onClick={()=>handleEdit(driver,driver._id)}>Edit</button></td>
              <td><button onClick={()=>handleDelete(driver._id)}>Delete</button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {isModelOpen && (
        <div className='add-racerBox'>
          <span className='close' onClick={handleClose}>&times;</span>
          <h3>{driverData._id ? 'Edit Racer': 'Add Racer'}</h3>
          <form>
            <label>Racer name</label>
            <input type='text' name='Name' id='Name' value={driverData.Name} onChange={handleInput}/>
            <label>Car</label>
            <input type='text' name='Car' id='Car' value={driverData.Car} onChange={handleInput}/>
            <label>Rank</label>
            <input type='number' name='Rank' id='Rank' value={driverData.Rank} onChange={handleInput}/>
            <button className='add-racer' onClick={(e)=>{handleSubmit(e)}}>
            {driverData.id ? 'Update' : 'Add' }</button>
          </form>
        </div>
      )}
    </div>
    </>
  )
}

export default App
