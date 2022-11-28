import React, { useState } from 'react';
import Layout from '../components/Layout';
import Router from 'next/router';

const Draft: React.FC = () => {
    const [nameRecipe, setnameRecipe] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [preparation, setPreparation] = useState('');
  
    const submitData = async (e: React.SyntheticEvent) => {
      e.preventDefault();
      try {
          const body = { nameRecipe, ingredients,preparation};
          await fetch('/api/postRecipe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          });
          await Router.push('/drafts');
        } catch (error) {
          console.error(error);
        }
    };
  
    return (
      <Layout>
        <div>
          <form onSubmit={submitData}>
            <h1>New Recipe</h1>
            <input
              autoFocus
              onChange={(e) => setnameRecipe(e.target.value)}
              placeholder="Name of recipe"
              type="text"
              value={nameRecipe}
            />
            <textarea
              cols={50}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="Ingredients"
              rows={8}
              value={ingredients}
            />
            <textarea
                autoFocus
                onChange={(e) => setPreparation(e.target.value)}
                placeholder ="Preparation"
                value={preparation}
            />
            <input disabled={!ingredients || !nameRecipe || !preparation} type="submit" value="Create" />
            <a className="back" href="#" onClick={() => Router.push('/')}>
              or Cancel
            </a>
          </form>
        </div>
        <style jsx>{`
          .page {
            background: var(--geist-background);
            padding: 3rem;
            display: flex;
            justify-content: center;
            align-items: center;
          }
  
          input[type='text'],
          textarea {
            width: 100%;
            padding: 0.5rem;
            margin: 0.5rem 0;
            border-radius: 0.25rem;
            border: 0.125rem solid rgba(0, 0, 0, 0.2);
          }
  
          input[type='submit'] {
            background: #ececec;
            border: 0;
            padding: 1rem 2rem;
          }
  
          .back {
            margin-left: 1rem;
          }
        `}</style>
      </Layout>
    );
  };
  
  export default Draft;