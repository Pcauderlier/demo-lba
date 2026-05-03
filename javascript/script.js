/**
 * EXE 1 : 
 */
if (false){
    function getNums(){
        let userNum = +(prompt("Introduire un nombre entre 1 et 12"));
        while (userNum > 12 || userNum < 1){
            alert("Attention le nombre doit etre entre 1 et 12 !!")
            userNum = +(prompt("Introduire un nombre entre 1 et 12"));
        }
        return userNum;
    }
    let numList = [];
    for (let i = 0; i< 12; i++){
        let num = getNums()
        numList.push(num)
    }
    let month = ["Janvier" , "Février" , "Mars" , "Avril" , "Mai" , "Juin" , "Juillet" , "Aout" , "Septembre" , "Octobre", "Novembre", "Décembre"]

    for (let l = 0; l < numList.length; l++){
        
        console.log(`${numList[l]} --> ${month[numList[l]-1]}`)
    }
    
}

if (false){

    let userInput = [];
    
    let input = prompt("Entrer un chiffre entre 1 et 12  (exit) quand terminé") 
    
    while(input != "exit"){
        input = Number(input);
        if (input <= 12 && input >= 1){
            userInput.push(Number(input))
        }
        input = prompt("Entrer un chiffre entre 1 et 12  (exit) quand terminé")
    
    }
    
    let month = ["Janvier" , "Février" , "Mars" , "Avril" , "Mai" , "Juin" , "Juillet" , "Aout" , "Septembre" , "Octobre", "Novembre", "Décembre"]
    
    for (let i = 0 ; i< userInput.length ; i++){
        let inp = userInput[i]-1
        let m = month[inp]
        console.log(`${userInput[i]} --> ${m}`)
    }
}




if (false){
    let userNum = [];

    for (let i = 0; i<5; i++){
        let num = +(prompt("Veuillez entrer un chiffre"));
        userNum.push(num);
    }

    for (let n = userNum.length -1 ; n>= 0 ; n--){
        console.log(userNum[n])
    }
}

if (false){
    let TabSemDer = [
        ["Alors on danse", "Stromae"],
        ["Blinding Lights", "The Weeknd"],
        ["Shape of You", "Ed Sheeran"],
        ["Bad Guy", "Billie Eilish"],
        ["Uptown Funk", "Mark Ronson ft. Bruno Mars"],
        ["Someone Like You", "Adele"],
        ["Smells Like Teen Spirit", "Nirvana"],
        ["Bohemian Rhapsody", "Queen"],
        ["Can't Stop", "Red Hot Chili Peppers"],
        ["Lose Yourself", "Eminem"]
    ];
    let CetteSem = [
        ["Alors on danse", "Stromae"],
        ["Blinding Lights", "The Weeknd"],
        ["Shape of You", "Ed Sheeran"],
        ["Bad Guy", "Billie Eilish"],
        ["Uptown Funk", "Mark Ronson ft. Bruno Mars"],
        ["Someone Like You", "Adele"],
        ["Smells Like Teen Spirit", "Nirvana"],
        ["Bohemian Rhapsody", "Queen"],
        ["Can't Stop", "Red Hot Chili Peppers"],
        ["Lose Yourself", "Eminem"]
    ];

    

    console.log("Top 10 de la semaine : ")
    for (let CetteSemPos = 0; CetteSemPos < CetteSem.length; CetteSemPos++){
        let title = CetteSem[CetteSemPos][0]
        let artiste = CetteSem[CetteSemPos][1]


        let posDiff; 
        let foundInTop = false;
        for (let oldPos = 0; oldPos < TabSemDer.length; oldPos ++){
            if (TabSemDer[oldPos][0] == title && TabSemDer[oldPos][1] == artiste){
                // On est sur le meme titre / artiste
                posDiff = oldPos - CetteSemPos;
                foundInTop = true
            }
        }
        let txt = `${CetteSemPos +1} : ${title} - ${artiste} `
        if (!foundInTop){
            txt += "(Nouvelle entrée)"
        }
        else{
            if (posDiff > 0){
                txt += "(Gain de " + posDiff + " places)"
            }
            else if (posDiff < 0){
                txt += "(Recul de " + (posDiff * -1) + " places)"
            }
            else{
                txt += "(Statu quo)"
            }
        }
        console.log(txt)

    }


}



if (false){

    let num = 150;
    let binary = [0,0,0,0,0,0,0,0]
    let pos = 0;
    for(let i = binary.length-1 ; i>=0; i--){

        let exp = i;
        let compare = 2 ** exp;
        if (num / compare >= 1){
            binary[pos] = 1;
            num -= compare
        }
        pos++;
    }
    console.log(binary)

}


if (true){
    let num = 150;
    let binary = [0,0,0,0,0,0,0,0];

    for (let i = 7; i >= 0; i--) {
        binary[i] = num % 2;
        num = Math.floor(num / 2);
    }

    console.log(binary);
}