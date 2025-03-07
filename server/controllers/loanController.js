import Loan from "../models/Loan.js";
import Transaction from "../models/Transaction.js";
import Farm from "../models/Farm.js";
import mongoose from "mongoose";

function generateRepaymentSchedule(amount, interestRate, duration) {
  const monthlyInterest = interestRate / 12 / 100;
  const monthlyPayment =
    (amount * monthlyInterest * Math.pow(1 + monthlyInterest, duration)) /
    (Math.pow(1 + monthlyInterest, duration) - 1);

  const schedule = [];
  let remainingBalance = amount;

  for (let i = 1; i <= duration; i++) {
    const interest = remainingBalance * monthlyInterest;
    const principal = monthlyPayment - interest;
    remainingBalance -= principal;

    schedule.push({
      dueDate: new Date(Date.now() + i * 30 * 24 * 60 * 60 * 1000),
      amount: monthlyPayment,
      status: "pending",
    });
  }

  return schedule;
}

const loanController = {
 
  async createLoan(req, res) {
    try {
      const { amount, interestRate, duration, farm } = req.body;

      const loan = await Loan.create({
        ...req.body,
        repaymentSchedule: generateRepaymentSchedule(amount, interestRate, duration),
      });

      res.status(201).json(loan);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  
  async repayLoan(req, res) {
    try {
      const { amount } = req.body;
      const { id } = req.params; 
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid Loan ID" });
      }
  
      const loan = await Loan.findById(id);
  
      if (!loan) {
        return res.status(404).json({ message: "Loan not found" });
      }
  
      let newAmountPaid = amount;
      const totalAmount = loan.amount + (loan.amount * loan.interestRate) / 100;
  
      loan.amountPaid += newAmountPaid;
  
      for (let payment of loan.repaymentSchedule) {
        if (payment.status === "pending" && newAmountPaid >= payment.amount) {
          payment.status = "paid";
          newAmountPaid -= payment.amount;
        }
      }
  
      if (loan.amountPaid >= totalAmount) {
        loan.status = "completed";
      }
  
      await loan.save();
  
      const transaction = await Transaction.create({
        loan: loan._id,
        from: req.user.id,
        to: loan.investors.length > 0 ? loan.investors[0].investor : null,
        amount,
        type: "repayment",
        date: new Date(),
      });
  
      res.status(200).json({ message: "Loan repaid successfully", loan, transaction });
    } catch (error) {
      console.error("Repay loan error:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },


 
  async getRepaymentSchedule(req, res) {
    try {
      const loanId = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(loanId)) {
        return res.status(400).json({ message: "Invalid Loan ID" });
      }

      const loan = await Loan.findById(loanId);
      if (!loan) {
        return res.status(404).json({ message: "Loan not found" });
      }
      res.json(loan.repaymentSchedule);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },
  
  
async getMyLoans(req, res) {
  try {
   
    const userFarms = await Farm.find({ farmer: req.user.id }).select('_id');
    
    const farmIds = userFarms.map(farm => farm._id);

    const loans = await Loan.find({ farm: { $in: farmIds } })
      .populate({
        path: 'investors.investor',
        select: 'name email', 
      });

    res.json(loans);
  } catch (error) {
    console.error("Error fetching my loans:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
},
  
  async getMyInvestments(req, res) {
    try {
      const investments = await Loan.find({ "investors.investor": req.user.id });
      res.json(investments);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

 
  async getAvailableLoans(req, res) {
    try {
      const loans = await Loan.find({ status: "pending" }).populate("farm", "name location");
      res.json(loans);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

 
  async investInLoan(req, res) {
    try {
      const { amount } = req.body;
      const loan = await Loan.findById(req.params.id).populate("farm");

      if (!loan) {
        return res.status(404).json({ message: "Loan not found" });
      }

   
      loan.investors.push({
        investor: req.user.id,
        amount,
        date: new Date(),
      });

      await loan.save();

     
      const transaction = await Transaction.create({
        loan: loan._id,
        from: req.user.id,
        to: loan.farm, 
        amount: amount,
        type: "investment",
        date: new Date(),
      });

      res.json({
        message: "Investment successful",
        loan,
        transaction,
      });
    } catch (error) {
      console.error("Invest in loan error:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },
};

export default loanController;
