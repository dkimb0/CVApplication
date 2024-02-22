import { useState } from "react";

export default function Panel({ title, children,
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