import * as React from 'react';
import {
    List,
    Datagrid,
    TextField,
    BooleanField,
    SimpleShowLayout,
    NumberField,
    Show,
    DateField,
    ReferenceField,
    ShowController,
    ShowView,
    FunctionField,
    Filter,
    TextInput,
    ReferenceInput,
    SelectInput,
    AutocompleteInput,
    ShowButton,
    BulkDeleteButton,
    BulkExportButton,
} from 'react-admin';
import { makeStyles, Chip } from '@material-ui/core';
import classnames from 'classnames';
import MyBooleanField from './MyBooleanField';
import RestartButton from './RestartButton';
import { Fragment } from 'react';

const KasseBulkActionButtons = ({ basePath }) => (
    <Fragment>
        <BulkExportButton />
        <BulkDeleteButton basePath={basePath} />
    </Fragment>
);
const useQuickFilterStyles = makeStyles((theme) => ({
    chip: {
        marginBottom: theme.spacing(1),
    },
}));
const QuickFilter = ({ label }) => {
    // const translate = useTranslate();
    const classes = useQuickFilterStyles();
    return <Chip className={classes.chip} label={label} />;
};

const KasseFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />

        <ReferenceInput
            label="Domain"
            source="domainID"
            reference="domains"
            sortBy="domainName"
            sort={{ field: 'domainName', order: 'ASC' }}
            perPage="500"
        >
            <SelectInput optionText="domainName" />
        </ReferenceInput>
        <QuickFilter source="tseOn" label="TSE On" defaultValue={true} />
    </Filter>
);

export const KassList = (props) => (
    <List
        {...props}
        bulkActionButtons={<KasseBulkActionButtons />}
        filters={<KasseFilter />}
    >
        <Datagrid rowClick="show">
            <ReferenceField
                label="Domain"
                source="domainID"
                reference="domains"
                sort={{ field: 'domainName', order: 'ASC' }}
                link={false}
                sortBy="domainName"
            >
                <TextField source="domainName" />
            </ReferenceField>
            <NumberField label="Kasse ID" source="kasse" />
            {/* <BooleanField label="TSE on/off" source="tseOn" /> */}
            <MyBooleanField label="TSE on/off" source="tseOn" />
            <TextField label="TSE module in use" source="tseModule" />
            <FunctionField
                label="Timeouts quantity"
                render={(record) => `${record.timeouts.length}`}
                sort={{ field: 'timeouts_count', order: 'DESC' }}
                sortBy="timeouts_count"
            />
            <ShowButton />
            <RestartButton />
        </Datagrid>
    </List>
);
export const KassShow = (props) => (
    <ShowController {...props}>
        {(controllerProps) => (
            <ShowView {...props} {...controllerProps}>
                <SimpleShowLayout>
                    <TextField source="id" />
                    <FunctionField
                        label="Operation system"
                        render={(record) =>
                            `${record.platform} ${record.osname}  ${record.arch}`
                        }
                    />
                    <TextField label="Free system memory" source="freesysmem" />
                    <TextField label="Total system memory" source="totalmem" />
                    <TextField label="Uptime" source="uptime" />
                    <TextField
                        label="Download speed in Mbps"
                        source="downSpeed.mbps"
                    />
                    <TextField label="Processor" source="cpu" />
                    <TextField label="Disk C total space" source="diskСSpace" />
                    <TextField
                        label="Disk C total free space"
                        source="diskСFreeSpace"
                    />
                    <TextField label="Firefox version" source="FFVersion" />
                    <TextField label="Chrome version" source="ChVersion" />
                    <TextField source="kasse" />
                    <TextField label="MySql version" source="mysqlversion" />
                    {controllerProps.record &&
                        controllerProps.record.printer &&
                        controllerProps.record.printer[0] && (
                            <FunctionField
                                label="Printer"
                                render={(record) =>
                                    `${record.printer[0].name} ${record.printer[0].status}`
                                }
                            />
                        )}
                    {controllerProps.record &&
                        controllerProps.record.tseEFRType && (
                            <FunctionField
                                label="TSE type"
                                render={(record) =>
                                    record.tseEFRType == 'TSE_SB'
                                        ? 'SwissBit'
                                        : 'Deutsche Fiscal Cloud'
                                }
                            />
                        )}
                    <DateField label="Date of update" source="updatedAt" />
                    here button
                    <RestartButton />
                </SimpleShowLayout>
            </ShowView>
        )}
    </ShowController>
);
