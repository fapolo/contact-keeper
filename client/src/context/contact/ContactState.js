import React, { useReducer } from "react";
import uuid from "uuid";
import ContactContext from "./ContactContext";
import contactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from "../types";

const ContactState = props => {
  const initialState = {
    //test seed
    contacts: [
      {
        id: 1,
        name: "Jill Johnson",
        email: "jill@gmail.com",
        phone: "111-111-111",
        type: "pessoal"
      },
      {
        id: 2,
        name: "Sara Watson",
        email: "sara@gmail.com",
        phone: "222-222-222",
        type: "pessoal"
      },
      {
        id: 3,
        name: "Harry White",
        email: "harry@gmail.com",
        phone: "333-333-333",
        type: "profissional"
      }
    ]
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // ADICIONAR CONTATO

  // REMOVER CONTATO

  // RECUPERAR CONTATO ATUAL

  // REMOVER CONTATO ATUAL

  // ATUALIZAR CONTATO

  // FILTRAR CONTATOS

  // LIMPAR FILTRO

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
