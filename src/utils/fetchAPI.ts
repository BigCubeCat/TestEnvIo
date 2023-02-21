import ky from 'ky';
import { testCard } from './dashboard';

export async function loadAllDB() {
  return [testCard, testCard, testCard]
}

const json = await ky.post("http://localhost:3000/users", { json: { foo: true } }).json();

console.log(json);
