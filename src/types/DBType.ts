export type Tag = string;

export type DBType = {
  title: string;
  description: string;
  tags: Array<Tag>
}

export type TDatabaseForm = {
  title: string;
  filename: string;
  description: string;
  tag: string;
  is_public: boolean;
}


export function TDatabaseFormToDBType(db: TDatabaseForm) {
  return {
    title: db.title,
    description: db.description,
    tags: db.tag.split(',')
  }
}
