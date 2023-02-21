import { DBType } from '../types/DBType';

export function filterCards(cards: DBType[], request: string, tags: string[]) {
  console.log(tags);
  return cards.filter(card => {
    for (let i = 0; i < tags.length; ++i) {
      if (!card.tags.includes({ title: tags[i] })) {
        return false;
      }
    }
    return card.title.toLocaleLowerCase().includes(
      request.toLocaleLowerCase()
    );
  });
}
