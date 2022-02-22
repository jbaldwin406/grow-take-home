import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TablePagination from '@mui/material/TablePagination';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#5d6d7e',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Results = ({ data, filterValue }) => {
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const numResults = data.filter((num) => num.rank <= filterValue);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Box sx={{ 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '16px',
        }}>
        <TableContainer component={Paper} sx={{ width: '50%', justifyContent: 'center'}}>
        <Table >
            <TableHead>
                <StyledTableRow>
                    <StyledTableCell>Rank</StyledTableCell>
                    <StyledTableCell align="left">Title</StyledTableCell>
                    <StyledTableCell align="left"># of Views</StyledTableCell>
                </StyledTableRow>
            </TableHead>
            <TableBody>
                {(rowsPerPage > 0
                    ? numResults.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : numResults).map((result, i) => (
                <StyledTableRow
                    key={i}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <StyledTableCell component="th" scope="row">
                    {result.rank}
                    </StyledTableCell>
                    <StyledTableCell align="left">{result.article}</StyledTableCell>
                    <StyledTableCell align="left">{result.views_ceil}</StyledTableCell>
                </StyledTableRow>
                ))}
            </TableBody>
            </Table>
            <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={numResults.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </TableContainer>
        
        </Box>
    )
}

export default Results;