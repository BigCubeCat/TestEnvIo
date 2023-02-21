import ky from 'ky';

const json = await ky.post("http://localhost:3000/users", { json: { foo: true } }).json();

console.log(json);
