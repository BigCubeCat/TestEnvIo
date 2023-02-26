export type Tag = string;

export type DBType = {
  id: number,
  title: string;
  description: string;
  tags: Array<Tag>
}

export type TDatabaseForm = {
  id: number,
  title: string;
  filename: string;
  description: string;
  tag: string;
  is_public: boolean;
}


export function TDatabaseFormToDBType(db: TDatabaseForm) {
  return {
    id: db.id, title: db.title,
    description: db.description,
    tags: db.tag.split(',')
  }
}
