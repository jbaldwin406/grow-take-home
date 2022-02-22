import React, { useState } from 'react';
import { countries } from '../utils/countries.js';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import InputLabel  from '@mui/material/InputLabel';
import MenuItem  from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Results from './Results';

const Search = () => {
    const yesterdayDate = (d => new Date(d.setDate(d.getDate()-1)))(new Date());
    const yesterdayStr = yesterdayDate.toISOString().slice(0, 10);
    const [searchParams, setSearchParams] = useState({
        asOfDate: yesterdayStr,
        numResults: 100,
        country: 'US',
    })
    const [results, setResults] = useState([]);

    const handleChange = (event) => {
        const params = {
            ...searchParams,
            [event.target.name]: event.target.value,
        }
        setSearchParams(params);
    }

    const handleSearch = async e => {
        e.preventDefault();
        const searchDate = searchParams.asOfDate;
        if (searchDate === '') return;

        const [year, month, day] = searchDate.split('-');
        console.log(searchDate);
        console.log(searchParams)

        const api = (`https://wikimedia.org/api/rest_v1/metrics/pageviews/top-per-country/${searchParams.country}/all-access/${year}/${month}/${day}`);

        const response = await fetch(api);

        if (!response.ok) {
            throw Error(response.statusText);
        }

        const json = await response.json();

        setResults(json.items[0].articles);
    }

    return (
        <>
        <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            width: 1,
            justifyContent: 'center',
            marginTop: '16px'
        }}>
            <FormControl variant="outlined" sx={{ m: 1, minWidth: 200 }}>
                <TextField 
                    variant="outlined"
                    type="date"
                    name="asOfDate"
                    label="As of Date"
                    onChange={handleChange}
                    value={searchParams.asOfDate}
                    InputLabelProps={{ shrink: true }}
                    />
            </FormControl>
            <FormControl variant="outlined" sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="Number"># of Results</InputLabel>
                <Select 
                name="numResults"
                id="select"
                label="# of Results"
                onChange={handleChange}
                value={searchParams.numResults}
                >
                    <MenuItem value={25}>25</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={75}>75</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                    <MenuItem value={200}>200</MenuItem>
                    <MenuItem value={300}>300</MenuItem>
                </Select>
            </FormControl>
            <FormControl variant="outlined" sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="Number">Country</InputLabel>
                <Select 
                name="country"
                id="select"
                label="Country"
                onChange={handleChange}
                value={searchParams.country}
                >
                {countries.map((c) => 
                    <MenuItem key={c.code} value={c.code}>{c.name}</MenuItem>
                )}
                </Select>
            </FormControl>
            <Button variant="contained" sx={{ m: 1, minWidth: 120, backgroundColor: '#5d6d7e' }} onClick={handleSearch}>Search</Button>
            </Box>
            
            <Results data={results} filterValue={searchParams.numResults} />
            </>
    )
}

export default Search;