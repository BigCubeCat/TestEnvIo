import { DBType } from '../types/DBType';

/*
* filterCards(cards: DBType[], request: string, tags: string[]) 
*/
export function filterCards(cards: DBType[], request: string, tags: string[]) {
  return cards.filter(card => {
    for (let i = 0; i < tags.length; ++i) {
      if (!card.tags.includes(tags[i])) {
        return false;
      }
    }
    return card.title.toLocaleLowerCase().includes(
      request.toLocaleLowerCase()
    );
  });
}
