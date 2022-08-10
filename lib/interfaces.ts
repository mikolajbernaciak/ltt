export interface ICareHome {
	name: string;
	imagePath: string;
	location: string;
	cqcRating: string;
	pricesFrom: number;
	greenerChoice: boolean;
	region: string;
	county: string;
	listingUrl: string;
	lat: number;
	lon: number;
	pricing: {
		permanent: IPricing;
		respite: IPricing;
	};
}

export interface IPricing {
	residential: string;
	residentialDementia: string;
	nursing: string;
	nursingDementia: string;
}

export interface IData {
	CareHomes: Record<string, ICareHome>;
}

export interface ISearchRequestQuery {
	location: string;
	careRequired: string[];
}

export interface ILocations {
	location: string;
	lat: number;
	lon: number;
}
