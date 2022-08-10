import {
	faCheck,
	faChevronRight,
	faCircle,
	faLocationPin,
	faPhone,
	faSterlingSign,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { ICareHome, ILocations } from '../../lib/interfaces';
import locationData from '../../locations.json';
import getDistanceFromCoordinates from '../../utils/getDistanceFromCoordinates';
import styles from './careHomeCard.module.css';

export interface ICareHomeCard {
	careHome: ICareHome;
	searchLocation: string;
}

const CareHomeCard: React.FC<ICareHomeCard> = ({
	careHome,
	searchLocation,
}) => {
	const data = locationData as ILocations[];
	const longitude = data.find(
		(x) => x.location.toLowerCase() === searchLocation.toLowerCase()
	)!.lon;
	const latitude = data.find(
		(x) => x.location.toLowerCase() === searchLocation.toLowerCase()
	)!.lat;

	const distanceFromSearch =
		getDistanceFromCoordinates(
			latitude,
			longitude,
			careHome.lat,
			careHome.lon
		) / 1.62; //km to miles;

	const getCareAvailable = () => {
		const careArr: string[] = [];

		//Rough criteria
		if (careHome.pricing.permanent.nursing !== 'N/A') {
			careArr.push('Nursing');
		}
		if (careHome.pricing.permanent.residentialDementia !== 'N/A') {
			careArr.push('Dementia');
		}
		if (careHome.pricing.permanent.residential !== 'N/A') {
			careArr.push('Residential');
		}
		if (careHome.pricing.respite.nursing !== 'N/A') {
			careArr.push('Respite');
		}

		return careArr;
	};

	return (
		<div className={styles.careHomeCard}>
			<div className={styles.imageContainer}>
				<img
					className={styles.image}
					src={`https://lottie-boh-assets.s3.eu-west-2.amazonaws.com/${careHome.imagePath}`}
					alt=""
				/>
			</div>
			<div className={styles.careHomeName}>{careHome.name}</div>
			<div className={styles.careHomeLocation}>
				{careHome.location}, {careHome.county}
			</div>
			<div className={styles.careAvailable}>
				<p>Care available</p>
				<div className={styles.careGrid}>
					{getCareAvailable().map((x) => {
						return (
							<div className={styles.careText} key={`${careHome.name}_${x}`}>
								<FontAwesomeIcon icon={faCheck} color={'#98fb98'} />
								{x}
							</div>
						);
					})}
				</div>
			</div>
			<div className={styles.info}>
				<div className={styles.infoItem}>
					<FontAwesomeIcon icon={faCircle} color={'#98fb98'} />
					<span className={styles.infoItemText}>
						<span className={styles.rating}>{careHome.cqcRating}</span> CQC
						Rating
					</span>
				</div>
				<div className={styles.infoItem}>
					<FontAwesomeIcon icon={faSterlingSign} color={'#98fb98'} />
					<span className={styles.infoItemText}>
						From <strong>£{careHome.pricesFrom}</strong> weekly
					</span>
				</div>
				<div className={styles.infoItem}>
					<FontAwesomeIcon icon={faLocationPin} color={'#98fb98'} />
					<span className={styles.infoItemText}>
						<strong>{distanceFromSearch.toFixed(1)} miles</strong> from ...
					</span>
				</div>
			</div>
			<div className={styles.contactButton}>
				<div className={styles.phoneIcon}>
					<FontAwesomeIcon icon={faPhone} color="black" size={'2x'} />
				</div>
				<div className={styles.contactInfo}>
					<p>Call {careHome.name}</p>
					<p>01131 109456</p>
				</div>
			</div>
			<div className={styles.findOutMore}>
				<span>Find out more</span>
				<FontAwesomeIcon icon={faChevronRight} />
			</div>
		</div>
	);
};

export default CareHomeCard;
