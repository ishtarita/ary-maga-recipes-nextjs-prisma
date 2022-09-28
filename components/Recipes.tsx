import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";


export type PostReci={
    id: string;
    nameRecipe: string;
    writer:{
      name: String;
      email:String;
    } | null;
    category: String;
    ingredients: String;
    preparation: String;
  };

  
const Recipes: React.FC<{recipes: PostReci}> = ({recipes}) => {
    const writer = recipes.writer ? recipes.writer.name : "PERDIDAAAA";
    return(
      <div onClick={() => Router.push("/p[id]",`/p/${recipes.id}` )}>
        <h2>{recipes.nameRecipe}</h2>
        <small>By {writer}</small>
        <p>Ingredients:</p>
        <p>{recipes.ingredients}</p>
        <p>Preparation:</p>
        <p>{recipes.preparation}</p>
        <style jsx>{`
          div {
            color: inherit;
            padding: 2rem;
          }
        `}</style>
      </div>
    );
  };
  
  
export default Recipes;  