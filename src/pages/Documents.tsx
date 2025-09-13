import React, { useState } from 'react';
import { SearchIcon, FilterIcon, FileTextIcon, DownloadIcon, EyeIcon } from 'lucide-react';
// Mock data for documents
const documents = [{
  id: 'D001',
  lease_id: 'L001',
  lease_name: 'Mumbai Tech Hub',
  document_type: 'Lease Agreement',
  file_name: 'Mumbai_TechHub_Lease_Agreement.pdf',
  upload_date: '2023-06-01',
  size: '2.4 MB',
  uploaded_by: 'John Doe'
}, {
  id: 'D002',
  lease_id: 'L002',
  lease_name: 'Delhi Co-working Space',
  document_type: 'Floor Plan',
  file_name: 'Delhi_Coworking_FloorPlan.pdf',
  upload_date: '2023-05-15',
  size: '5.1 MB',
  uploaded_by: 'Jane Smith'
}, {
  id: 'D003',
  lease_id: 'L003',
  lease_name: 'Bangalore Campus',
  document_type: 'Lease Agreement',
  file_name: 'Bangalore_Campus_Lease_Agreement.pdf',
  upload_date: '2023-04-01',
  size: '3.2 MB',
  uploaded_by: 'Michael Johnson'
}, {
  id: 'D004',
  lease_id: 'L003',
  lease_name: 'Bangalore Campus',
  document_type: 'Floor Plan',
  file_name: 'Bangalore_Campus_FloorPlan.pdf',
  upload_date: '2023-04-02',
  size: '8.5 MB',
  uploaded_by: 'Michael Johnson'
}, {
  id: 'D005',
  lease_id: 'L004',
  lease_name: 'Singapore Office',
  document_type: 'Lease Agreement',
  file_name: 'Singapore_Office_Lease_Agreement.pdf',
  upload_date: '2023-03-15',
  size: '2.8 MB',
  uploaded_by: 'Sarah Lee'
}];
const Documents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const filteredDocuments = documents.filter(doc => doc.lease_name.toLowerCase().includes(searchTerm.toLowerCase()) || doc.document_type.toLowerCase().includes(searchTerm.toLowerCase()) || doc.file_name.toLowerCase().includes(searchTerm.toLowerCase()));
  const getDocumentTypeIcon = (type: string) => {
    return <FileTextIcon className="h-5 w-5" />;
  };
  return <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
        <button onClick={() => setShowUploadModal(true)} className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-transform duration-200 hover:scale-105">
          Upload Document
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input type="text" placeholder="Search documents..." className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50" onClick={() => setShowFilters(!showFilters)}>
              <FilterIcon className="h-5 w-5 mr-2 text-gray-500" />
              Filters
            </button>
          </div>
          {showFilters && <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
              <select className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option value="">All Document Types</option>
                <option value="Lease Agreement">Lease Agreement</option>
                <option value="Floor Plan">Floor Plan</option>
                <option value="Invoice">Invoice</option>
                <option value="Other">Other</option>
              </select>
              <select className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option value="">All Leases</option>
                {[...new Set(documents.map(doc => doc.lease_name))].map(lease => <option key={lease} value={lease}>
                      {lease}
                    </option>)}
              </select>
              <select className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option value="">Sort By</option>
                <option value="upload_date">Upload Date</option>
                <option value="file_name">File Name</option>
                <option value="size">Size</option>
              </select>
            </div>}
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Document
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lease
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Upload Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Uploaded By
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDocuments.map(doc => <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="p-1 rounded-md bg-blue-100 text-blue-800">
                        {getDocumentTypeIcon(doc.document_type)}
                      </div>
                      <span className="ml-2 text-sm text-gray-900">
                        {doc.file_name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {doc.lease_name}
                    </div>
                    <div className="text-xs text-gray-500">{doc.lease_id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {doc.document_type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(doc.upload_date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {doc.size}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {doc.uploaded_by}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-1 rounded-md hover:bg-gray-100">
                        <EyeIcon className="h-5 w-5 text-gray-600" />
                      </button>
                      <button className="p-1 rounded-md hover:bg-gray-100">
                        <DownloadIcon className="h-5 w-5 text-gray-600" />
                      </button>
                    </div>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 sm:px-6 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing{' '}
            <span className="font-medium">{filteredDocuments.length}</span>{' '}
            documents
          </div>
          <div className="flex-1 flex justify-end">
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Previous
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                1
              </button>
              <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
      {/* Upload Document Modal */}
      {showUploadModal && <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Upload Document
                    </h3>
                    <div className="mt-4">
                      <form>
                        <div className="mb-4">
                          <label htmlFor="lease_id" className="block text-sm font-medium text-gray-700 mb-1">
                            Select Lease
                          </label>
                          <select id="lease_id" name="lease_id" className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" required>
                            <option value="">Select a lease</option>
                            {[...new Set(documents.map(doc => doc.lease_name))].map(lease => <option key={lease} value={lease}>
                                {lease}
                              </option>)}
                          </select>
                        </div>
                        <div className="mb-4">
                          <label htmlFor="document_type" className="block text-sm font-medium text-gray-700 mb-1">
                            Document Type
                          </label>
                          <select id="document_type" name="document_type" className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" required>
                            <option value="">Select document type</option>
                            <option value="Lease Agreement">
                              Lease Agreement
                            </option>
                            <option value="Floor Plan">Floor Plan</option>
                            <option value="Invoice">Invoice</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div className="mb-4">
                          <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">
                            File
                          </label>
                          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                              <div className="flex text-sm text-gray-600">
                                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                                  <span>Upload a file</span>
                                  <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                              </div>
                              <p className="text-xs text-gray-500">
                                PDF, DOC, DOCX, XLS, XLSX up to 10MB
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="mb-4">
                          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                            Notes (Optional)
                          </label>
                          <textarea id="notes" name="notes" rows={3} className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Enter any notes about this document..."></textarea>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                  Upload
                </button>
                <button type="button" onClick={() => setShowUploadModal(false)} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>}
    </div>;
};
export default Documents;