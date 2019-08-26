import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/ContactContext";

const ContactForm = () => {
  const contactContext = useContext(ContactContext);

  const { addContact, updateContact, clearCurrent, current } = contactContext;

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: "",
        email: "",
        phone: "",
        type: "pessoal"
      });
    }
  }, [contactContext, current]);

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "pessoal"
  });

  const { name, email, phone, type } = contact;

  const onChange = e =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const clearAll = () => {
    clearCurrent();
  };

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
    clearAll();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current ? "Editar Contato" : "Adicionar Contato"}
      </h2>
      <input
        type='text'
        placeholder='Nome'
        name='name'
        value={name}
        onChange={onChange}
      />
      <input
        type='email'
        placeholder='E-mail'
        name='email'
        value={email}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Telefone'
        name='phone'
        value={phone}
        onChange={onChange}
      />
      <h5>Tipo do Contato</h5>
      <input
        type='radio'
        name='type'
        value='pessoal'
        checked={type === "pessoal"}
        onChange={onChange}
      />{" "}
      Pessoal{" "}
      <input
        type='radio'
        name='type'
        value='profissional'
        checked={type === "profissional"}
        onChange={onChange}
      />{" "}
      Profissional
      <div>
        <input
          type='submit'
          value={current ? "Atualizar Contato" : "Adicionar Contato"}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Cancelar
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
