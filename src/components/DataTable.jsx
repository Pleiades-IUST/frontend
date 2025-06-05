import { Table } from '@chakra-ui/react';

const DataTable = ({ data }) => {
  return (
    <Table.ScrollArea borderWidth="1px" rounded="md" height="84vh">
      <Table.Root w="80vw" size="sm" stickyHeader interactive>
        <Table.Header>
          <Table.Row bg="bg.subtle">
            <Table.ColumnHeader>Lat</Table.ColumnHeader>
            <Table.ColumnHeader>Long</Table.ColumnHeader>
            <Table.ColumnHeader>RSRP/RSCP</Table.ColumnHeader>
            <Table.ColumnHeader>RSRQ/EC-N0</Table.ColumnHeader>
            <Table.ColumnHeader>TAC/LAC</Table.ColumnHeader>
            <Table.ColumnHeader>Cell ID</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.lat}</Table.Cell>
              <Table.Cell>{item.lng}</Table.Cell>
              <Table.Cell>{item.rsrp_rscp}</Table.Cell>
              <Table.Cell>{item.rsrq_ecn0}</Table.Cell>
              <Table.Cell>{item.tac_lac}</Table.Cell>
              <Table.Cell>{item.cellid}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
};

export default DataTable;
