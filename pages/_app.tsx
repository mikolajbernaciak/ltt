import '@fortawesome/fontawesome-svg-core/styles.css';
import type { AppProps } from 'next/app';
import Navbar from '../components/navbar/navbar';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Navbar />
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
