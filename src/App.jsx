import { useState } from 'react'
import './App.css'

function Input({title, placeholder}){
  return(
    <>
      <label htmlFor="">{title}</label>
      <input type="text" placeholder={placeholder} />
    </>
  )
}

function TextAreaInput({title, placeholder}){
  return(
    <>
      <label htmlFor="">{title}</label>
      <textarea placeholder={placeholder} />
    </>
  )
}

function SubmitButton() {
  return(
    <>
      <button>Submit</button>
    </>
  )
}

function Panel({ title, children }){
  const [isActive, setIsActive] = useState(false);

  return(
    <section className='panel'>
      <h1>{title}</h1>
      {isActive ? (
        <form action="">
          <button onClick={() => setIsActive(false)}>Hide</button>
          {children}
        </form>
        
      ) : (
        <button onClick={() => setIsActive(true)}>Show</button>
      )}

    </section>
  )
}


function PersonalDetails() {
  return(
    <Panel title="Personal Details">
      <Input title = 'Full Name' placeholder = 'John Doe' />
      <Input title = 'Email' placeholder = 'example@gmail.com' />
      <Input title = 'Phone Number' placeholder = '(555) 555-5555' />
      <Input title = 'Address' placeholder = 'Brooklyn, NY' />
      <SubmitButton />
    </Panel>
  )
}

function Education() {
  return(
    <Panel title='Education'>
      <Input title='Degree' placeholder='Software Engineering'/>
      <Input title='School' placeholder='Columbia University'/>
      <Input title='City' placeholder='New York'/>
      <Input title='Country' placeholder='USA'/>
      <Input title='Start Date' placeholder='mm/yyyy'/>
      <Input title='End Date' placeholder='mm/yyyy'/>
      <SubmitButton />
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
      <SubmitButton />
    </Panel>

  )
}

function Sidebar() {
  return(
    <div className='sidebar'>
      <PersonalDetails />
      <Education />
      <Experience />

    </div>
  )
}

function Resume(){
  return(
    <div className='resume'>
      
    </div>
  )
}

function FullPage(){

  const [text, setText] = useState('');

  return(
    <>
      <Sidebar />
      <Resume />
    </>
  )
}

function App() {
  return FullPage()

}

export default App
