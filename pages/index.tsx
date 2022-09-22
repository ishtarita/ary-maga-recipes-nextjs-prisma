import React from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import Post, { PostProps,} from "../components/Post"
import Recipes, { PostReci,} from "../components/Recipes"
import prisma from '../lib/prisma';

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  const feedReci = await prisma.recipes.findMany({
    include: {
      writer:{
        select: {name:true },
      },
    },
  });
  return { 
    props: { feed, feedReci },  
    revalidate: 10 
  }
}

type Props = {
  feed: PostProps[],
  feedReci: PostReci[]
}

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>Public Feed</h1>
        <main>
          {props.feed.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>

      <div>
        <h1>Recipes</h1>
        <main>
          {props.feedReci.map((recipes)=> (
            <div key={recipes.id} className="recipes">
              <Recipes recipes = {recipes}/>
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  )
}

export default Blog
