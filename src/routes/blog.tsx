import { createBrowserRouter } from 'react-router-dom';
import Blog from '../pages/Blog';
import BlogPost from '../pages/BlogPost';
import { bestCycladesIslandsContent } from '../data/blogContent/bestCycladesIslands';
import { sifnosContent } from '../data/blogContent/sifnos';

export const blogRouter = createBrowserRouter([
  {
    path: '/blog',
    element: <Blog />,
  },
  {
    path: '/blog/best-cyclades-islands',
    element: <BlogPost content={bestCycladesIslandsContent} />,
  },
  {
    path: '/blog/sifnos',
    element: <BlogPost content={sifnosContent} />,
  },
]); 