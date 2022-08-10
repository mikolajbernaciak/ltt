import { faMagnifyingGlass, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ISearchRequestQuery } from '../../lib/interfaces';
import styles from './navbar.module.css';

export interface INavbar {}

const Navbar: React.FC<INavbar> = () => {
	const [location, setLocation] = useState<string>();

	let showSearchBox: boolean = false;
	if (typeof window !== 'undefined') {
		showSearchBox = window.location.pathname === '/search';
	}

	useEffect(() => {
		let searchJson: ISearchRequestQuery;
		if (typeof window !== 'undefined') {
			const search = localStorage.getItem('mikkie-search');

			if (search) {
				searchJson = JSON.parse(search!) as ISearchRequestQuery;
				setLocation(searchJson.location);
			}
		}
	}, []);

	return (
		<div className={styles.navbarContainer}>
			<nav>
				<div className={styles.navbar}>
					<div className={styles.navbarLeft}>
						<Link href="/" className={styles.navbarLogo}>
							<span>
								m<span className={styles.logoI}>i</span>kkie
							</span>
						</Link>
						{showSearchBox && location && (
							<div className={styles.navbarSearch}>
								<FontAwesomeIcon icon={faMagnifyingGlass} color="black" />
								<input defaultValue={location} />
							</div>
						)}
					</div>

					<ul className={styles.linkList}>
						<a href="https://github.com/mikolajbernaciak/ltt">
							<li>Git repo</li>
						</a>
						<a href="">
							<li>Retirement Living</li>
						</a>
						<a href="">
							<li>Advice &amp; Insight</li>
						</a>
						<a href="">
							<li>About</li>
						</a>
						<li className={styles.phoneNumber}>
							<FontAwesomeIcon icon={faPhone} color="#f3a0c1" size={'xs'} />
							<span> 0330 912 8126</span>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
