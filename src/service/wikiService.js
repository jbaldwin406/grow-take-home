import { makeGetRequest } from './requestHelpers';

export const getMostViewedArticles = async (country, year, month, day) => {
    // const api = (`https://wikimedia.org/api/rest_v1/metrics/pageviews/top-per-country/${searchParams.country}/all-access/${year}/${month}/${day}`);

    // const response = await fetch(api);
    // // getMostViewedArticles(searchParams.country, year, month, day);
    // console.log(response);
    //     const json = await response.json();
    //     console.log(json);
    return makeGetRequest(`https://wikimedia.org/api/rest_v1/metrics/pageviews/top-per-country/${country}/all-access/${year}/${month}/${day}`);
}