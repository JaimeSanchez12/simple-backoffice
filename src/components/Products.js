import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Colors } from "../styles/theme";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import { Height } from "@mui/icons-material";
import { minHeight } from "@mui/system";

//MOCK DATA
const products = [
  {
    _id: 1,
    name: "Bag 1",
    price: 100,
    qty: 10,
    sku: "123456",
    description: "This is a bag",
  },
];

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive."),
  qty: Yup.number().required("Quantity is required"),
  sku: Yup.string().required("SKU is required"),
  description: Yup.string().required("Description is required"),
});

export default function Products() {
  const [open, setOpen] = useState(false);

  const [initialValues, setInitialValues] = useState({
    _id: -1,
    name: "",
    price: "",
    qty: "",
    sku: "",
    description: "",
  });
  const handleAddProduct = () => {
    setInitialValues({
      _id: -1,
      name: "",
      price: "",
      qty: "",
      sku: "",
      description: "",
    });
    setOpen(true);
  };

  const handleEditProduct = (product) => {
    setInitialValues({
      _id: product._id,
      name: product.name,
      price: product.price,
      qty: product.qty,
      sku: product.sku,
      description: product.description,
    });
    setOpen(true);
  };

  const handleDeleteProduct = (product) => {
    console.log("edit", product);
  };

  const handleSubmit = (values) => {
    // Get the highest _id from the products array
    const maxId = Math.max(...products.map((product) => product._id), 0);
    values._id = maxId + 1;

    products.push(values);
    setOpen(false);
  };

  return (
    <>
      <Typography sx={{ mb: 1 }} variant="h4">
        Products
      </Typography>
      <Button
        startIcon={<AddIcon />}
        variant="contained"
        onClick={handleAddProduct}
      >
        Add Product
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>_id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Qty</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p._id}>
                <TableCell>{p._id}</TableCell>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.price}</TableCell>
                <TableCell>{p.qty}</TableCell>
                <TableCell>{p.sku}</TableCell>
                <TableCell>{p.description}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditProduct(p)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteProduct(p)}>
                    <DeleteForeverIcon sx={{ color: Colors.danger }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} fullWidth maxWidth="lg" onClose={() => {}}>
        <DialogTitle>Add Product</DialogTitle>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ dirty, isValid, getFieldProps }) => (
            <Form>
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid size={8}>
                    <Field
                      name="name"
                      label="Name"
                      as={TextField}
                      fullWidth
                      required
                    />
                    <ErrorMessage name="name" component="div" />
                  </Grid>
                  <Grid size={4}>
                    <Field
                      name="price"
                      label="Price"
                      as={TextField}
                      fullWidth
                      required
                    />
                    <ErrorMessage name="price" component="div" />
                  </Grid>
                  <Grid size={8}>
                    <Field
                      name="sku"
                      label="SKU"
                      as={TextField}
                      fullWidth
                      required
                    />
                    <ErrorMessage name="sku" component="div" />
                  </Grid>
                  <Grid size={4}>
                    <Field
                      name="qty"
                      label="Qty"
                      as={TextField}
                      fullWidth
                      required
                    />
                    <ErrorMessage name="qty" component="div" />
                  </Grid>
                  <Grid size={12}>
                    <Field
                      name="description"
                      label="Description"
                      as={TextField}
                      fullWidth
                      required
                    />
                    <ErrorMessage name="description" component="div" />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                {getFieldProps("_id").value !== -1 ? (
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={!dirty || !isValid}
                  >
                    Edit
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={!dirty || !isValid}
                  >
                    Save
                  </Button>
                )}
                <Button autoFocus onClick={() => setOpen(false)}>
                  Cancel
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  );
}
