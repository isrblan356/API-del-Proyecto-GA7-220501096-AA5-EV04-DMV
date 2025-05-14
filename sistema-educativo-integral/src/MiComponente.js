import React, { useEffect } from 'react';
import axios from 'axios';

const MiComponente = () => {
  useEffect(() => {
    axios.get('http://localhost:8080/api/test')
      .then(response => console.log('Datos recibidos:', response.data))
      .catch(error => console.error('Error:', error));
  }, []);

  return <div>Verifica la consola para los datos</div>;
};

export default MiComponente;
