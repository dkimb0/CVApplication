import { useState } from 'react'
import './App.css'


function Panel({ title, children, handleEducationSubmit }){
  const [isActive, setIsActive] = useState(false);

  return(
    <section className='panel'>
      <h1>{title}</h1>
      {isActive ? (
        <form onSubmit={handleEducationSubmit}>
          <button onClick={() => setIsActive(false)}>Hide</button>
          {children}
          <button type='submit'>Submit</button>
        </form>
      ) : (
        <button onClick={() => setIsActive(true)}>Show</button>
      )}
    </section>
  )
}

function Resume({fullName, email, phoneNumber, address}){
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
      
      <section className='education'>
          
      </section>
      
      <section className='experience'>
      
      </section>
    </div>
  )
}

function App() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  const [education, setEducation] = useState({degree: '', school: '', city: '', country: '',
    startDate: '', endDate: ''});

  const handleEducationChange = (e) => {
    const {name, value} = e.target;
    setEducation(values => ({...values, [name]: value}));
  };

  const handleEducationSubmit = (e) => {
    e.preventDefault();
    alert(education.degree);
    
  }

  return(
    <>
      <div>
        <section className='panel'>
          <h1>Personal Details</h1>
          <form>
            <label>Full Name</label>
            <input type="text" placeholder='John Doe' value = { fullName } 
              onChange={(e) => setFullName(e.target.value)} />

            <label>Email</label>
            <input type="text" placeholder='example@gmail.com' value={email}
              onChange={(e) => setEmail(e.target.value)}/>

            <label>Phone Number</label>
            <input type="tel" placeholder='(555) 555-5555' value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}/>

            <label>Address</label>
            <input type="text" placeholder='Brooklyn, NY' value={address}
              onChange={(e) => setAddress(e.target.value)}/>
          </form>
        </section>

        <Panel title='Education' handleEducationSubmit={handleEducationSubmit}>
          <label htmlFor='school'>School</label>
          <input type='text' id='school' name='school' placeholder='Columbia University'
            value={education.school}
            onChange = {handleEducationChange}
          />
          <label htmlFor='degree'>Degree</label>
          <input type='text' id="degree" name="degree" placeholder='Software Engineering'
            value={education.degree}
            onChange = {handleEducationChange}
          />
          <label htmlFor='location'>Location</label>
          <input type='text' id='location' name='location' placeholder='New York'
            value={education.location}
            onChange = {handleEducationChange}
          />
          <label htmlFor='startDate'>Start Date</label>
          <input type='text' id='startDate' name='startDate' placeholder='mm/yyyy'
            value={education.startDate}
            onChange = {handleEducationChange}
          />
          <label htmlFor='endDate'>End Date</label>
          <input type='text' id='endDate' name='endDate' placeholder='mm/yyyy'
            value={education.endDate}
            onChange = {handleEducationChange}
          />
        </Panel>

        <Panel title="Experience">
          <label>Company Name</label>
          <input title='Company Name' placeholder='Google'/>
          <input title='Position Title' placeholder='Full Stack Developer'/>
          <input title='Location' placeholder='New York'/>
          <input title='Start Date' placeholder='mm/yyyy'/>
          <input title='End Date' placeholder='mm/yyyy'/>      
          <label>Description</label>
          <textarea placeholder='Description' />
        </Panel>
      </div>


      <Resume
        fullName={fullName}
        email={email}
        phoneNumber={phoneNumber}
        address={address}


      >

      </Resume>
    </>
  )
}

export default App
