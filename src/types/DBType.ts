export type Tag = {
  title: string;
  color: string;
}

export type DBType = {
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  tags: Array<Tag>
}
