'use client'
import { useState } from 'react';
import { useQuery } from 'react-query';
import firstMeme from '../public/memes.png'

export default function Home() {
  const [meme, setMeme] = useState({
    topText: '',
    bottomText: '',
    randomImage: firstMeme,
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

  const upperCase = (event) => {
    const { name, value } = event.target;
    const transformedValue = name === 'topText' || name === 'bottomText' ? value.toUpperCase() : value;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: transformedValue,
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

  function resetButton () {
    setMeme(prevMeme => ({
      ...prevMeme,
       topText: '',
       bottomText: ''
    }))
  
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
       <div className="flex justify-center items-center">
  <h2 className="absolute text-white  -translate-y-10 left-1/2 transform -translate-x-1/2">{meme.topText}</h2>
  <img src={meme.randomImage} className=" w-96 h-96" alt="Meme" />
  <h2 className="absolute bottom-0 left-1/2 transform -translate-x-1/2">{meme.bottomText}</h2>
</div>

        <input
          type="text"
          placeholder="Bottom text"
          className=""
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
        />
        <button className="" onClick={getMemeImage}>
          Get a new meme image 🖼
        </button>
        <button className="" onClick={resetButton}>
         Reset
        </button>
      </div>
    
    </main>
  );
}
