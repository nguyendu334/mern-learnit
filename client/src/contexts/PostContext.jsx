import React, { createContext, useReducer, useState } from 'react';
import axios from 'axios';
import { postReducer } from '../reducers/postReducer';
import {
    apiUrl,
    POST_LOADED_FAIL,
    POST_LOADED_SUCCESS,
    ADD_POST,
    DELETE_POST,
    UPDATE_POST,
    FIND_POST,
} from './constants';

export const PostContext = createContext();

export default function PostContextProvider({ children }) {
    const [postState, dispatch] = useReducer(postReducer, {
        post: null,
        posts: [],
        postLoading: true,
    });

    const [showAddPostModal, setShowAddPostModal] = useState(false);
    const [showUpdatePostModal, setShowUpdatePostModal] = useState(false);

    const [showToast, setShowToast] = useState({
        show: false,
        message: '',
        type: null,
    });

    // Get all posts
    const getPosts = async () => {
        try {
            const response = await axios.get(`${apiUrl}/post`);
            if (response.data.success) {
                dispatch({
                    type: POST_LOADED_SUCCESS,
                    payload: response.data.posts,
                });
            }
        } catch (error) {
            dispatch({
                type: POST_LOADED_FAIL,
            });
        }
    };

    // adđ post
    const addPost = async (newPost) => {
        try {
            const response = await axios.post(`${apiUrl}/post/create`, newPost);
            if (response.data.success) {
                dispatch({
                    type: ADD_POST,
                    payload: response.data.post,
                });
                return response.data;
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error' };
        }
    };

    // Delete post
    const deletePost = async (postId) => {
        try {
            const response = await axios.delete(`${apiUrl}/post/${postId}/force`);
            if (response.data.success) {
                dispatch({
                    type: DELETE_POST,
                    payload: postId,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    // find post when user click edit
    const findPost = (postId) => {
        const post = postState.posts.find((post) => post._id === postId);
        dispatch({
            type: FIND_POST,
            payload: post,
        });
    };

    // update post
    const updatePost = async (updatePost) => {
        try {
            const response = await axios.put(`${apiUrl}/post/${updatePost._id}`);
            if (response.data.success) {
                dispatch({
                    type: UPDATE_POST,
                    payload: response.data.post,
                });
                return response.data;
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error' };
        }
    };

    const postContextData = {
        postState,
        getPosts,
        showAddPostModal,
        setShowAddPostModal,
        addPost,
        deletePost,
        updatePost,
        findPost,
        showToast,
        setShowToast,
        showUpdatePostModal,
        setShowUpdatePostModal,
    };
    return <PostContext.Provider value={postContextData}>{children}</PostContext.Provider>;
}
