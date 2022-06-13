import axios from 'axios';

const AUTH_ID = 'b4b9aaf0-6d5c-1052-a77b-8e1897a21dfc';
const AUTH_TOKEN = 'kfd5PYlIJKY7rQK1QWo3';
const LICENSE = 'us-core-cloud';

const MOCK_UP = [
	{
		"input_index": 0,
		"candidate_index": 0,
		"delivery_line_1": "1 Santa Claus Ln",
		"last_line": "North Pole AK 99705-9901",
		"delivery_point_barcode": "997059901010",
		"components": {
			"primary_number": "1",
			"street_name": "Santa Claus",
			"street_suffix": "Ln",
			"city_name": "North Pole",
			"state_abbreviation": "AK",
			"zipcode": "99705",
			"plus4_code": "9901",
			"delivery_point": "01",
			"delivery_point_check_digit": "0"
		},
		"metadata": {
			"record_type": "S",
			"zip_type": "Standard",
			"county_fips": "02090",
			"county_name": "Fairbanks North Star",
			"carrier_route": "C004",
			"congressional_district": "AL",
			"rdi": "Commercial",
			"elot_sequence": "0001",
			"elot_sort": "A",
			"latitude": 64.75233,
			"longitude": -147.35297,
			"coordinate_license": 1,
			"precision": "Rooftop",
			"time_zone": "Alaska",
			"utc_offset": -9,
			"dst": true
		},
		"analysis": {
			"dpv_match_code": "Y",
			"dpv_footnotes": "AABB",
			"dpv_cmra": "N",
			"dpv_vacant": "N",
			"dpv_no_stat": "Y",
			"active": "Y",
			"footnotes": "L#"
		}
	},
];

// Get Valid addresses by search query
export const fetchSimilarAddresses = (address: string) => {
  try {
    // TODO: implemented Address API call
    // const results = await axios.get(`https://us-street.api.smartystreets.com/street-address?auth-id=${AUTH_ID}&auth-token=${AUTH_TOKEN}&license=${LICENSE}&lastline=smithfield`);

    return MOCK_UP;
  } catch (err) {
    console.log((err as Error).message);
    return [];
  }
}