import { useState } from 'react';
import axios from 'axios';
import DomainInfo from '../components/DomainInfo';
import ContactInfo from '../components/ContactInfo';
import Error from '../components/Error';
import { DomainData, ErrorResponse } from '../interfaces';
import Spinner from '../components/Spinner';

export default function Home() {
  const [domain, setDomain] = useState<string>('');
  const [data, setData] = useState<DomainData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [infoType, setInfoType] = useState('domain');

  const handleLookup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setData(null);
    try {
      setError(null);
      const response = await axios.post<DomainData>(`/api/lookup?`, {domain});
      setData(response.data);
    } catch (err) {
      const errorResponse = (err.response?.data as ErrorResponse) || { error: 'An unexpected error occurred' };
      setError(errorResponse.error);
      setData(null);
    }finally{
        setLoading(false);
    }
  };

  return (
    <div className="main-wrapper">
        <div className="card">
            <h1 className="md:text-3xl font-bold mb-4 text-2xl">Domain Lookup Hello World!</h1>
            <form onSubmit={handleLookup} className="space-y-4 mb-4">
                <label htmlFor="domain" className="block text-gray-700">Domain Name</label>
                <div className='flex items-start md:items-center gap-2 m-0 flex-col md:flex-row'>
                        <input
                        id="domain"
                        type="text"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        placeholder="Enter domain name"
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                        />
                        
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Lookup
                    </button>
                </div>
            </form>
            <div className='flex mb-2 gap-2 flex-col md:flex-row'>
              <label>
                <input
                  type="radio"
                  name="infoType"
                  value="domain"
                  checked={infoType === 'domain'}
                  onChange={() => setInfoType('domain')}
                  className='mr-1'
                />
                Domain Information
              </label>
              <label>
                <input
                  type="radio"
                  name="infoType"
                  value="contact"
                  checked={infoType === 'contact'}
                  onChange={() => setInfoType('contact')}
                  className='mr-1'
                />
                Contact Information
              </label>
            </div>

            {loading && <Spinner />}
            {error && <Error message={error} />}
            {data && infoType === 'domain' && <DomainInfo data={data} />}
            {data && infoType === 'contact' && <ContactInfo data={data} />}
        </div>
    </div>
  );
}
