import { testCards } from './dashboard';
import { GetFileInfos } from './fileinfo';

export async function loadAllDB() {
  return testCards;
}

// const json = await ky.post("http://localhost:3000/users", { json: { foo: true } }).json();

// console.log(json);
