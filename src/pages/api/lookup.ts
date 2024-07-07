import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { DomainData, ErrorResponse } from '../../interfaces';

const WHOIS_API_URL = 'https://www.whoisxmlapi.com/whoisserver/WhoisService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DomainData | ErrorResponse>
) {
  const { domain } = req.body;
    console.log(domain);
  if (!domain) {
    return res.status(400).json({ error: 'Domain is required' });
  }

  try {
    const response = await axios.post(WHOIS_API_URL, null, {
      params: {
        apiKey: process.env.NEXT_PUBLIC_API_KEY,  // Use the environment variable here
        domainName: domain,
        outputFormat: 'JSON',
      },
    });
    const domainData: DomainData = {
      domain: response.data.WhoisRecord.domainName,
      registrar: response.data.WhoisRecord.registrarName,
      creationDate: response.data.WhoisRecord.createdDate,
      expirationDate: response.data.WhoisRecord.expiresDate,
      registrantName: response.data.WhoisRecord.registrant.name,
      adminEmail: response.data.WhoisRecord.administrativeContact.email,
      techName: response.data.WhoisRecord.technicalContact.name,
      adminContactName: response.data.WhoisRecord.administrativeContact.name,
      estimatedDomainAge: response.data.WhoisRecord.estimatedDomainAge,
      hostNames: response.data.WhoisRecord.nameServers.hostNames
    };
    res.status(200).json(domainData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch domain information' });
  }
}
