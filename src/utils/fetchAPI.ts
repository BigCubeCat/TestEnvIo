import ky from 'ky';
import { testCards } from './dashboard';

export async function loadAllDB() {
  return testCards;
}

// const json = await ky.post("http://localhost:3000/users", { json: { foo: true } }).json();

// console.log(json);
