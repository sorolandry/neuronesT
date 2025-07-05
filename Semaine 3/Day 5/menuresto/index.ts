function recuperationNom():string{
    const nom  = prompt("Entrez votre nom : ");
    return (`${nom}`);
}

function menu():void{
    alert('voici notre menu: \n 1. Riz + soupe \n 2. Garba \n 3. Riz')
}

function votrechoix():string{
    const choix = prompt("Entrer le numero du menu de votre choix : ");
    return (`${choix}`);
}


function Afchoix(nom:string, choix:string): void{
    alert(`Bonjour M/Mme ${nom}, votre menu est : `);
    switch (choix){
        case "1" :
            alert('1. Riz + soupe');
        break;
        case "2" :
            alert('2. Garba');
        break;
        case "3" :
            alert('3. Riz Gras');
        break;
        default :
            alert("Desoler, votre choix n'a pas été prix en compte");
    }
}



function main():void{
    
    const nom = recuperationNom();
    
    alert(`Bonjour ${nom} bienvenu au restauPlus`);
    alert(menu());
    const choix = votrechoix();
    alert(`Votre choix est ${choix}`);
    alert(Afchoix(nom, choix));
}

main()