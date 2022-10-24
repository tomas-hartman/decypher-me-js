import { CreateTable } from './types';

export const createTable: CreateTable = () => {
  const workingTable = [];

  // TODO: generate own alphabet from input
  const alphabet = 'abcdefghijklmnoprstuvwyxz'.split('');

  for(let i=0; i<5; i++){

    const array = [];

    for(let y=0; y<5; y++){
      const rand = Math.floor(Math.random() * alphabet.length);
      const letter = alphabet.splice(rand,1).toString();
      
      array.push(letter);
    }

    workingTable.push(array);
  }

  return workingTable;
};
