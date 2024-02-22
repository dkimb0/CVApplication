import { useState, useEffect } from 'react'
import './App.css'

function Panel({ title, children,
  item, setItem, itemArray, setItemArray,
  addItem, deleteItem, submitEdit }){
    
  const [formActive, setFormActive] = useState(false);
  const [formEdit, setFormEdit] = useState(false);
  const [indexOfEdit, setIndexOfEdit] = useState(0)

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formEdit){
      submitEdit(indexOfEdit, item, setItemArray);
    }else{
      addItem(item, setItemArray);
    }
    setItem([]);
    setFormActive(false);
  }
  
  return(
    <section className='panel'>
      <h2>{title}</h2>

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
                  <li className='panel-item' key={item.idForm}>
                    <p className='panel-item-title'>{item.school || item.company}</p>
                    <div className='panel-item-btns'>
                      <button onClick={() => {
                        setFormEdit(true);
                        const index = itemArray.findIndex(it => it.idForm === item.idForm);
                        setIndexOfEdit(index)
                        setItem(itemArray[index]);
                        setFormActive(true);
                      }}>Edit</button>
                      <button onClick={() => deleteItem(item.idForm, setItemArray)}>X</button>
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

function Resume({personalDetails, educationArray, experienceArray}){
  return(
    <div className='resume'>
      <header className='personalDetails'>
        <p className='fullName'>{personalDetails.fullName}</p>
        <section className='contactInfo'>
          <span className='email'>{personalDetails.email}</span>
          <span className='phoneNumber'>{personalDetails.phoneNumber}</span>
          <span className='address'>{personalDetails.address}</span>
        </section>

      </header>
      
      {educationArray.length > 0 && <h2 className='resumeSectionHeader'>Education</h2>}
      <ul className='resumeSection'>
        {educationArray.map(education => {
          return(
            <li className='resume-item' key={education.idResume}>
              <div className='date-location'>
                <p>{education.startDate} - {education.endDate}</p>
                <p>{education.location}</p>
              </div>
              <div className='item-main-details'>
                <p className='item-detail-bold'>{education.school}</p>
                <p>{education.degree}</p>
              </div>
            </li>
          )
        })}
      </ul>
      
      {experienceArray.length > 0 && <h2 className='resumeSectionHeader'>Experience</h2>}
      <ul className='resumeSection'>
          {experienceArray.map(experience => {
            return(
              <li className='resume-item' key={experience.idResume}>
                <div className='date-location'>
                  <p>{experience.startDateExperience} - {experience.endDateExperience}</p>
                  <p>{experience.location}</p>
                </div>
                <div className='item-main-details'>
                  <p className='item-detail-bold'>{experience.company}</p>
                  <p>{experience.position}</p>
                  <p>{experience.description}</p>
                </div>
              </li>
            )
        })}
      </ul>
    </div>
  )
}

export default function App() {
  const [personalDetails, setPersonalDetails] = useState( () => {
    const localValue = localStorage.getItem("personalDetails");
    if(localValue === null) return {};
    return JSON.parse(localValue);
  });

  const [educationArray, setEducationArray] = useState(() => {
    const localValue = localStorage.getItem('educationArray');
    if(localValue === null) return [];
    return JSON.parse(localValue);
  });
  const [education, setEducation] = useState( () => {
    const localValue = localStorage.getItem('education');
    if(localValue === null) return {};
    return JSON.parse(localValue);
  });
  const [experienceArray, setExperienceArray] = useState(()=> {
    const localValue = localStorage.getItem('experienceArray');
    if(localValue === null) return [];
    return JSON.parse(localValue);
  });

  const [experience, setExperience] = useState(() => {
    const localValue = localStorage.getItem('experience');
    if(localValue === null) return {};
    return JSON.parse(localValue);
  });

  useEffect(()=> {
    localStorage.setItem("personalDetails", JSON.stringify(personalDetails))
  }, [personalDetails]);

  useEffect(() => {
    localStorage.setItem('educationArray', JSON.stringify(educationArray))
  }, [educationArray]);

  useEffect(() => {
    localStorage.setItem('education', JSON.stringify(education))
  }, [education]);

  useEffect(() => {
    localStorage.setItem('experienceArray', JSON.stringify(experienceArray))
  }, [experienceArray]);

  useEffect(() => {
    localStorage.setItem('experience', JSON.stringify(experience))
  }, [experience]);

  const handleEducationChange = (e) => {
    const {name, value} = e.target;
    setEducation(currentEducation => ({...currentEducation, [name]: value}));
  }
  const handleExperienceChange = (e) => {
    const {name, value} = e.target;
    setExperience(currentExperience => ({...currentExperience, [name]: value}));
  }


  function addItem(item, setItemArray){
    setItemArray(currentArray => {
      return [
        ...currentArray,  {...item, idResume: crypto.randomUUID(), idForm: crypto.randomUUID()}
      ]
    })
  }

  const deleteItem = (id, setItemArray) => {
    setItemArray(currentArray => {
      return currentArray.filter(item => item.idForm !== id);
    })
  }
  
  const submitEdit = (index, item, setItemArray) => {
    setItemArray(currentArray => {
      currentArray[index] = { ...item, idResume:crypto.randomUUID(), idForm: crypto.randomUUID() };
      return currentArray
    })
  }
  


  return(
    <>
      <div className='sidebar'>
        
        <section>
          <h2>Personal Details</h2>
          <form className='personalDetailsForm'>
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

        <Panel title = {'Education'} item={education} setItem={setEducation}
          itemArray ={educationArray} setItemArray={setEducationArray}
          addItem={addItem} deleteItem={deleteItem} submitEdit={submitEdit}>
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
          itemArray={experienceArray} setItemArray={setExperienceArray}
          addItem={addItem} deleteItem={deleteItem} submitEdit={submitEdit}>
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
        personalDetails={personalDetails}
        educationArray={educationArray}
        experienceArray={experienceArray}
      >
      </Resume>
    </>
  )
}