import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import axios from 'axios';
import { addMessage } from '../../slices/messagesSlice';
import AuthContext from '../../contexts/AuthContext';
import routes from '../../routes';

const SendMessageForm = () => {
  const { nickname } = useContext(AuthContext);

  const dispatch = useDispatch();

  const currentChannelId = useSelector((state) => state.currentChannelId);
  const channelMessagesPath = routes.channelMessagesPath(currentChannelId);

  const initialValues = {
    body: '',
  };

  const onSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      setSubmitting(true);
      const message = { ...values, nickname, channelId: currentChannelId };
      const data = { attributes: message };
      await axios.post(channelMessagesPath, { data });
      dispatch(addMessage(message));
      resetForm({});
      setSubmitting(false);
    } catch (e) {
      console.log(e);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <form noValidate="" className="" onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <div className="input-group">
          <input
            name="body"
            aria-label="body"
            className="mr-2 form-control"
            value={formik.values.body}
            onChange={formik.handleChange}
          />
          <button aria-label="submit" type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>Submit</button>
          <div className="d-block invalid-feedback">&nbsp;</div>
        </div>
      </div>
    </form>
  );
};

export default SendMessageForm;
