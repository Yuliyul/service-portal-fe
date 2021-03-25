import * as React from 'react';
import {
    List,
    Datagrid,
    TextField,
    BooleanField,
    Filter,
    ReferenceInput,
    SelectInput,
} from 'react-admin';
import MyBooleanField from './MyBooleanField';
const DomainFilter = (props) => (
    <Filter {...props}>
        {/* <TextInput label="Search" source="q" alwaysOn /> */}
        <ReferenceInput label="Domain" source="domainID" reference="domains">
            <SelectInput optionText="domainName" />
        </ReferenceInput>
    </Filter>
);
export const DomainList = (props) => (
    <List {...props} bulkActionButtons={false} filters={<DomainFilter />}>
        <Datagrid>
            {/* <ReferenceField source="domainID" reference="domains">
                <TextField source="domainName" />
            </ReferenceField> */}

            <TextField source="domainName" />
            <MyBooleanField label="Use our system" source="fiscal_export_sw" />
            <MyBooleanField label="Use EFR system" source="fiscal_export_efr" />
        </Datagrid>
    </List>
);
