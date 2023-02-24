import { loadAllDB } from '../utils/fetchAPI';
import { GetFileInfos } from './fileinfo';

/*
* fetcher(url)
* @param{url} api url
* returns response json
*/
export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const loadDBList = (
  setDatabases: Function, setTags: Function, token: string
) => {
  const fetchData = async () => {
    console.log("Тут");
    const newData = await GetFileInfos(token);
    console.log(newData);
    setDatabases(newData);
    let set = new Set<string>();
    //ООООЧень плохо TODO: fix
    newData.map(card => card.tags.map(tag => set.add(tag)));
    setTags(Array.from(set));
  }
  fetchData().catch(console.error);
}


