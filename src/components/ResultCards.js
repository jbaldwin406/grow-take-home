import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CardActions from '@mui/material/CardActions';
import TablePagination from '@mui/material/TablePagination';
import ResultCardDetail from './ResultCardDetail';

const ResultCards = ({ data, filterValue, date }) => {
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [inDetailMode, enterDetailMode] = useState(false);
    
    const dt = new Date(date);
    const month = dt.getMonth();
    const year = dt.getFullYear();
    const firstDay = (new Date(year, month, 1)).toISOString().slice(0, 10).replace(/-/g, "");
    const lastDay = (new Date(year, month + 1, 0)).toISOString().slice(0, 10).replace(/-/g, "");

    const filterResults = data.filter((num) => num.rank <= filterValue);

    const [articleDetail, setArticleDetail] = useState('');

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const viewDetails = (title) => {
        enterDetailMode(true);
        setArticleDetail(title);
    }

    const cancel = () => {
        enterDetailMode(false);
    }

    return (
            <div className='grid-container'>
                {inDetailMode && (
                    <ResultCardDetail cancel={cancel} results={articleDetail} startDate={firstDay} endDate={lastDay}/>
                )}
                {!inDetailMode && (

                <>
                <Grid sx={{ flexGrow: 1 }} 
                    container 
                    spacing={2}
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start">
                {(rowsPerPage > 0
                    ? filterResults.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : filterResults).map((result, i) => (
                    <Grid item xs={6} key={i} >
                        <Card >
                            <CardContent>
                            <Typography variant="h5">{`${result.rank}. ${result.article}`}</Typography>
                            <Typography paragraph>{`Views: ${result.views}`}</Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    size="small" 
                                    variant="contained" 
                                    sx={{ ':hover': {bgcolor: '#27AE60', },
                                        backgroundColor: '#7DCEA0',
                                        marginLeft: 'auto' }} 
                                    onClick={() => viewDetails(result.article)}>
                                    Learn More
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
                </Grid>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    count={filterResults.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                </>
                )}
            </div>
    )
}

export default ResultCards;