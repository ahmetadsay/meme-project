'use client'
import { useState } from 'react';
import { useQuery } from 'react-query';

export default function Home() {
  const [meme, setMeme] = useState({
    topText: '',
    bottomText: '',
    randomImage: '',
  });

  const { isLoading, error, data } = useQuery('repoData', () =>
    fetch('https://api.imgflip.com/get_memes').then((res) => res.json())
  );

  if (isLoading) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;

  const memes = data?.data?.memes || []; 

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * memes.length);
    const url = memes[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  }

  return (
    <main className='flex-col items-center justify-center bg-white rounded-2xl  drop-shadow-lg p-12   ' >
      <div className="flex flex-col gap-4 items-center">
        <input
          type="text"
          placeholder="Top text"
          className=""
          name="topText"
          value={meme.topText}
          onChange={handleChange}
        />
          <div className=" flex justify-center items-center">
        <img src={meme.randomImage} className=" w-72 h-72 " alt="Meme" />
        <h2 className=" text-white">{meme.topText}</h2>
        <h2 className="">{meme.bottomText}</h2>
      </div>
        <input
          type="text"
          placeholder="Bottom text"
          className=""
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
        />
        <button className="form--button" onClick={getMemeImage}>
          Get a new meme image 🖼
        </button>
      </div>
    
    </main>
  );
}
