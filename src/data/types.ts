export interface BlogContent {
  title: string;
  metaTitle: string;
  metaDescription: string;
  content: string;
  schemas?: {
    article?: any;
    faq?: any;
    [key: string]: any;
  };
}
