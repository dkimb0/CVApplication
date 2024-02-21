import { useState } from 'react'
import './App.css'

function Panel({ title, children, item, setItem, addItem,
  deleteItem, submitEdit, itemArray }){
  const [formActive, setFormActive] = useState(false);
  const [formEdit, setFormEdit] = useState(false);
  const [indexOfEdit, setIndexOfEdit] = useState(0)

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formEdit){
      submitEdit(indexOfEdit);
    }else{
      addItem(item);
    }
    setItem([]);
    setFormActive(false);
  }
  
  return(
    <section className='panel'>
      <h1>{title}</h1>

      {formActive ? (
        <form onSubmit={handleSubmit}>
          {children}
          <button type='submit'>Save</button>
          <button onClick={() => {
            setFormActive(false);
            setItem([]);
            }}>Cancel</button>
        </form>    
      ) : (
        <>
          <ul className='panel-items'>
            {itemArray.map(item => {
              return(
                  <li key={item.idForm}>
                    <span>{item.school || item.company}</span>
                    <div className='panel-item-btns'>
                      <button onClick={() => {
                        setFormEdit(true);
                        const index = itemArray.findIndex(it => it.idForm === item.idForm);
                        setIndexOfEdit(index)
                        setItem(itemArray[index]);
                        setFormActive(true);
                      }}>Edit</button>
                      <button onClick={() => deleteItem(item.idForm)}>Delete</button>
                    </div>
                  </li>
              )
            })}
          </ul>
          <button onClick={() => {
            setFormEdit(false);
            setFormActive(true);
            }}>+ {title}</button>
        </>
      )}
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
        {educationArray.length > 0 && <h2 className='resumeSectionHeader'>Education</h2>}
        {educationArray.map(education => {
          return(
            <li className='education-item' key={education.idResume}>
              <div className='education-date-location'>
                <span>{education.startDate} - {education.endDate}</span>
                <span>{education.location}</span>
              </div>
              <div className='education-school-degree'>
                <span className='education-school'>{education.school}</span>
                <span>{education.degree}</span>
              </div>
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
  const [experienceArray, setExperienceArray] = useState([]);
  const [experience, setExperience] = useState({});

  function addEducation(education){
    setEducationArray(currentEducationArray => {
      return [
        ...currentEducationArray,  {...education, idResume: crypto.randomUUID(), idForm: crypto.randomUUID()}
      ]
    })
  }

  const handleEducationChange = (e) => {
    const {name, value} = e.target;
    setEducation(currentEducation => ({...currentEducation, [name]: value}));
  }

  const deleteEducationItem = (id) => {
    setEducationArray(currentArray => {
      return currentArray.filter(item => item.idForm !== id);
    })
  }

  const submitEducationEdit = (index) => {
    setEducationArray(currentEducationArray => {
      currentEducationArray[index] = { ...education, idResume:crypto.randomUUID(), idForm: crypto.randomUUID() };
      return currentEducationArray
    })
  }

  function addExperience(experience){
    setExperienceArray(currentExperienceArray => {
      return [
        ...currentExperienceArray,  {...experience, idResume: crypto.randomUUID(), idForm: crypto.randomUUID()}
      ]
    })
  }

  const handleExperienceChange = (e) => {
    const {name, value} = e.target;
    setExperience(currentExperience => ({...currentExperience, [name]: value}));
  }

  const deleteExperienceItem = (id) => {
    setExperienceArray(currentArray => {
      return currentArray.filter(item => item.idForm !== id);
    })
  }

  const submitExperienceEdit = (index) => {
    setExperienceArray(currentExperienceArray => {
      currentExperienceArray[index] = { ...experience, idResume:crypto.randomUUID(), idForm: crypto.randomUUID() };
      return currentExperienceArray
    })
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

        <Panel title = {'Education'} item={education} setItem={setEducation} addItem={addEducation}
          deleteItem={deleteEducationItem} submitEdit={submitEducationEdit}
          itemArray ={educationArray}>
          <label htmlFor='school'>School</label>
          <input type='text' id='school' name='school' placeholder='Columbia University'
            onChange={handleEducationChange} defaultValue={education.school || ''}
          />
          <label htmlFor='degree'>Degree</label>
          <input type='text' id="degree" name="degree" placeholder='Software Engineering'
            onChange = {handleEducationChange} defaultValue={education.degree || ''}
          />
          <label htmlFor='location'>Location</label>
          <input type='text' id='location' name='location' placeholder='New York'
            onChange = {handleEducationChange} defaultValue={education.location || ''}
          />
          <label htmlFor='startDate'>Start Date</label>
          <input type='text' id='startDate' name='startDate' placeholder='mm/yyyy'
            onChange = {handleEducationChange} defaultValue={education.startDate || ''}
          />
          <label htmlFor='endDate'>End Date</label>
          <input type='text' id='endDate' name='endDate' placeholder='mm/yyyy'
            onChange = {handleEducationChange} defaultValue={education.endDate || ''}
          />
        </Panel>

        <Panel title={'Experience'} item={experience} setItem={setExperience} 
        addItem={addExperience} deleteItem={deleteExperienceItem}
        submitEdit={submitExperienceEdit} itemArray={experienceArray}>
          <label htmlFor='company'>Company Name</label>
          <input type='text' id='company' name='company' placeholder='Google'
            onChange={handleExperienceChange} defaultValue={experience.company || ''}
          />
          <label htmlFor='position'>Position Title</label>
          <input type='text' id='position' name='position' placeholder='Developer'
            onChange={handleExperienceChange} defaultValue={experience.position || ''}
          />
          <label htmlFor='location'>Location</label>
          <input type='text' id='location' name='location' placeholder='New York'
            onChange={handleExperienceChange} defaultValue={experience.location || ''}
          />
          <label htmlFor='startDateExperience'>Start Date</label>
          <input type='text' id='startDateExperience' name='startDateExperience' placeholder='mm/yyyy'
            onChange={handleExperienceChange} defaultValue={experience.startDateExperience || ''}
          />
          <label htmlFor='endDateExperience'>End Date</label>
          <input type='text' id='endDateExperience' name='endDateExperience' placeholder='mm/yyyy'
            onChange={handleExperienceChange} defaultValue={experience.endDateExperience || ''}
          />
    
          <label htmlFor='description'>Description</label>
          <textarea id='description' name='description' placeholder='Description'
            onChange={handleExperienceChange} defaultValue={experience.description || ''}
          />
        </Panel>

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