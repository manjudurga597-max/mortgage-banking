import { useState, useEffect, useCallback } from "react";
import api from "./services/api";

function DocumentUpload() {
    const [customerName, setCustomerName] = useState("");
    const [documentName, setDocumentName] = useState("");
    const [file, setFile] = useState(null);
    const [documents, setDocuments] = useState([]);

    const loadDocuments = useCallback(async () => {
        try {
            const response = await api.get("/documents");
            setDocuments(response.data);
        } catch (error) {
            console.error("Fetch Documents Error:", error);
        }
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadDocuments();
    }, [loadDocuments]);

    const uploadDocument = async () => {
        if (!customerName || !documentName || !file) {
            alert("Please fill all fields and select file");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("customerName", customerName);
            formData.append("documentName", documentName);
            formData.append("file", file);

            await api.post("/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            alert("Document Uploaded Successfully");
            loadDocuments();

            setCustomerName("");
            setDocumentName("");
            setFile(null);
        } catch (error) {
            console.error("Upload Error:", error);
            alert(error.message || "Upload Failed");
        }
    };

    const deleteDocument = async (id) => {
        try {
            await api.delete(`/document/${id}`);
            alert("Document Deleted Successfully");
            loadDocuments();
        } catch (error) {
            console.error("Delete Document Error:", error);
            alert(error.message || "Delete Failed");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-blue-700 mb-2">
                    Document Upload
                </h1>

                <p className="text-gray-500 mb-6">
                    Upload and manage customer loan documents
                </p>

                <div className="bg-white shadow-xl rounded-2xl p-6 max-w-xl">
                    <label className="font-semibold text-gray-700">
                        Customer Name
                    </label>

                    <input
                        className="w-full mt-2 mb-4 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        type="text"
                        placeholder="Enter Customer Name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                    />

                    <label className="font-semibold text-gray-700">
                        Document Name
                    </label>

                    <input
                        className="w-full mt-2 mb-4 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        type="text"
                        placeholder="Enter Document Name"
                        value={documentName}
                        onChange={(e) => setDocumentName(e.target.value)}
                    />

                    <label className="font-semibold text-gray-700">
                        Select File
                    </label>

                    <input
                        className="w-full mt-2 mb-6 border p-3 rounded-lg"
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                    />

                    <button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow"
                        onClick={uploadDocument}
                    >
                        Upload Document
                    </button>
                </div>

                <div className="bg-white shadow-xl rounded-2xl p-6 mt-8">
                    <h2 className="text-2xl font-bold text-blue-700 mb-5">
                        Uploaded Documents
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-blue-600 text-white">
                                <tr>
                                    <th className="p-3">Customer</th>
                                    <th className="p-3">Document</th>
                                    <th className="p-3">File Name</th>
                                    <th className="p-3">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {documents.map((doc) => (
                                    <tr
                                        key={doc._id}
                                        className="border-b hover:bg-gray-100 transition"
                                    >
                                        <td className="p-3 font-semibold">
                                            {doc.customerName}
                                        </td>

                                        <td className="p-3">
                                            {doc.documentName}
                                        </td>

                                        <td className="p-3">
                                            {doc.fileName}
                                        </td>

                                        <td className="p-3">
                                            <button
                                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                                                onClick={() => deleteDocument(doc._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DocumentUpload;