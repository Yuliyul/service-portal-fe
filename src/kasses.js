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
} from 'react-admin';

export const KassList = (props) => (
    <List {...props}>
        <Datagrid rowClick="show">
            {/* <ReferenceField source="_id" reference="s">
                <TextField source="id" />
            </ReferenceField> */}
            <TextField source="domainName" />
            <NumberField source="kasse" />
            <BooleanField source="tseOn" />
            <TextField source="tseModule" />
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

                    <DateField label="Date of update" source="updatedAt" />
                </SimpleShowLayout>
            </ShowView>
        )}
    </ShowController>
);
