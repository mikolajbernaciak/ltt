import { NextApiRequest, NextApiResponse } from 'next';
import dataJson from '../../../data.json';
import { ICareHome, ISearchRequestQuery } from '../../../lib/interfaces';
import getDistanceFromCoordinates from '../../../utils/getDistanceFromCoordinates';

interface ISearchRequest extends NextApiRequest {
	body: ISearchRequestQuery;
}

export default function handler(req: ISearchRequest, res: NextApiResponse) {
	const data = dataJson as Record<string, ICareHome>;

	const query = req.query;
	const { longitude, latitude, careRequired } = query;

	const careHomes = Object.keys(data)
		.filter(
			(x) =>
				getDistanceFromCoordinates(
					parseFloat(latitude as string),
					parseFloat(longitude as string),
					data[x].lat,
					data[x].lon
				) < 25 && filterByCare(data[x], careRequired as string[])
		)
		.map((x) => data[x]);

	res.status(200).json(careHomes);
}

function filterByCare(
	careHome: ICareHome,
	careRequired: string[] | undefined
): boolean {
	if (!careRequired || careRequired.length < 1) {
		return true;
	}

	if (
		careRequired.includes('residential') &&
		(careHome.pricing.permanent.residential === 'N/A' ||
			careHome.pricing.permanent.residentialDementia === 'N/A' ||
			careHome.pricing.respite.residential === 'N/A' ||
			careHome.pricing.respite.residentialDementia === 'N/A')
	) {
		return false;
	}

	//TODO
	return true;
}
