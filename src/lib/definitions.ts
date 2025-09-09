export type Project = {
  category: 'Web' | 'Mobile' | 'AI';
  title: string;
  description: string;
  image: string;
  imageHint: string;
  tags: string[];
  liveUrl?: string;
  sourceUrl?: string;
};

export type Experience = {
  date: string;
  title: string;
  company: string;
  description: string;
  image: string;
  imageHint: string;
};
