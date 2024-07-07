import React from 'react';
import { DomainData } from '../interfaces';
import { format } from 'date-fns';

interface Props {
  data: DomainData;
}

const DomainInfo: React.FC<Props> = ({ data }) => {
  const truncatedHostNames = data.hostNames.join(', ').length > 25 ? `${data.hostNames.join(', ').slice(0, 25)}...` : data.hostNames.join(', ');
  const creationDate =  data.creationDate
  ? format(new Date(data.creationDate), 'MMM d, yyyy') // Format as 'Jul 8, 2024'
  : data.creationDate;
  const expirationDate =  data.expirationDate
  ? format(new Date(data.expirationDate), 'MMM d, yyyy') // Format as 'Jul 8, 2024'
  : data.expirationDate;
  return (
  <div className="dc-table-wrapper">
    <div className="dc-table-header-wrapper">
      <h2 className="dc-table-header">Domain Information</h2>
    </div>
    <div className='overflow-auto'>
      <table className="dc-table">
        <thead className="bg-gray-50">
          <tr>
            <th>Domain</th>
            <th>Registrar</th>
            <th>Creation Date</th>
            <th>Expiration Date</th>
            <th>Estimated Domain Age</th>
            <th>Host Names</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td>{data.domain}</td>
            <td>{data.registrar}</td>
            <td>{creationDate}</td>
            <td>{expirationDate}</td>
            <td>{data.estimatedDomainAge} days</td>
            <td>{truncatedHostNames}</td>
          </tr>
        </tbody>
      </table>
      </div>
  </div>
)};

export default DomainInfo;
