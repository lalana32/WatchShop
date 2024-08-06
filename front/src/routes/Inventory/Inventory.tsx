import { useEffect, useState } from 'react';
import { Product } from '../Catalog/Catalog';
import agent from '../../api/agent';
import styled from '@emotion/styled';
import {
  TableCell,
  tableCellClasses,
  TableRow,
  Grid,
  TableContainer,
  Paper,
  Table,
  TableHead,
  Typography,
  TableBody,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { purple } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { NavLink } from 'react-router-dom';
import './Inventory.styles.css';
import { useDispatch } from 'react-redux';
import { deleteProductsAsync } from '../../slices/productsSlice';
import { AppDispatch } from '../../store';

const Inventory = () => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: purple[500],
      color: 'white',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: 'white',
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [deleteProductId, setDeleteProductId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let allProducts: Product[] = [];
        let page = 1;
        let totalPages = 1;

        while (page <= totalPages) {
          const params = new URLSearchParams();
          params.append('page', page.toString());
          params.append('pageSize', '6');

          const response = await agent.Products.getAll(params);

          allProducts = allProducts.concat(response.products);
          totalPages = response.totalPages;
          page++;
        }

        setProducts(allProducts);
        setLoading(false);
      } catch (error) {
        console.error('Greška pri preuzimanju proizvoda:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async () => {
    if (deleteProductId !== null) {
      try {
        await dispatch(deleteProductsAsync(deleteProductId));
        setProducts(
          products.filter((product) => product.id !== deleteProductId)
        );
        setOpen(false);
        window.location.reload();
      } catch (error) {
        console.log('Greška pri brisanju proizvoda:', error);
      }
    }
  };

  const handleClickOpen = (productId: number) => {
    setDeleteProductId(productId);
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  if (loading) return <h1>Loading...</h1>;

  return (
    <div>
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        sx={{ minHeight: '100vh', p: 2 }}
      >
        <Grid item xs={12} sm={10} md={8} lg={10}>
          <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
            <Table aria-label='customized table'>
              <TableHead>
                <TableRow>
                  <StyledTableCell>
                    <Typography variant='h6'>Name</Typography>
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    <Typography variant='h6'>Brand</Typography>
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    <Typography variant='h6'>Price ($)</Typography>
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    <Typography variant='h6'>Sex</Typography>
                  </StyledTableCell>
                  <StyledTableCell align='right'></StyledTableCell>
                  <StyledTableCell align='right'>
                    <NavLink
                      className='whiteLink'
                      to={'/add-product'}
                      state={{ products }}
                    >
                      ADD
                      <PostAddIcon />
                    </NavLink>
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products?.map((product) => (
                  <StyledTableRow key={product.id}>
                    <StyledTableCell component='th' scope='row'>
                      {product.name}
                    </StyledTableCell>
                    <StyledTableCell align='right'>
                      {product.brand}
                    </StyledTableCell>
                    <StyledTableCell align='right'>
                      {product.price / 100}
                    </StyledTableCell>
                    <StyledTableCell align='right'>
                      {product.sex}
                    </StyledTableCell>
                    <StyledTableCell align='right'>
                      <img
                        src={`${product.pictureUrl}`}
                        alt='product'
                        style={{
                          width: '100%',
                          maxWidth: '90px',
                          height: 'auto',
                        }}
                      />
                    </StyledTableCell>
                    <StyledTableCell align='right'>
                      <IconButton
                        aria-label='delete'
                        color='secondary'
                        onClick={() => handleClickOpen(product.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      <Dialog
        open={open}
        onClose={handleClickClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Delete Product'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure you want to delete this product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose}>No</Button>
          <Button onClick={handleDelete} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Inventory;
