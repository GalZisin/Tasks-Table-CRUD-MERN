import React, { useState, useEffect, Fragment, FormEvent, ChangeEvent } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, Row } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useAlert } from 'react-alert'
import { updateTask, getTaskDetails, clearErrors } from '../actions/taskActions'
import { UPDATE_TASK_RESET } from '../constants/taskConstants'
import { RootState } from '../store'

interface IParams {
  id: string;
}

const UpdateMyTask = () => {

  const alert = useAlert();
  const history = useHistory();
  const params: IParams = useParams();
  const dispatch = useDispatch();

  const [selectedTask, setSelectedTask] = useState({
    _id: '',
    title: '',
    description: '',
  });
  const [isAdmin, setIsAdmin] = useState(true);

  const { error, task } = useSelector((state: RootState) => state.taskDetails)
  const { loading, isUpdated, error: updateError } = useSelector((state: RootState) => state.task)
  const { user } = useSelector((state: RootState) => state.auth)

  const taskId = params.id;

  useEffect(() => {

    if (user.role !== 'admin') {
      setIsAdmin(false);
    }

    if (task && task._id !== taskId) {
      dispatch(getTaskDetails(taskId));
    } else {
      setSelectedTask(task)
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors())
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors())
    }

    if (isUpdated) {
      if (user.role === 'admin') {
        history.push('/admin/tasks');
      } else if (user.role === 'user') {
        history.push('/tasks/me');
      }

      alert.success('Task updated successfully');
      dispatch({ type: UPDATE_TASK_RESET })
    }

  }, [dispatch, error, updateError, history, alert, task, isUpdated, user, taskId]);

  const submitHandler = (e: FormEvent): void => {
    e.preventDefault();
    let title: string = selectedTask.title;
    let description: string = selectedTask.description;

    dispatch(updateTask(task._id, { task: { title, description } }))
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setSelectedTask({
      ...selectedTask,
      [e.target.name]: e.target.value,
    });
  };

  const adminLink = (
    <Fragment>
      <Link to="/admin/tasks" className="btn btn-danger ml-2">
        Cancel
      </Link>
    </Fragment>
  );

  const userLink = (
    <Fragment>
      <Link to="/tasks/me" className="btn btn-danger ml-2">
        Cancel
      </Link>
    </Fragment>
  );

  return (
    <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="12" lg="10" xl="8">
            <Card className="mx-4">
              <CardBody className="p-4">
                <Form onSubmit={submitHandler}>
                  <h1>Update Task</h1>

                  <InputGroup className="mb-3">
                    <Input
                      type="text"
                      id="title_field"
                      name="title"
                      placeholder="Title"
                      value={selectedTask.title}
                      onChange={onChange}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <Input
                      type="text"
                      id="description_field"
                      name="description"
                      placeholder="Description"
                      value={selectedTask.description}
                      onChange={onChange}
                    />
                  </InputGroup>

                  <CardFooter className="p-4">
                    <Row>
                      <Col xs={{ size: 4, offset: 1 }} md={{ size: 2, offset: 4 }}>
                        <Button type="submit" className="btn btn-info mb-1" disabled={loading ? true : false}>
                          <span>Save</span>
                        </Button>
                      </Col>

                      <Col className="btn-cancel" xs={{ size: 6, offset: 1 }} md={{ size: 3, offset: 0 }}>
                        {isAdmin ? adminLink : userLink}
                      </Col>
                    </Row>
                  </CardFooter>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UpdateMyTask;
