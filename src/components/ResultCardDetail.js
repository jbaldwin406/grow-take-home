import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getArticleMetadata, getPageHistory } from '../service/wikiService';

const emptyDescription = {
    description: 'Description N/A',
}

const ResultCardDetail = ({ cancel, results, startDate, endDate }) => {
    const [pageData, setPageData] = useState([]);
    const [pageDescription, setPageDescription] = useState([]);

    function getSortOrder(prop) {
        return function(a, b) {
            if (a[prop] > b[prop]) {
                return -1;
            } else if (a[prop] < b[prop]) {
                return 1;
            }
            return 0;
        }
    }

    useEffect(() => {
        (async () => {
            const viewData = await getPageHistory(results, startDate, endDate);
            const viewDescription = await getArticleMetadata(results);
            setPageData((viewData.items).sort(getSortOrder("views")));
            setPageDescription(viewDescription ?? emptyDescription);
        })();   
    }, [results, startDate, endDate]);

    console.log(pageData);

    return (
        <Card>
            <CardContent>
                {(!pageDescription.displaytitle) ?
                <Typography variant="h5" >
                    {results}
                </Typography>
                : <Typography variant="h5" >
                    {pageDescription.displaytitle}
                </Typography>
                }
                <Typography paragraph>{pageDescription.description}</Typography>
                
                
                    <>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: '16px',
                        border: 'none',
                    }}>
                        <TableContainer component={Paper} sx={{ width: '50%', justifyContent: 'center', border:'none'}}>
                            <Table>
                            <TableHead>
                                <TableRow>            
                                    <TableCell align="left">Date</TableCell>
                                    <TableCell align="left"># of Views</TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                                <TableBody>
                                    {(pageData.slice(0, 3)).map((res, i) => (
                                        <TableRow key={i} sx={{'& > *': { borderBottom: 'unset' }}}>
                                            <TableCell>{res.timestamp.slice(0, -2).replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3")}</TableCell>
                                            <TableCell>{res.views}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                    </>
            
                
            </CardContent>
            <CardActions disableSpacing>
            <Button 
                size="small" 
                variant="contained" 
                sx={{ ':hover': {bgcolor: '#27AE60', },
                       backgroundColor: '#7DCEA0',
                       marginLeft: 'auto' }}  
                onClick={cancel}>
            Cancel
          </Button>
          </CardActions>
        </Card> 
    )
}

export default ResultCardDetail;