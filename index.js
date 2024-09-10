const axios = require('axios');

getDonutsInformation();
function getDonutsInformation(){
const url = 'https://gist.githubusercontent.com/Oskar-Dam/62e7175dc542af53a9d18cb292422425/raw/a6cce2b68ea13a77ec5ea7bdfb4df8f23f9ae95f/donuts.json';
    axios.get(url)
  .then(response => {
    const data = response.data;
    //1-
    showDonutsWithHigerSugarIronProteinFiber(data);
  })
  .catch(error => {
    console.error('Error al obtener los datos:', error);
  });
}
function showDonutsWithHigerSugarIronProteinFiber(data) {
    let maxSugarNumber = 0;
    let maxIronNumber = 0;
    let maxProteinNumber = 0;
    let maxFibreNumber = parseInt(data.items.item[0].nutrition_facts.nutrition.carbohydrate.carbs_detail.type.fibre.replace(/\D/g, ''), 10);

    let maxSugarDonuts = [];
    let maxIronDonuts = [];
    let maxProteinDonuts = [];
    let maxFibreDonuts = [];

    const donuts = data.items.item;

    for (let i = 0; i < donuts.length; i++) {
        // Azúcar
        let textSugar = donuts[i].nutrition_facts.nutrition.carbohydrate.carbs_detail.type.sugars;
        let numberSugar = parseInt(textSugar.replace(/\D/g, ''), 10);

        if (numberSugar > maxSugarNumber) {
            maxSugarNumber = numberSugar;
            maxSugarDonuts = [i]; 
        } else if (numberSugar === maxSugarNumber) {
            maxSugarDonuts.push(i);
        }

        // Hierro
        let textIron = donuts[i].nutrition_facts.nutrition.vitamines[3].percent;
        let numberIron = parseInt(textIron.replace(/\D/g, ''), 10);

        if (numberIron > maxIronNumber) {
            maxIronNumber = numberIron;
            maxIronDonuts = [i];
        } else if (numberIron === maxIronNumber) {
            maxIronDonuts.push(i);
        }

        // Proteína
        let textProtein = donuts[i].nutrition_facts.nutrition.proteine;
        let numberProtein = parseInt(textProtein.replace(/\D/g, ''), 10);

        if (numberProtein > maxProteinNumber) {
            maxProteinNumber = numberProtein;
            maxProteinDonuts = [i];
        } else if (numberProtein === maxProteinNumber) {
            maxProteinDonuts.push(i);
        }

        // Fibra
        let textFibre = donuts[i].nutrition_facts.nutrition.carbohydrate.carbs_detail.type.fibre;
        let numberFibre = parseInt(textFibre.replace(/\D/g, ''), 10);

        if (numberFibre < maxFibreNumber) {
            maxFibreNumber = numberFibre;
            maxFibreDonuts = [i];
        } else if (numberFibre === maxFibreNumber) {
            maxFibreDonuts.push(i);
        }
    }

     // Mostrar donuts con más azúcar
     console.log("Los donuts con más azúcar son:");
     for (let i = 0; i < maxSugarDonuts.length; i++) {
         console.log("- " + donuts[maxSugarDonuts[i]].name);
     }
 
     // Mostrar donuts con más hierro
     console.log("Los donuts con más hierro son:");
     for (let i = 0; i < maxIronDonuts.length; i++) {
         console.log("- " + donuts[maxIronDonuts[i]].name);
     }
 
     // Mostrar donuts con más proteína
     console.log("Los donuts con más proteína son:");
     for (let i = 0; i < maxProteinDonuts.length; i++) {
         console.log("- " + donuts[maxProteinDonuts[i]].name);
     }
 
     // Mostrar donuts con menos fibra
     console.log("Los donuts con menos fibra son:");
     for (let i = 0; i < maxFibreDonuts.length; i++) {
         console.log("- " + donuts[maxFibreDonuts[i]].name);
     }
}
function listAllDonuts(){
    
}