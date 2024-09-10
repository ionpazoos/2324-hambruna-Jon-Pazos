const axios = require('axios');

getDonutsInformation();
function getDonutsInformation(){
const url = 'https://gist.githubusercontent.com/Oskar-Dam/62e7175dc542af53a9d18cb292422425/raw/a6cce2b68ea13a77ec5ea7bdfb4df8f23f9ae95f/donuts.json';
    axios.get(url)
  .then(response => {
    const data = response.data;
    console.log(data);
    return data;
  })
  .catch(error => {
    console.error('Error al obtener los datos:', error);
  });

}