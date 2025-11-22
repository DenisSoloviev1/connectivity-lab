export type GetParams = {
  signal: AbortSignal;
};

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type GetResponse = Post[];
