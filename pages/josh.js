import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('')
  const fetchJosh = async () => {
    try {
      const response = await axios.get('/api/josh');
      console.log("The response is ", response.data);
      return response.data.name; // Assuming the name property is available in the response
    } catch (error) {
      console.error(error);
      return ''; // Return an empty string or handle the error accordingly
    }
  };

  const getMessage = async () => {
    try {
      const response = await axios.get('/api/bot');
      console.log("The response is ", response.data);
      return response.data.message; // Assuming the name property is available in the response
    } catch (error) {
      console.error(error);
      return ''; // Return an empty string or handle the error accordingly
    }
  };

  useEffect(() => {
    const getName = async () => {
      const name = await fetchJosh();
      console.log("The name is ", name);
      setName(name);

      const message = await getMessage();      
      setMessage(message);
    };

    getName();
  }, []);
  return (
    <>
     
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            this is {name} page;  and message is {message}          
          </p>
          <div>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{' '}
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                className={styles.vercelLogo}
                width={100}
                height={24}
                priority
              />
            </a>
          </div>
        </div>

      </main>
    </>
  )
}

// export default Josh