import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import SearchForm from '../components/searchForm/searchForm';
import bannerImage from '../public/assets/lottie-care-homes-london.webp';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
	return (
		<div className={styles.container}>
			<Head>
				<title>The UK&#39;s Okeyest developer | mikkie</title>
				<meta name="description" content="Tech test for Lottie" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<div className={styles.banner}>
					<div className={styles.container}>
						<h1 className={styles.bannerText}>
							SEARCH &amp; COMPARE CARE HOMES AND RETIREMENT LIVING
						</h1>
						<div className={styles.buttonContainer}>
							<button className={styles.careHomesButton}>Care Homes</button>
							<button className={styles.retirementLivingButton}>
								Retirement Living
							</button>
						</div>
					</div>
					<SearchForm />
				</div>
				<div className={styles.imageContainer}>
					<span className={styles.bannerImage}>
						<Image
							src={bannerImage}
							alt=""
							layout="responsive"
							objectFit="contain"
						/>
					</span>
					<div className={styles.imageTextContainer}>
						<div className={styles.imageText}>
							Need help? Request a free personalised shortlist from Mikkie!
						</div>
						<button className={styles.imageTextButton}>
							Get free shortlist
						</button>
					</div>
				</div>
			</main>

			<footer className={styles.footer}>
				<a
					href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					Powered by{' '}
					<span className={styles.logo}>
						<Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
					</span>
				</a>
			</footer>
		</div>
	);
};

export default Home;
