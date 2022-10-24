export const cleanOutput = (string: string, outputBase: number) => {
  let output = '';
  let slicer = outputBase;
  let strStart = 0;

  if(string.length % outputBase !== 0){
    throw Error(`String cannot be divided by ${outputBase}.`);
  } 

  for(let i=0; i<string.length/outputBase; i++){
    const remainingString = string.slice(slicer);
    output += string.slice(strStart, slicer);
    output += ' ';

    slicer = slicer + outputBase;
    strStart = strStart + outputBase;
  }

  output = output.trim();
  output = output.toUpperCase();
      
  return output;
};