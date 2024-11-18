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
import MenuItem from "@mui/material/MenuItem";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  company: Yup.string().required("Company is required"),
  role: Yup.string()
    .oneOf(["Admin", "Operator", "Analyst"], "Invalid role")
    .required("Role is required"),
});

export default function Users() {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);

  const [initialValues, setInitialValues] = useState({
    _id: -1,
    name: "",
    lastName: "",
    email: "",
    company: "",
    role: "",
  });

  const handleAddUser = () => {
    setInitialValues({
      _id: -1,
      name: "",
      lastName: "",
      email: "",
      company: "",
      role: "",
    });
    setOpen(true);
  };

  const handleEditUser = (user) => {
    setInitialValues({
      _id: user._id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      company: user.company,
      role: user.role,
    });
    setOpen(true);
  };

  const handleDeleteUser = (userToDelete) => {
    const filteredUsers = users.filter((user) => user._id !== userToDelete._id);
    setUsers(filteredUsers);
  };

  const handleSubmit = (values, { resetForm }) => {
    if (values._id === -1) {
      // Create new user
      const newUser = {
        ...values,
        _id: users.length > 0 ? Math.max(...users.map((u) => u._id)) + 1 : 1, // Generate new ID
      };
      setUsers([...users, newUser]);
    } else {
      // Update existing user
      const updatedUsers = users.map((user) =>
        user._id === values._id ? values : user
      );
      setUsers(updatedUsers);
    }

    setOpen(false);
    resetForm();
  };

  return (
    <>
      <Typography sx={{ mb: 1 }} variant="h4">
        Users
      </Typography>
      <Button
        startIcon={<AddIcon />}
        variant="contained"
        onClick={handleAddUser}
      >
        Add User
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>_id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u._id}>
                <TableCell>{u._id}</TableCell>
                <TableCell>{u.name}</TableCell>
                <TableCell>{u.lastName}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>{u.company}</TableCell>
                <TableCell>{u.role}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditUser(u)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteUser(u)}>
                    <DeleteForeverIcon sx={{ color: Colors.danger }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} fullWidth maxWidth="lg" onClose={() => {}}>
        <DialogTitle>Add User</DialogTitle>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ dirty, isValid, getFieldProps }) => (
            <Form>
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid size={6}>
                    <Field
                      name="name"
                      label="Name"
                      as={TextField}
                      fullWidth
                      required
                    />
                    <ErrorMessage name="name" component="div" />
                  </Grid>
                  <Grid size={6}>
                    <Field
                      name="lastName"
                      label="Last Name"
                      as={TextField}
                      fullWidth
                      required
                    />
                    <ErrorMessage name="lastName" component="div" />
                  </Grid>
                  <Grid size={6}>
                    <Field
                      name="email"
                      label="Email"
                      as={TextField}
                      fullWidth
                      required
                    />
                    <ErrorMessage name="email" component="div" />
                  </Grid>
                  <Grid size={6}>
                    <Field
                      name="company"
                      label="Company"
                      as={TextField}
                      fullWidth
                      required
                    />
                    <ErrorMessage name="company" component="div" />
                  </Grid>
                  <Grid size={6}>
                    <Field
                      name="role"
                      label="Role"
                      as={TextField}
                      select
                      fullWidth
                      required
                    >
                      <MenuItem value="Admin">Admin</MenuItem>
                      <MenuItem value="Operator">Operator</MenuItem>
                      <MenuItem value="Analyst">Analyst</MenuItem>
                    </Field>
                    <ErrorMessage name="role" component="div" />
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
