import { Box } from "@mui/material";
import DBCard from '../DBCard/DBCard';
import { DBType } from "../../types/DBType";
import Empty from "../placeholders/Empty";

// TODO: переделать editable т к это prop drilling

export default function TabContent({ cards, editable }: {
  cards: Array<DBType>, editable: boolean
}) {
  return (
    <Box sx={{
      display: "flex", flexWrap: "wrap",
      justifyContent: "start"
    }}>
      {cards.length > 0 ? cards.map(card => <DBCard
        editable={editable}
        card={card}
      />)
        : <Empty text={"Пока пусто"} />}
    </Box>
  )
}

