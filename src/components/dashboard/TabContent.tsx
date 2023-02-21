import CategoryTitle from './CategoryTitle';
import CardList from './CardList'

export default function TabContent(props: { cards: Array<DBType>, title: string }) {
  return <>
    {/*<CategoryTitle title={props.title} />*/}
    <CardList cards={props.cards} />
  </>
}

