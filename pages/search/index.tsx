import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { NextPage } from 'next/types';
import { useEffect, useState } from 'react';
import CareHomeCard from '../../components/careHomeCard/careHomeCard';
import {
	ICareHome,
	ILocations,
	ISearchRequestQuery,
} from '../../lib/interfaces';
import locationData from '../../locations.json';
import styles from '../../styles/Serach.module.css';

const containerStyle = {
	width: '500px',
	height: '300px',
	position: 'sticky',
};

const Search: NextPage = () => {
	const [results, setResults] = useState<ICareHome[]>([]);

	let longitude: number;
	let latitude: number;
	let location: string;
	let searchJson: ISearchRequestQuery;

	if (typeof window !== 'undefined') {
		const search = localStorage.getItem('mikkie-search');

		if (search) {
			const data = locationData as ILocations[];
			searchJson = JSON.parse(search!) as ISearchRequestQuery;

			longitude = data.find(
				(x) => x.location.toLowerCase() === searchJson.location.toLowerCase()
			)!.lon;
			latitude = data.find(
				(x) => x.location.toLowerCase() === searchJson.location.toLowerCase()
			)!.lat;
			location = searchJson.location;
		}
	}

	const center = {
		lat: latitude!,
		lng: longitude!,
	};

	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
	});

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch(
					`/api/search?longitude=${longitude}&latitude=${latitude}&careRequired=${searchJson.careRequired}`
				);
				setResults(await response.json());
			} catch (err) {
				console.error(err);
			}
		})();
	}, []);

	return (
		<>
			<div className={styles.searchPage}>
				<div className={styles.searchPageContainer}>
					<div className={styles.searchFilters}></div>
					<div className={styles.searchHeading}>
						<h2>Find a Care Home</h2>
						<div className={styles.searchSort}>
							Use our search to compare care homes in your local area.
						</div>

						<div className={styles.countDisplay}>
							Showing <strong>{results.length}</strong> of{' '}
							<strong>{results.length}</strong> care home results
						</div>
					</div>
					<div className={styles.searchResultsContainer}>
						<div className={styles.searchResults}>
							{results.map((x, i) => {
								return (
									<CareHomeCard
										careHome={x}
										key={`${x.name}_${i}`}
										searchLocation={location}
									/>
								);
							})}
						</div>
						<div className={styles.mapContainer}>
							{isLoaded ? (
								<GoogleMap
									mapContainerClassName={styles.map}
									center={center}
									zoom={7}
								>
									{/* Child components, such as markers, info windows, etc. */}
									<>
										{results.map((x) => {
											const position = {
												lat: x.lat,
												lng: x.lon,
											};

											return (
												<Marker position={position} key={`${x.name}_marker`} />
											);
										})}
									</>
								</GoogleMap>
							) : (
								<></>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Search;
