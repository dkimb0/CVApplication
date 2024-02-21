import { useState } from 'react'
import './App.css'


function Panel({ title, children, education, setEducation, addEducation, inputArray, deleteItem, handleEdit, educationArray }){
  const [isActive, setIsActive] = useState(false);
  const [formActive, setFormActive] = useState(false);
  const [formEdit, setFormEdit] = useState(false);
  const [indexOfEdit, setIndexOfEdit] = useState(0)

  const handleEducationSubmit = (e) => {
    e.preventDefault();
    if(formEdit){
      handleEdit(indexOfEdit);
      
    }else{
      addEducation(education);
    }
    setEducation([]);
    setFormActive(false);
  }
  
  return(
    <section className='panel'>
      <h1>{title}</h1>
      {formActive ? (
        <form onSubmit={handleEducationSubmit}>
          {children}
          <button type='submit'>Save</button>
          <button onClick={() => {
            setFormActive(false);
            setEducation([]);
            }}>Cancel</button>
        </form>    
      ) : (
        <>
          <ul>
            {inputArray.map(education => {
              return(
                  <li key={education.idForm}>
                    <span>{education.school}</span>
                    <button onClick={() => {
                      setFormEdit(true);
                      const index = educationArray.findIndex(edu => edu.idForm === education.idForm);
                      setIndexOfEdit(index)
                      setEducation(educationArray[index]);
                      setFormActive(true);
                    }}>🖊️</button>
                    <button onClick={() => deleteItem(education.idForm)}>🗑️</button>
                  </li>
              )
            })}
          </ul>
          <button onClick={() => {
            setFormEdit(false);
            setFormActive(true);
            }}>+ Education</button>
        </>
      )}
      

      {/* {isActive ? (
        <form onSubmit={handleEducationSubmit}>
          <button onClick={() => setIsActive(false)}>Hide</button>
          {children}
          <button type='submit'>Submit</button>
        </form>
      ) : (
        <button onClick={()
           => setIsActive(true)}>Show</button>
      )} */}
    </section>
  )
}

function Resume({fullName, email, phoneNumber, address, educationArray}){
  return(
    <div className='resume'>
      <header className='personalDetails'>
        <p className='fullName'>{fullName}</p>
        <section className='contactInfo'>
          <span className='email'>{email}</span>
          <span className='phoneNumber'>{phoneNumber}</span>
          <span className='address'>{address}</span>
        </section>

      </header>
      
      <ul className='education'>
        {educationArray.map(education => {
          return(
            <li key={education.idResume}>
              <span>{education.school}</span>
              <span>{education.degree}</span>
              <span>{education.location}</span>
              <span>{education.startDate}</span>
              <span>{education.endDate}</span>
            </li>
          )
        })}
      </ul>
      
      <section className='experience'>
      
      </section>
    </div>
  )
}

export default function App() {
  const [personalDetails, setPersonalDetails] = useState({fullName: '', email: '', phoneNumber: '',
    address: ''});
  const [educationArray, setEducationArray] = useState([]);
  const [education, setEducation] = useState({});

  function addEducation(education){
    setEducationArray(currentEducationArray => {
      return [
        ...currentEducationArray,  {...education, idResume: crypto.randomUUID(), idForm: crypto.randomUUID()}
      ]
    })
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    setEducation(currentEducation => ({...currentEducation, [name]: value}));
  }

  const deleteItem = (id) => {
    setEducationArray(currentArray => {
      return currentArray.filter(item => item.idForm !== id);
    })
  }

  const handleEdit = (index) => {
    setEducationArray(currentEducationArray => {
      currentEducationArray[index] = { ...education, idResume:crypto.randomUUID(), idForm: crypto.randomUUID() };
      return currentEducationArray
    })
    // setEducation([]);
  }


  return(
    <>
      <div>
        <section className='panel'>
          <h1>Personal Details</h1>
          <form>
            <label>Full Name</label>
            <input type="text" placeholder='John Doe' value = { personalDetails.fullName } 
              onChange={(e) => setPersonalDetails({...personalDetails, fullName: e.target.value})} />

            <label>Email</label>
            <input type="text" placeholder='example@gmail.com' value={personalDetails.email}
              onChange={(e) => setPersonalDetails({...personalDetails, email: e.target.value})}/>

            <label>Phone Number</label>
            <input type="text" placeholder='(555) 555-5555' value={personalDetails.phoneNumber}
              onChange={(e) => setPersonalDetails({...personalDetails, phoneNumber: e.target.value})}/>

            <label>Address</label>
            <input type="text" placeholder='Brooklyn, NY' value={personalDetails.address}
              onChange={(e) => setPersonalDetails({...personalDetails, address: e.target.value})}/>
          </form>
        </section>

        <Panel title='Education' education={education} setEducation={setEducation} addEducation={addEducation}
          inputArray={educationArray} deleteItem={deleteItem} handleEdit={handleEdit} educationArray ={educationArray}>
          <label htmlFor='school'>School</label>
          <input type='text' id='school' name='school' placeholder='Columbia University'
            onChange={handleChange} defaultValue={education.school || ''}
          />
          <label htmlFor='degree'>Degree</label>
          <input type='text' id="degree" name="degree" placeholder='Software Engineering'
            onChange = {handleChange} defaultValue={education.degree || ''}
          />
          <label htmlFor='location'>Location</label>
          <input type='text' id='location' name='location' placeholder='New York'
            onChange = {handleChange} defaultValue={education.location || ''}
          />
          <label htmlFor='startDate'>Start Date</label>
          <input type='text' id='startDate' name='startDate' placeholder='mm/yyyy'
            onChange = {handleChange} defaultValue={education.startDate || ''}
          />
          <label htmlFor='endDate'>End Date</label>
          <input type='text' id='endDate' name='endDate' placeholder='mm/yyyy'
            onChange = {handleChange} defaultValue={education.endDate || ''}
          />
        </Panel>

        {/* <Panel title="Experience">
          <label>Company Name</label>
          <input title='Company Name' placeholder='Google'/>
          <input title='Position Title' placeholder='Full Stack Developer'/>
          <input title='Location' placeholder='New York'/>
          <input title='Start Date' placeholder='mm/yyyy'/>
          <input title='End Date' placeholder='mm/yyyy'/>      
          <label>Description</label>
          <textarea placeholder='Description' />
        </Panel> */}
      </div>


      <Resume
        fullName={personalDetails.fullName}
        email={personalDetails.email}
        phoneNumber={personalDetails.phoneNumber}
        address={personalDetails.address}
        educationArray = {educationArray}


      >

      </Resume>
    </>
  )
}