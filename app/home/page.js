import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/');
  }, []);

  return (
    <>
      <Head>
        <link rel="canonical" href="https://www.eco-vrac.fr/" />
      </Head>
      <div>Redirection en cours...</div>
    </>
  );
}