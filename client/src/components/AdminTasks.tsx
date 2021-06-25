import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminTasks, deleteTask, clearErrors } from '../actions/taskActions';
import { RootState } from '../store'
import Button from '@material-ui/core/Button';
import Loader from './Loader'
import { useAlert } from 'react-alert'
import { useHistory } from 'react-router-dom'
import { DELETE_TASK_RESET } from '../constants/taskConstants';
import moment from 'moment'
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'

const AdminTasks = () => {

  const alert = useAlert();
  const history = useHistory();
  const dispatch = useDispatch();

  const { error, loading, tasks } = useSelector((state: RootState) => state.tasks)
  const { error: deleteError, isDeleted } = useSelector((state: RootState) => state.task)
  const { user } = useSelector((state: RootState) => state.auth)

  useEffect(() => {

    dispatch(getAdminTasks())

    if (error) {
      alert.error(error);
      dispatch(clearErrors())
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors())
    }
    if (isDeleted) {
      history.push('/admin/tasks');
      alert.success('Task deleted successfully');
      dispatch({ type: DELETE_TASK_RESET })
    }
  }, [dispatch, deleteError, error, alert, isDeleted, user, history]);

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

  const handleDelete = (id: string) => {

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        dispatch(deleteTask(id));

        if (isDeleted) {
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })



  };

  const handleEdit = (id: string) => {
    history.push(`/task/${id}`);
  };

  return (
    <Fragment>
      <div className="container">
        {loading ? <Loader /> : (

          <table className="table">
            <thead>
              <tr>
                {/* <th>User name</th>  */}
                <th>User Id</th>
                <th>Task create at</th>
                <th>Task Title</th>
                <th>Task Description</th>
                <th>Action</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks &&
                tasks.map(({ _id, title, description, user, nameOfUser, createdAt }: any) => (
                  <tr key={_id}>
                    <td data-label="User Id" className="wrapText">
                      {user}
                    </td>
                    <td data-label="Created At" className="wrapText">
                      {moment(createdAt).format("LLL")}
                    </td>
                    <td data-label="Title" className="wrapText">
                      {title}
                    </td>
                    <td data-label="Description" className="wrapText">
                      {description}
                    </td>
                    <td data-label="Edit">
                      <Button className="edit-btn" variant="contained" color="primary" onClick={() => handleEdit(_id)}>
                        Edit
                      </Button>
                    </td>
                    <td data-label="Delete">
                      <Button className="delete-btn"
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDelete(_id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

        )}
      </div>

    </Fragment>
  );
};

export default AdminTasks;