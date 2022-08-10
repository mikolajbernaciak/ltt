import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { NextPage } from 'next/types';
import { useCallback, useEffect, useState } from 'react';
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
};

const Search: NextPage = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [results, setResults] = useState<ICareHome[]>([]);
	const [map, setMap] = useState<any | null>(null);

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
		googleMapsApiKey: 'AIzaSyBQL8F1FTgmYQWXjvRcbiib_dGM6mIGAb8',
	});

	const onLoad = useCallback(function callback(map) {
		const bounds = new window.google.maps.LatLngBounds(center);
		map.fitBounds(bounds);
		setMap(map);
	}, []);

	const onUnmount = useCallback(function callback(map) {
		setMap(null);
	}, []);

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch(
					`/api/search?longitude=${longitude}&latitude=${latitude}&careRequired=${searchJson.careRequired}`
				);
				setResults(await response.json());
			} catch (err) {
			} finally {
				setLoading(false);
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
									mapContainerStyle={containerStyle}
									center={center}
									zoom={5}
									onLoad={onLoad}
									onUnmount={onUnmount}
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
