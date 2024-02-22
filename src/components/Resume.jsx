export default function Resume({personalDetails, educationArray, experienceArray}){
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