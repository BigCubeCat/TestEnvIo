import { loadAllDB } from '../utils/fetchAPI';

/*
* fetcher(url)
* @param{url} api url
* returns response json
*/
export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const loadDBList = (setDatabases: Function, setTags: Function) => {
  const fetchData = async () => {
    const newData = await loadAllDB();
    setDatabases(newData);
    let set = new Set<string>();
    //ООООЧень плохо TODO: fix
    newData.map(card => card.tags.map(tag => set.add(tag)));
    setTags(Array.from(set));
  }
  fetchData().catch(console.error);
}
