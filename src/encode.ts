import { cleanOutput } from './cleanOutput';
import { convertToChars } from './convertToChars';
import { convertToNums } from './convertToNums';
import { createTable } from './createTable';
import { Encode } from './types';

export const encode: Encode = (stringToEncode, decypheringTable) => {
  const outputBase = 5; // TODO this  can be optional
  const workingTable = decypheringTable || createTable();

  const first = convertToNums(stringToEncode, workingTable);

  let workingSecond = (Math.floor(Math.random()*5)).toString();
  workingSecond += first;
  workingSecond += (Math.floor(Math.random()*5)).toString();

  if(workingSecond.length % outputBase !== 0){
    // const iterations = 6-(workingSecond.length % 6);
    // Compensates number of letters, so they are dividable by 6 / outputBase 
    const iterations = (outputBase -(workingSecond.length / 2) % outputBase) * 2;
    for(let i=0; i<iterations; i++){
      workingSecond += (Math.floor(Math.random()*5)).toString();
    }
  }

  let output = convertToChars(workingSecond, workingTable);

  output = cleanOutput(output, outputBase);

  return [output, workingTable];
};