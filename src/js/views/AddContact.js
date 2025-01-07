import React, { useContext, useEffect } from "react";
import "../../styles/AddContact.css"; 
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { useState } from "react";


export const AddContact = () => {

  const { store, actions } = useContext(Context);
  const navigate = useNavigate()

   const { id } = useParams();
  
      useEffect(() => {
          if (id) {
            const contactToEdit = store.contacts.find((contact) => contact.id === parseInt(id));
          if (contactToEdit) {
              setFormData(contactToEdit); 
            }
          }
        }, [id, store.contacts]);
  
        const handleSubmit = (e) => {
          e.preventDefault();
          if (id) {
            console.log("Editing contact:", id, formData);
            actions.updateContact(id, formData);
          } else {
            console.log("Creating new contact:", formData);
            actions.handleAddContact(formData, navigate);
          }
          navigate("/");
        };


  const [formData, setFormData] = useState({
    name : '',
    phone : '',
    email : '',
    address : ''
  })
  
  const handleChange = e => {
    const { name, value } =e.target
    setFormData({...formData, [name]: value})
  }

  const handleAddContact = e => {
    e.preventDefault();
    actions.handleAddContact(formData, navigate)

    const name = e.target.elements.name.value;
    const phone = e.target.elements.phone.value;
    const email = e.target.elements.email.value;
    const address = e.target.elements.address.value;

    if(id) {
      actions.updateContact(id, {name, phone, email, address})
    }
    else{
      actions.addContact({name, phone, email, address})
    }
    e.target.reset()
  } 

  return (

    <form className="form mx-auto" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label for="name" className="form-label">Name</label>
        <input type="text" className="form-control" placeholder="Name" name="name" onChange={handleChange} value={formData.name} required />
      </div>
      <div className="mb-3">
        <label for="phone" className="form-label">Phone</label>
        <input type="tel" className="form-control" placeholder="Phone Number" name="phone" onChange={handleChange} value={formData.phone} required/>
      </div>
      <div className="mb-3">
        <label for="email" className="form-label">Email</label>
        <input type="email" className="form-control" placeholder="E-Mail" name="email" onChange={handleChange} value={formData.email} required/>
      </div>
      <div className="mb-3">
        <label for="address" className="form-label">Address</label>
        <input type="text" className="form-control" placeholder="Address" name="address" onChange={handleChange} value={formData.address} required/>
      </div>      
      <div className="d-flex justify-content-between">
        <Link to="/" className="btn btn-secondary button2">Go back home</Link>
        <input type="submit" className="btn btn-dark button1" value={id ? "Upadte contact" : "Add contact"}/>
      </div>
    </form>
  )
}