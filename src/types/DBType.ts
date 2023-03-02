export type Tag = string;

export type DBType = {
  id: number,
  title: string;
  db_uri: string;
  description: string;
  tags: Array<Tag>;
  author?: string;
  status: string;
}

export type TDatabaseForm = {
  id: number,
  title: string;
  db_uri: string;
  description: string;
  tag: string;
  is_public: boolean;
  author: { username: string };
  export_to: string
}


export function TDatabaseFormToDBType(db: TDatabaseForm) {
  return {
    id: db.id, title: db.title,
    description: db.description,
    tags: db.tag.split(','),
    author: db.author.username,
    db_uri: db.db_uri,
  }
}
