import CategoryTitle from './CategoryTitle';
import CardList from './CardList'
import { DBType } from '../../types/DBType';

export default function TabContent(props: { cards: Array<DBType>, title: string }) {
  return <>
    {/*<CategoryTitle title={props.title} />*/}
    <CardList cards={props.cards} />
  </>
}

