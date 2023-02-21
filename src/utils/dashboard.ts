import { pageCategory } from '../types/page';
import { DBType } from '../types/DBType';

export const testCard: DBType = {
  title: "Super DB",
  description: "It's main database for testing",
  tags: [
    { title: "main" },
    { title: "second" },
    { title: "aaa" },
    { title: "dev" },
  ]
};
export const testCards: DBType[] = [testCard, {
  title: "usual DB",
  description: "It's usual database for testing",
  tags: [
    { title: "default" },
  ]
}, {
    title: "default", description: "", tags: []
  }];


export function getData(category: pageCategory) {
  switch (category) {
    case "All":
      return [testCard, testCard];
    case "Recent":
      return [testCard];
    case "My":
      return [];
    default:
      return []
  }
}

