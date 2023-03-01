import { useContext, useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { PostContext } from '../../contexts/PostContext';

export default function UpdatePostModal() {
    const {
        postState: { post },
        showUpdatePostModal,
        setShowUpdatePostModal,
        updatePost,
        setShowToast,
    } = useContext(PostContext);

    const [updatedPost, setUpdatedPost] = useState(post);

    useEffect(() => setUpdatedPost(post), [post]);

    const { title, description, url, status } = updatedPost;

    const onChangeUpdatedPostForm = (event) =>
        setUpdatedPost({ ...updatedPost, [event.target.name]: event.target.value });

    const close = () => {
        setUpdatedPost(post);
        setShowUpdatePostModal(false);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        const { success } = await updatePost(updatedPost);
        setShowUpdatePostModal(false);
        setShowToast({ show: true, type: success ? 'success' : 'danger' });
    };

    // const resetAddPostData = () => {
    //     setNewPost({
    //         title: '',
    //         description: '',
    //         url: '',
    //         status: 'TO LEARN',
    //     });
    //     setShowAddPostModal(false);
    // };
    return (
        <Modal show={showUpdatePostModal} onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title>Making progress?</Modal.Title>
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
                            onChange={onChangeUpdatedPostForm}
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
                            onChange={onChangeUpdatedPostForm}
                        />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Control
                            type="text"
                            placeholder="Youtube Tutorial URL"
                            name="url"
                            value={url}
                            onChange={onChangeUpdatedPostForm}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control as="select" name="status" value={status} onChange={onChangeUpdatedPostForm}>
                            <option value="TO LEARN">TO LEARN</option>
                            <option value="LEARNING">LEARNING</option>
                            <option value="LEARNED">LEARNED</option>
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={close}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit">
                        Learn IT!
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}
