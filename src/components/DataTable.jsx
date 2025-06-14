import { Table } from '@chakra-ui/react';

const DataTable = ({ data }) => {
  return (
    <Table.ScrollArea borderWidth="1px" rounded="md" height="84vh">
      <Table.Root w="80vw" size="sm" stickyHeader interactive>
        <Table.Header>
          <Table.Row bg="bg.subtle">
            <Table.ColumnHeader>Record Time</Table.ColumnHeader>
            <Table.ColumnHeader>Lat</Table.ColumnHeader>
            <Table.ColumnHeader>Long</Table.ColumnHeader>
            <Table.ColumnHeader>Technology</Table.ColumnHeader>
            <Table.ColumnHeader>RSRP</Table.ColumnHeader>
            <Table.ColumnHeader>RSRQ</Table.ColumnHeader>
            <Table.ColumnHeader>TAC</Table.ColumnHeader>
            <Table.ColumnHeader>Cell ID</Table.ColumnHeader>
            <Table.ColumnHeader>Signal Strength</Table.ColumnHeader>
            <Table.ColumnHeader>Download Rate</Table.ColumnHeader>
            <Table.ColumnHeader>Upload Rate</Table.ColumnHeader>
            <Table.ColumnHeader>Ping</Table.ColumnHeader>
            <Table.ColumnHeader>PCI</Table.ColumnHeader>
            <Table.ColumnHeader>SMS Delivery</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>
                {new Date(item.record_time).toLocaleString()}
              </Table.Cell>
              <Table.Cell>{item.lat?.toFixed(6)}</Table.Cell>
              <Table.Cell>{item.lng?.toFixed(6)}</Table.Cell>
              <Table.Cell>{item.technology}</Table.Cell>
              <Table.Cell>{item.rsrp_rscp}</Table.Cell>
              <Table.Cell>{item.rsrq_ecn0}</Table.Cell>
              <Table.Cell>{item.tac_lac}</Table.Cell>
              <Table.Cell>{item.cellid}</Table.Cell>
              <Table.Cell>{item.signal_strength} dBm</Table.Cell>
              <Table.Cell>{item.download_rate?.toFixed(2)} Mbps</Table.Cell>
              <Table.Cell>{item.upload_rate?.toFixed(2)} Mbps</Table.Cell>
              <Table.Cell>
                {item.ping ? `${item.ping.toFixed(2)} ms` : 'N/A'}
              </Table.Cell>
              <Table.Cell>{item.pci}</Table.Cell>
              <Table.Cell>
                {item.sms_delivery_time
                  ? `${item.sms_delivery_time} ms`
                  : 'N/A'}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
};

export default DataTable;
