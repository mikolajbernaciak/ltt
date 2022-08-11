import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import router from 'next/router';
import React, { useCallback, useMemo, useState } from 'react';
import { ILocations, ISearchRequestQuery } from '../../lib/interfaces';
import locationData from '../../locations.json';
import styles from './searchForm.module.css';

export interface ISearchForm {}

const SearchForm: React.FC<ISearchForm> = () => {
	const [selectedCare, setSelectedCare] = useState<string[]>([]);
	const [showDropdown, setShowDropdown] = useState<boolean>(false);
	const [locationText, setLocationText] = useState<string>('');
	const [locationOptions, setLocationOptions] = useState<string[]>([]);

	const getDropdownText = useMemo((): string => {
		if (selectedCare.length > 1) {
			return 'Multiple selections';
		} else if (selectedCare.length === 1) {
			return selectedCare[0];
		}
		return 'Any';
	}, [selectedCare]);

	const onSelectionChange = useCallback(
		(e: React.FormEvent<HTMLInputElement>) => {
			const target = e.target as HTMLInputElement;
			if (selectedCare.includes(target.id)) {
				setSelectedCare((prev) => prev.filter((x) => x !== target.id));
			} else {
				setSelectedCare((prev) => [...prev, target.id]);
			}
		},
		[selectedCare]
	);

	const onTextChange = (e: React.FormEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement;

		if (!target.value || target.value === '') {
			setLocationOptions([]);
		} else {
			const possibleLocations = locationData.filter((x) =>
				x.location.toLowerCase().startsWith(target.value.toLowerCase())
			);
			setLocationOptions(possibleLocations.map((x) => x.location).slice(0, 5));
		}

		setLocationText(target.value);
	};

	const onShowDropdownClick = () => {
		setShowDropdown((prev) => !prev);
	};

	const onSearchClick = () => {
		const data = locationData as ILocations[];

		const location = data.find(
			(x) => x.location.toLowerCase() === locationText.toLowerCase()
		);

		if (location) {
			const reqBody: ISearchRequestQuery = {
				location: locationText,
				careRequired: selectedCare,
			};

			localStorage.setItem('mikkie-search', JSON.stringify(reqBody));
			router.push('/search');
		}
	};

	const onSelectLocation = (location: string) => {
		setLocationText(location);
		setLocationOptions([]);
	};

	return (
		<div className={styles.searchCard}>
			<form className={styles.searchForm} action="">
				<div className={styles.locationInput}>
					<label className={styles.searchFormLabel} htmlFor="location">
						Location
					</label>
					<div className={styles.searchFormInputContainer}>
						<input
							className={styles.searchFormInput}
							type="text"
							id="location"
							name="location"
							placeholder="Search home or town"
							onChange={onTextChange}
							value={locationText}
							autoComplete="off"
						/>
						<div className={styles.locationOptionsContainer}>
							{locationOptions.map((x) => {
								return (
									<div
										className={styles.locationOption}
										onClick={() => onSelectLocation(x)}
									>
										{x}
									</div>
								);
							})}
						</div>
					</div>
				</div>
				<div className={`${styles.careInput} noselect`}>
					<label className={styles.searchFormLabel}>Care required</label>
					<div className={styles.dropdown} onClick={onShowDropdownClick}>
						{getDropdownText}
						<FontAwesomeIcon
							icon={faChevronUp}
							color="black"
							size={'xs'}
							className={`${styles.dropdownChevron} ${
								showDropdown ? styles.dropdownChevronRotate : ''
							}`}
						/>
					</div>
					{showDropdown && (
						<ExpandedDropdown
							selectedChoices={selectedCare}
							onSelectionChange={onSelectionChange}
							onShowDropdownClick={onShowDropdownClick}
						/>
					)}
				</div>
				<div className={styles.searchButtonContainer}>
					<a
						className={`${styles.searchButton} noselect`}
						onClick={onSearchClick}
					>
						Seach now
					</a>
				</div>
			</form>
		</div>
	);
};

interface IExpandedDropdown {
	selectedChoices: string[];
	onSelectionChange: (e: React.FormEvent<HTMLInputElement>) => void;
	onShowDropdownClick: () => void;
}

const ExpandedDropdown: React.FC<IExpandedDropdown> = ({
	selectedChoices,
	onSelectionChange,
	onShowDropdownClick,
}) => {
	return (
		<div className={styles.expandedDropdown}>
			<div className={styles.dropdownFlexCol}>
				<div className={styles.dropDownHeading}>
					Tell us your specific care requirements?
				</div>
				<div className={styles.options}>
					<div className={styles.choice}>
						<input
							className={styles.choiceInput}
							type="checkbox"
							id="residential"
							name="residential"
							checked={selectedChoices.includes('residential')}
							onChange={onSelectionChange}
						/>
						<label className={styles.choiceLabel} htmlFor="residential">
							Residential Care
						</label>
					</div>
					<div className={styles.choice}>
						<input
							className={styles.choiceInput}
							type="checkbox"
							id="nursing"
							name="nursing"
							checked={selectedChoices.includes('nursing')}
							onChange={onSelectionChange}
						/>
						<label className={styles.choiceLabel} htmlFor="nursing">
							Nursing Care
						</label>
					</div>
					<div className={styles.choice}>
						<input
							className={styles.choiceInput}
							type="checkbox"
							id="dementia"
							name="dementia"
							checked={selectedChoices.includes('dementia')}
							onChange={onSelectionChange}
						/>
						<label className={styles.choiceLabel} htmlFor="dementia">
							Dementia Care
						</label>
					</div>
					<div className={styles.choice}>
						<input
							className={styles.choiceInput}
							type="checkbox"
							id="respite"
							name="respite"
							checked={selectedChoices.includes('respite')}
							onChange={onSelectionChange}
						/>
						<label className={styles.choiceLabel} htmlFor="respite">
							Respite Care
						</label>
					</div>
				</div>
			</div>
			<div>
				<button className={styles.doneButton} onClick={onShowDropdownClick}>
					Done
				</button>
			</div>
		</div>
	);
};

export default SearchForm;
