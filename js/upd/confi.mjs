






import { readFileSync, rename, readdirSync } from "fs";


function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;

}


const Confi = syncReadFile('./Confidence_value.txt');
const c = Confi.toString().split(" ");

const d = c.length;
const e = [];
const h =[];

for (let index = 2; index < d; index=index+3) {
    e.push(parseInt(c[index]*100));
    h.push(c[index])
}

console.log("Raw");
console.log(c);
console.log(" ");
//Remove confi value
for( let i = 0; i < c.length; i++){ 
    for(let j = 0; j < e.length;j++){
        if ( c[i] === h[j]) { 
            //console.log(c[i]+ " == "+(h[j]))
            c.splice(i, 1); 
            i--; 
        }
    }
}
console.log("Remove confi value");
console.log(c);
console.log(" ");

//Remove Mildew
for( let i = 0; i < c.length; i++){ 
  
        if ( c[i] === 'Midew') { 
            //console.log(c[i]+ " == "+(h[j]))
            c.splice(i, 1); 
            i--; 
        }
    
}
console.log("Remove Mildew");
console.log(c);
console.log(" ");

for( let i = 0; i < c.length; i++){ 

    console.log(c[i]+" Midew "+e[i]+"%");
}