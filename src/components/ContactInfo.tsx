import React from 'react';
import { DomainData } from '../interfaces';

interface Props {
  data: DomainData;
}

const ContactInfo: React.FC<Props> = ({ data }) => (
  <div className="dc-table-wrapper">
    <div className="dc-table-header-wrapper">
      <h2 className="dc-table-header">Contact Information</h2>
    </div>
    <div className='overflow-auto'>
    <table className="dc-table">
      <thead className="bg-gray-50">
        <tr>
          <th className="">Registrant Name</th>
          <th>Technical Contact Name</th>
          <th>Administrative Contact Name</th>
          <th>Contact Email</th>
        </tr>
      </thead>
      <tbody >
        <tr>
          <td>{data.registrantName}</td>
          <td>{data.techName}</td>
          <td>{data.adminContactName}</td>
          <td>{data.adminEmail}</td>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
);

export default ContactInfo;
