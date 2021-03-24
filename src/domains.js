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
            {/* <TextField source="domainName" /> */}
            <TextField source="domainName" />
            <BooleanField source="fiscal_export_sw" />
            <BooleanField source="fiscal_export_efr" />
        </Datagrid>
    </List>
);
