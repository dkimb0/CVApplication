import { useState } from 'react'
import './App.css'

// function Input({title, placeholder, handleChange, fullName, onFullNameChange}){
//   return(
//     <>
//       <label htmlFor="">{title}</label>
//       <input
//         type="text"
//         value={fullName}
//         placeholder={placeholder}
//         onChange={(e) => onFullNameChange(e.target.value)}/>
//     </>
//   )
// }

function TextAreaInput({title, placeholder}){
  return(
    <>
      <label htmlFor="">{title}</label>
      <textarea placeholder={placeholder} />
    </>
  )
}

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

function PersonalDetailsPanel({ title, children }){
  return(
    <section className='panel'>
      <h1>{title}</h1>
      <form>
        {children}
      </form>
    </section>
  )
}


function PersonalDetails({ fullName, onFullNameChange, email, onEmailChange,
  phoneNumber, onPhoneNumberChange, address, onAddressChange }) {
  return(
    <section className='panel'>
      <h1>Personal Details</h1>
      <form>
        <label>Full Name</label>
        <input type="text" placeholder='John Doe' value = { fullName } 
          onChange={(e) => onFullNameChange(e.target.value)} />

        <label>Email</label>
        <input type="text" placeholder='example@gmail.com' value={email}
          onChange={(e) => onEmailChange(e.target.value)}/>

        <label>Phone Number</label>
        <input type="tel" placeholder='(555) 555-5555' value={phoneNumber}
          onChange={(e) => onPhoneNumberChange(e.target.value)}/>

        <label>Address</label>
        <input type="text" placeholder='Brooklyn, NY' value={address}
          onChange={(e) => onAddressChange(e.target.value)}/>
      </form>
    </section>
  )
}

function Education(education, handleEducationChange, handleEducationSubmit) {
  return(
    <Panel title='Education' handleEducationSubmit={handleEducationSubmit}>
      <label htmlFor='degree'>Degree</label>
      <input type='text' id="degree" name="degree" placeholder='Software Engineering' value={education.degree}
        onChange = {handleEducationChange}/>
      {/* <Input title='School' placeholder='Columbia University'/>
      <Input title='City' placeholder='New York'/>
      <Input title='Country' placeholder='USA'/>
      <Input title='Start Date' placeholder='mm/yyyy'/>
      <Input title='End Date' placeholder='mm/yyyy'/> */}
    </Panel>
  )
}

function Experience() {
  return(
    <Panel title="Experience">
      <Input title='Company Name' placeholder='Google'/>
      <Input title='Position Title' placeholder='Full Stack Developer'/>
      <Input title='Location' placeholder='New York'/>
      <Input title='Start Date' placeholder='mm/yyyy'/>
      <Input title='End Date' placeholder='mm/yyyy'/>      
      <TextAreaInput title='Description' placeholder=''/>
    </Panel>
  )
}

function Sidebar({ fullName, onFullNameChange, email, onEmailChange,
  phoneNumber, onPhoneNumberChange, address, onAddressChange,
  handleEducationChange, handleEducationSubmit, education }) {
  return(
    <div className='sidebar'>
      <PersonalDetails
        fullName = { fullName }
        onFullNameChange = { onFullNameChange }
        email = { email }
        onEmailChange= { onEmailChange }
        phoneNumber = { phoneNumber }
        onPhoneNumberChange = {onPhoneNumberChange}
        address={address}
        onAddressChange={onAddressChange}
        />

      <Education
        education = {education}
        handleEducationChange = {handleEducationChange}
        handleEducationSubmit = {handleEducationSubmit}
      />
      {/* <Experience /> */}
    </div>
  )
}

function Resume({fullName, email, phoneNumber, address}){
  return(
    <div className='resume'>
      <header className='personalDetails'>
        <p>{fullName}</p>
        <p>{email}</p>
        <p>{phoneNumber}</p>
        <p>{address}</p>
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
