import axios from 'axios';

const defaultHeaders = {
    accept: 'application/json',
    'content-type': 'application/json',
};

function handleExceptions(res) {
    if (res) {
        if (res.status === 404) {
            // do something
            return true;
        }
    }
    return false;
}

export async function makeGetRequest(url) {
    try {
        const res = await axios.get(url);
        return res.data;
    } catch (err) {
        if (!handleExceptions(err.response)) {
            throw err;
        }
    }
    return null;
}