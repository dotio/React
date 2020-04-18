import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactFilter = () => {
  const contactContext = useContext(ContactContext);

  const text = useRef(''); // work with dom

  const { filterContact, clearFilter, filtered } = contactContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = ''; // clear value
    }
  });

  const onChange = e => {
    if (text.current.value !== '') {
      filterContact(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        ref={text} // from useref
        type='text'
        placeholder='Filter contacts...'
        onChange={onChange}
      />
    </form>
  );
};

export default ContactFilter;
