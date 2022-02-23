import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel  from '@mui/material/InputLabel';
import MenuItem  from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { getMostViewedArticles } from '../service/wikiService.js';
import ResultCards from './ResultCards.js';

const WikiSearch = () => {
    const yesterdayDate = (d => new Date(d.setDate(d.getDate()-1)))(new Date());
    const yesterdayStr = yesterdayDate.toISOString().slice(0, 10);

    const [searchParams, setSearchParams] = useState({
        asOfDate: yesterdayStr,
        numResults: 100,
    });

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

        const data = await getMostViewedArticles(year, month, day);
        setResults(data.items[0].articles);
    }

    return (
        <>
            <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            width: 1,
            justifyContent: 'center',
            marginTop: '32px',
            position: 'sticky',
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
            <Button variant="contained" sx={{ m: 1, minWidth: 120, backgroundColor: '#7DCEA0', ':hover': {bgcolor: '#27AE60', }, }} onClick={handleSearch}>Search</Button>
            </Box>
            <ResultCards data={results} filterValue={searchParams.numResults} date={searchParams.asOfDate}/>
        </>
    )
}

export default WikiSearch;