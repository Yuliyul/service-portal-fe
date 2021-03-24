import * as React from 'react';
import { BooleanField } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import { classnames } from 'classnames';
// import LaunchIcon from '@material-ui/icons/Launch';

const boolStyles = makeStyles({
    on: {
        fontWeight: 'bold',
        // This is JSS syntax to target a deeper element using css selector, here the svg icon for this button
        '& svg': { color: 'green' },
    },
    off: {
        fontWeight: 'bold',
        // This is JSS syntax to target a deeper element using css selector, here the svg icon for this button
        '& svg': { color: 'red' },
    },
});
const MyBooleanField = (props) => {
    const classes = boolStyles();
    return (
        <BooleanField
            className={classnames({
                [classes.on]: props.record[props.source] == true,
                [classes.off]: props.record[props.source] == false,
            })}
            {...props}
        />
    );
};
export default MyBooleanField;
MyBooleanField.defaultProps = BooleanField.defaultProps;
