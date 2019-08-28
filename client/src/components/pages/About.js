import React from "react";

const About = () => {
  return (
    <div>
      <h1>Sobre esta aplicação</h1>
      <p className='my-1'>
        Aplicação React Full Stack para controlar contatos. Resultado de curso
        para aprendizado de React.
      </p>
      <p className='my-1'>Utiliza as seguintes tecnologias:</p>
      <ul className='list'>
        <li>NodeJS</li>
        <li>Express</li>
        <li>MongoDB (Atlas)</li>
        <li>JSON Web Token</li>
        <li>React</li>
        <li>React Transition Group</li>
        <li>React Hooks</li>
        <li>React Context</li>
      </ul>
      <p className='bg-dark p'>
        <strong>Versão</strong>: 1.0.0
      </p>
      <strong>Repositório</strong>:{" "}
      <a href='https://github.com/fapolo/contact-keeper' target='_blank'>
        Clique Aqui{" "}
      </a>
    </div>
  );
};

export default About;
