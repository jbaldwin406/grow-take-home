import { makeGetRequest } from './requestHelpers';

export const getMostViewedArticles = async (year, month, day) => {
    return makeGetRequest(`https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/${year}/${month}/${day}`);
}

// For possible future use. Can leverage this endpoint to get data by country of origin
// export const getMostViewedArticlesByCountry = async (country, year, month, day) => {
//     return makeGetRequest(`https://wikimedia.org/api/rest_v1/metrics/pageviews/top-per-country/${country}/all-access/${year}/${month}/${day}`);
// }

export const getArticleMetadata = async (title) => {
    return makeGetRequest(`https://en.wikipedia.org/api/rest_v1/page/summary/${title}`);
}

export const getPageHistory = async (title, startDate, endDate) => {
    return makeGetRequest(`https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia.org/all-access/all-agents/${title}/daily/${startDate}/${endDate}`)
}