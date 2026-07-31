import { Routes, Route } from "react-router-dom";

import Login from "./Login";
import Dashboard from "./Dashboard";
import Customers from "./Customers";
import LoanApplicationForm from "./LoanApplicationForm";
import LoanList from "./LoanList";
import LoanDetails from "./LoanDetails";
import AdminDashboard from "./AdminDashboard";
import EMICalculator from "./EMICalculator";
import LoanStatus from "./LoanStatus";
import DocumentUpload from "./DocumentUpload";
import LoanApproval from "./LoanApproval";
import CustomerDetails from "./CustomerDetails";
import LoanEdit from "./LoanEdit";

import ProtectedRoute from "./ProtectedRoute";
import Layout from "./Layout";


function App(){

    return(

        <Routes>


          

            <Route 
                path="/" 
                element={<Login />} 
            />




            <Route element={<Layout />}>


                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />



                <Route
                    path="/customers"
                    element={
                        <ProtectedRoute>
                            <Customers />
                        </ProtectedRoute>
                    }
                />



                <Route
                    path="/loan-application"
                    element={
                        <ProtectedRoute>
                            <LoanApplicationForm />
                        </ProtectedRoute>
                    }
                />



                <Route
                    path="/loan-list"
                    element={
                        <ProtectedRoute>
                            <LoanList />
                        </ProtectedRoute>
                    }
                />



                <Route
                    path="/loan-details"
                    element={
                        <ProtectedRoute>
                            <LoanDetails />
                        </ProtectedRoute>
                    }
                />



                <Route
                    path="/admin-dashboard"
                    element={
                        <ProtectedRoute role="Admin">
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />



                <Route
                    path="/emi-calculator"
                    element={
                        <ProtectedRoute>
                            <EMICalculator />
                        </ProtectedRoute>
                    }
                />



                <Route
                    path="/loan-status"
                    element={
                        <ProtectedRoute>
                            <LoanStatus />
                        </ProtectedRoute>
                    }
                />



                <Route
                    path="/document-upload"
                    element={
                        <ProtectedRoute>
                            <DocumentUpload />
                        </ProtectedRoute>
                    }
                />



                <Route
                    path="/loan-approval"
                    element={
                        <ProtectedRoute role="Admin">
                            <LoanApproval />
                        </ProtectedRoute>
                    }
                />



                <Route
                    path="/loan/:id"
                    element={
                        <ProtectedRoute>
                            <LoanDetails />
                        </ProtectedRoute>
                    }
                />



                <Route
                    path="/customer-details"
                    element={
                        <ProtectedRoute>
                            <CustomerDetails />
                        </ProtectedRoute>
                    }
                />



                <Route
                    path="/loan-edit/:id"
                    element={
                        <ProtectedRoute>
                            <LoanEdit />
                        </ProtectedRoute>
                    }
                />


            </Route>


        </Routes>

    );

}


export default App;