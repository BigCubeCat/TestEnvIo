import { Box } from "@mui/material";
import DBCard from '../DBCard/DBCard';
import Empty from "../placeholders/Empty";
import { useAppSelector } from "../../store/hooks";
import { selectDbList } from "../../store/dbSlice";
import { filterCards } from "../../utils/search";

// TODO: переделать editable т к это prop drilling

export default function TabContent({ request, tags, editable }: {
  request: string, tags: string[], editable: boolean
}) {
  const dbList = useAppSelector(selectDbList);
  const cards = filterCards(dbList, request, tags);
  return (
    <Box sx={{
      display: "flex", flexWrap: "wrap",
      justifyContent: "start", marginTop: "3em"
    }}>
      {cards.length > 0 ? cards.map(card => <DBCard
        card={card} editable={editable}
      />)
        : <Empty text={"Пока пусто"} />}
    </Box>
  )
}

