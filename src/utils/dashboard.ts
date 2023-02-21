import { pageCategory } from '../types/page';
import { DBType } from '../types/DBType';

export const testCard: DBType = {
  title: "Super DB",
  description: "It's main database for testing",
  createdAt: new Date(),
  updatedAt: new Date(),
  tags: [
    { title: "main", color: "#23f59f" },
    { title: "second", color: "#329009" },
    { title: "aaa", color: "#ffaabb" },
    { title: "dev", color: "#11909f" },
  ]
};

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

