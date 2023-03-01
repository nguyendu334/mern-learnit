import { useContext, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { PostContext } from '../../contexts/PostContext';

export default function AddPostModal() {
    const { showAddPostModal, setShowAddPostModal, addPost, setShowToast } = useContext(PostContext);

    const [newPost, setNewPost] = useState({
        title: '',
        description: '',
        url: '',
        status: 'TO LEARN',
    });

    const { title, description, url } = newPost;

    const onChangeNewPostForm = (event) => setNewPost({ ...newPost, [event.target.name]: event.target.value });

    const close = () => {
        resetAddPostData();
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        const { success } = await addPost(newPost);
        resetAddPostData();
        setShowToast({ show: true, type: success ? 'success' : 'danger' });
    };

    const resetAddPostData = () => {
        setNewPost({
            title: '',
            description: '',
            url: '',
            status: 'TO LEARN',
        });
        setShowAddPostModal(false);
    };
    return (
        <Modal show={showAddPostModal} onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title>What do you want to learn?</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="Title"
                            name="title"
                            required
                            aria-describedby="title-help"
                            value={title}
                            onChange={onChangeNewPostForm}
                        />
                        <Form.Text id="title-help" muted>
                            Required
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mt-2 mb-2">
                        <Form.Control
                            as="textarea"
                            placeholder="Description"
                            rows={3}
                            name="description"
                            value={description}
                            onChange={onChangeNewPostForm}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="Youtube Tutorial URL"
                            name="url"
                            value={url}
                            onChange={onChangeNewPostForm}
                        />
                    </Form.Group>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={close}>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit">
                            Learn It!
                        </Button>
                    </Modal.Footer>
                </Modal.Body>
            </Form>
        </Modal>
    );
}
