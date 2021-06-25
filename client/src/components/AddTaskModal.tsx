import React, { Fragment, useState, useEffect, FormEvent } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { getMyTasks, newTask, clearErrors } from '../actions/taskActions';
import { ITarget } from '../types/interfaces';

const AddTaskModal = () => {

  const dispatch = useDispatch();

  const { error } = useSelector((state: RootState) => state.newTask)

  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {

    if (error) {
      dispatch(clearErrors())
    }

  }, [dispatch, error])

  const handleToggle = () => setModal(!modal);

  const handleChangeTitle = (e: ITarget) => setTitle(e.target.value);
  const handleChangeDescription = (e: ITarget) => setDescription(e.target.value);

  // const newTask: ITask = { task: { title, description } }


  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Add item via addItem action
    const task = { title, description }

    dispatch(newTask(task));
    // Close modal
    handleToggle();
    dispatch(getMyTasks());
  };

  return (
    <Fragment>
      <Button color="dark" style={{ marginBottom: '2rem', marginLeft: 20 }} onClick={handleToggle}>
        Add Task
      </Button>
      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>Add new task</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleOnSubmit}>
            <FormGroup>
              <Label for="item">Task</Label>
              <Input
                type="text"
                name="name"
                // id="item"
                placeholder="Add title"
                onChange={handleChangeTitle}
              />
            </FormGroup>
            <FormGroup>
              <Input
                style={{ marginTop: 10 }}
                type="text"
                name="name"
                // id="item"
                placeholder="Add description"
                onChange={handleChangeDescription}
              />
              <Button color="dark" style={{ marginTop: '2rem' }} block>
                Add Task
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default AddTaskModal;