import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { showNotification, CREATE } from 'react-admin';
import dataProvider from './dataProvider';
// import { push } from 'react-router-redux';

class RestartButton extends Component {
    handleClick = () => {
        const { push, record, showNotification } = this.props;
        const updatedRecord = { _id: record._id };
        dataProvider(CREATE, '/kasses/restart', { body: updatedRecord })
            // fetch(`/kasses/restart`, { method: 'POST', body: updatedRecord })
            .then(() => {
                showNotification('Kasse restarted');
                // push('/kasses');
            })
            .catch((e) => {
                showNotification('Error: kasse not restarted', 'warning');
            });
    };

    render() {
        return <Button label="Restart" onClick={this.handleClick} />;
    }
}

RestartButton.propTypes = {
    push: PropTypes.func,
    record: PropTypes.object,
    showNotification: PropTypes.func,
};

export default connect(null, {
    showNotification,
    // push,
})(RestartButton);
