import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./login/AuthContext";
import Navbar from "./components/equal/Navbar";
import Login from "./components/Details/Login";
import Register from "./components/Details/Register";
import Dashboard from "./front/Dashboard";
import Home from "./front/Home";
import ProtectedRoute from "./components/equal/ProtectedRoute";
import FarmerDashboard from "./components/Farmerdetails/FarmerDashboard";
import FarmForm from "./components/Farmerdetails/Form";
import LoanRequest from "./components/Farmerdetails/Requestloan";
import MyLoans from "./components/Farmerdetails/AllLoans";
import RepayLoan from "./components/Farmerdetails/RepayLoan";
import MyFarms from "./components/Farmerdetails/MyFarms";
import DocumentUpload from "./components/Farmerdetails/Upload";
import MyDocuments from "./components/Farmerdetails/Documents";
import LoanRepaySchedule from "./components/Farmerdetails/Repay";
import TransactionsFarmer from "./components/Farmerdetails/Transactions";
import TransactionDetailsFarmer from "./components/Farmerdetails/FarmerDetails";
import InvestorDashboard from "./components/Investordetails/InvestorDashboard";
import ViewFarms from "./components/Investordetails/ViewFarms";
import InvestFarm from "./components/Investordetails/InvestFarm";
import MyInvestments from "./components/Investordetails/MyInvestments";
import AvailableLoans from "./components/Investordetails/AvailableLoans";
import TransactionsInvestor from "./components/Investordetails/Transactions";
import TransactionDetailsInvestor from "./components/Investordetails/TransactionDetails";
import admin from "./components/Admindetails/AdminD";
import ManageUsers from "./components/Admindetails/ManageUsers";
import AllLoans from "./components/Admindetails/AllLoans";
import AllFarms from "./components/Admindetails/Allfarm";
import VerifyUser from "./components/Admindetails/VerifyUser";
import Issues from "./components/Admindetails/Issues";
import ReportIssue from "./components/equal/ReportIssue";
import TransactionAnalytics from "./components/Investordetails/TransactionAnalytics"; // Ensure correct path

import "./styles.css";
import "./App.css";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
               
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="/farmer/dashboard" element={<ProtectedRoute><FarmerDashboard /></ProtectedRoute>} />
                    <Route path="/farmer/farm-form" element={<ProtectedRoute><FarmForm /></ProtectedRoute>} />
                    <Route path="/farmer/my-farms" element={<ProtectedRoute><MyFarms /></ProtectedRoute>} />
                    <Route path="/farmer/request-loan" element={<ProtectedRoute><LoanRequest /></ProtectedRoute>} />
                    <Route path="/farmer/my-loans" element={<ProtectedRoute><MyLoans /></ProtectedRoute>} />
                    <Route path="/farmer/repay-loan" element={<ProtectedRoute><RepayLoan /></ProtectedRoute>} />
                    <Route path="/farmer/upload-document" element={<ProtectedRoute><DocumentUpload /></ProtectedRoute>} />
                    <Route path="/farmer/my-documents" element={<ProtectedRoute><MyDocuments /></ProtectedRoute>} />
                    <Route path="/farmer/:id/repayment-schedule" element={<ProtectedRoute><LoanRepaySchedule /></ProtectedRoute>} />
<Route path="/farmer/transactions" element={<ProtectedRoute><TransactionsFarmer /></ProtectedRoute>} />
<Route path="/farmer/transactions/:id" element={<ProtectedRoute><TransactionDetailsFarmer /></ProtectedRoute>} />
                    <Route path="/farmer/transactions" element={<ProtectedRoute><TransactionsFarmer /></ProtectedRoute>} />
                    <Route path="/farmer/transactions/:id" element={<ProtectedRoute><TransactionDetailsFarmer /></ProtectedRoute>} />
                    <Route path="/investor/dashboard" element={<ProtectedRoute><InvestorDashboard /></ProtectedRoute>} />
                    <Route path="/investor/view-farms" element={<ProtectedRoute><ViewFarms /></ProtectedRoute>} />
                    <Route path="/investor/invest-farm" element={<ProtectedRoute><InvestFarm /></ProtectedRoute>} />
                    <Route path="/investor/my-investments" element={<ProtectedRoute><MyInvestments /></ProtectedRoute>} />
                    <Route path="/investor/available-loans" element={<ProtectedRoute><AvailableLoans /></ProtectedRoute>} />
                    <Route path="/invest/:loanId" element={<ProtectedRoute><InvestFarm /></ProtectedRoute>} />
                    <Route path="/investor/transactions" element={<ProtectedRoute><TransactionsInvestor /></ProtectedRoute>} />
                    <Route path="/investor/transactions/:id" element={<ProtectedRoute><TransactionDetailsInvestor /></ProtectedRoute>} />
                    <Route path="/investor/transactions/analytics" element={<ProtectedRoute><TransactionAnalytics /></ProtectedRoute>} />
                    <Route path="/admin/dashboard" element={<ProtectedRoute><admin /></ProtectedRoute>} />
                    <Route path="/admin/users" element={<ProtectedRoute><ManageUsers /></ProtectedRoute>} />
                    <Route path="/admin/loans" element={<ProtectedRoute><AllLoans /></ProtectedRoute>} />
                    <Route path="/admin/farms" element={<ProtectedRoute><AllFarms /></ProtectedRoute>} />
                    <Route path="/admin/verify-users" element={<ProtectedRoute><VerifyUser /></ProtectedRoute>} />
                    <Route path="/admin/issues" element={<ProtectedRoute><Issues /></ProtectedRoute>} />
                    <Route path="/common/report-issue" element={<ProtectedRoute><ReportIssue /></ProtectedRoute>} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
