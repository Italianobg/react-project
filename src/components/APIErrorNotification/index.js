import useAPIError from '../../hooks/useAPIError';
import { Modal } from '@material-ui/core';
import { useEffect } from 'react';

function APIErrorNotification() {
  const { error, removeError } = useAPIError();
  useEffect(() => {
    setTimeout(() => {
      removeError();
    }, 10000);
  });

  const handleSubmit = () => {
    removeError();
  };

  return (
    <Modal open={!!error} data-testid="notification-modal">
      <div className="wrapper">
        <div className="errors">
          {error ? (
            error.message.map ? (
              error.message.map((error) => {
                return <p key={error}>{error}</p>;
              })
            ) : (
              <p>{error.message}</p>
            )
          ) : (
            ''
          )}
          <button
            data-testid="notification-submit-button"
            onClick={handleSubmit}
          >
            close
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default APIErrorNotification;
