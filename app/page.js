'use client'
import { useState } from 'react';
import { useQuery } from 'react-query';
import MemeComponent from './components/MemeComponent';
import InputComponent from './components/InputComponent';
import ButtonComponent from './components/ButtonComponent';

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

  function resetButton () {
    setMeme(prevMeme => ({
      ...prevMeme,
       topText: '',
       bottomText: ''
    }))
  
  }

  return (
    <main className="flex-col items-center justify-center bg-white rounded-2xl  drop-shadow-lg p-12   ">
      <div className="flex flex-col gap-4 items-center">
        <MemeComponent topText={meme.topText} bottomText={meme.bottomText} randomImage={meme.randomImage} />
        <InputComponent name="topText" value={meme.topText} onChange={handleChange} />
        <InputComponent name="bottomText" value={meme.bottomText} onChange={handleChange} />
        <ButtonComponent label="Get a new meme image 🖼" onClick={getMemeImage} />
        <ButtonComponent label="Reset" onClick={resetButton} />
      </div>
    </main>
  );
}
