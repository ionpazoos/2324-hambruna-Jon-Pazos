const axios = require('axios');

getDonutsInformation();
function getDonutsInformation(){
const url = 'https://gist.githubusercontent.com/Oskar-Dam/62e7175dc542af53a9d18cb292422425/raw/a6cce2b68ea13a77ec5ea7bdfb4df8f23f9ae95f/donuts.json';
    axios.get(url)
  .then(response => {
    const data = response.data;
    //1-
    showDonutsWithHigerSugarIronProteinFiber(data);
    //2-
    listAllDonuts(data);
    ShowAverageCalories(data)
    ShowTotalSaturatedFat(data)
    ShowAverageVitaminPercentages(data)
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
function listAllDonuts(data){
    const donuts = data.items.item;

    for (let i = 0; i < donuts.length; i++) {
        const donutName = donuts[i].name;
        const carbs = donuts[i].nutrition_facts.nutrition.carbohydrate.carbs_detail.amount;
        const calories = donuts[i].nutrition_facts.nutrition.calories;
        console.log(donutName + ":");
        console.log("-" +carbs +  " de carbohidratos");
        console.log("-" + calories +  " calorias");
    }
}
function ShowAverageCalories(data) {
    const donuts = data.items.item;
    let totalCalories = 0;
    for (let i = 0; i < donuts.length; i++) {
        totalCalories += donuts[i].nutrition_facts.nutrition.calories;
    }
    const averageCalories = totalCalories / donuts.length;
    console.log("El promedio de calorías de todos los donuts es " + averageCalories.toFixed(2));
}
function ShowTotalSaturatedFat(data) {
    const donuts = data.items.item;
    let totalSaturatedFat = 0;
    for (let i = 0; i < donuts.length; i++) {
        const saturatedFatText = donuts[i].nutrition_facts.nutrition.fat.fat_type.saturated;
        const saturatedFatAmount = parseFloat(saturatedFatText.replace('g', ''));
        totalSaturatedFat += saturatedFatAmount;
    }

    console.log("La suma total de grasas saturadas de todos los donuts es " + totalSaturatedFat.toFixed(2) + "g");
}
function ShowAverageVitaminPercentages(data) {
    const donuts = data.items.item;
    let totalVitaminA = 0;
    let totalVitaminC = 0;
    let totalCalcium = 0;
    let totalIron = 0;

    let countVitaminA = 0;
    let countVitaminC = 0;
    let countCalcium = 0;
    let countIron = 0;

    // Sumar los porcentajes de cada vitamina
    for (let i = 0; i < donuts.length; i++) {
        const vitamins = donuts[i].nutrition_facts.nutrition.vitamines;
        for (let j = 0; j < vitamins.length; j++) {
            const vitaminType = vitamins[j].type;
            const vitaminPercent = parseFloat(vitamins[j].percent.replace('%', ''));

            if (vitaminType === "Vitamin A") {
                totalVitaminA += vitaminPercent;
                countVitaminA++;
            } else if (vitaminType === "Vitamin C") {
                totalVitaminC += vitaminPercent;
                countVitaminC++;
            } else if (vitaminType === "Calcium") {
                totalCalcium += vitaminPercent;
                countCalcium++;
            } else if (vitaminType === "Iron") {
                totalIron += vitaminPercent;
                countIron++;
            }
        }
    }
    let averageVitaminA = 0;
    if (countVitaminA > 0) {
        averageVitaminA = totalVitaminA / countVitaminA;
    }

    let averageVitaminC = 0;
    if (countVitaminC > 0) {
        averageVitaminC = totalVitaminC / countVitaminC;
    }

    let averageCalcium = 0;
    if (countCalcium > 0) {
        averageCalcium = totalCalcium / countCalcium;
    }

    let averageIron = 0;
    if (countIron > 0) {
        averageIron = totalIron / countIron;
    }

    console.log("El porcentaje medio de Vitamin A es " + averageVitaminA + "%");
    console.log("El porcentaje medio de Vitamin C es " + averageVitaminC + "%");
    console.log("El porcentaje medio de Calcium es " + averageCalcium + "%");
    console.log("El porcentaje medio de Iron es " + averageIron + "%");
}

