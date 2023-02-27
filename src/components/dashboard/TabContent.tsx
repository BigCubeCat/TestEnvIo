import { Box } from "@mui/material";
import DBCard from '../DBCard/DBCard';
import Empty from "../placeholders/Empty";
import { useAppSelector } from "../../store/hooks";
import { selectDbList } from "../../store/dbSlice";
import { filterCards } from "../../utils/search";

// TODO: переделать editable т к это prop drilling

export default function TabContent({ request, tags }: {
  request: string, tags: string[]
}) {
  const dbList = useAppSelector(selectDbList);
  const cards = filterCards(dbList, request, tags);
  return (
    <Box sx={{
      display: "flex", flexWrap: "wrap",
      justifyContent: "start"
    }}>
      {cards.length > 0 ? cards.map(card => <DBCard
        card={card}
      />)
        : <Empty text={"Пока пусто"} />}
    </Box>
  )
}

