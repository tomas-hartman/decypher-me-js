(function (){
    const table = [];
    const alphabet = "abcdefghijklmnoprstuvwyxz".split("");

    const createDecypheringTable = () => {
        for(let i=0;i<5;i++){
            let array = [];
            for(let y=0;y<5;y++){
                let rand = Math.floor(Math.random()*alphabet.length);
                // alphabet[rand];
                let bg = alphabet.splice(rand,1).toString();
                console.log(bg);
                array.push(bg);
                alphabet.pop();
                // array.push(alphabet.splice(rand));
            }
            table.push(array);
        }

        console.log(table);
    }
    createDecypheringTable();
})();