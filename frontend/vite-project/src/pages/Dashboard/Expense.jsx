import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/Layouts/DashboardLayout'
import ExpenseOverview from '../../components/expense/ExpenseOverview';
import AddExpenseForm from '../../components/expense/AddExpenseForm';
import Modal from '../../components/Modal';
import ExpenseList from '../../components/expense/ExpenseList';
import toast from 'react-hot-toast';
import DeleteAlert from '../../components/DeleteAlert';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPaths';

const Expense = () => {
   const [expenseData, setExpenseData] =useState([]);
    const [loading, setLoading] = useState(false)
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
      show: false,
      data: null,
    });
     const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false)

     //get expense details
  const fetchExpenseDetails = async ()=>{
    if (loading) return;
     setLoading(true); 
    try{
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSES.GET_ALL_EXPENSES}`
      );
      if(response.data){
        setExpenseData(response.data)
      };
    } catch(error){
      console.error("something went wrong, try again later", error)
    } finally{
      setLoading(false);
    }
  };

  //handle add expense 
  const handleAddExpense = async(expense) =>{
    const {category, amount, date, icon} = expense;

    //validation

    if(!category.trim()){
      toast.error("category is required.");
      return;
    }
    if(!amount || isNaN(amount) || Number(amount)<=0){
      toast.error("Amount should be a valid number");
      return;
    }
    if(!date){
      toast.error("Date is required.");
      return;
    }
    try{
      await axiosInstance.post(API_PATHS.EXPENSES.ADD_EXPENSES, {
        category,
        amount,
        date,
        icon,
      });

      setOpenAddExpenseModal(false)
      toast.success("Expense Added")
      fetchExpenseDetails();
    }catch(error){
      console.error("Something went wrong please try again later", error)
    }
  };

   //Delete expense
  const deleteExpense = async (id) => {
    try{
      await axiosInstance.delete(API_PATHS.EXPENSES.DELETE_EXPENSE(id))
      setOpenDeleteAlert({show:false, data:null });
      toast.success("Expense Deleted");
      fetchExpenseDetails();
    }catch(error){
      console.error(
        "Error deleting expense",
        error.response?.data?.message || error.message 
      )
    }
  };

   //handle download expense details 
  const handleDownloadExpense=async() => {
     try{
      const response = await axiosInstance.get(
        API_PATHS.EXPENSES.DOWNLOAD_EXPENSE,{
          responseType:" blob",
        }
      );
      //create url for blob
      const url =window.URL.createObjectURL(new Blob ([response.data]))
      const link = document.createElement("a")
      link.href = url;
      link.setAttribute("download", "expense_details.xlsx")
      document.body.appendChild(link);
      link.click()
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url);
    } catch(error) {
      console.error("Error downloading the expense", error)
      toast.error("failed to download")
    }

  };

  useEffect(() => {
    fetchExpenseDetails()
    return()=>{

    }
  },[])

   
  return (
   <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <ExpenseOverview
              transactions={expenseData}
              onExpenseIncome={() =>setOpenAddExpenseModal(true)}
              />
          </div>
           <ExpenseList
              transactions={expenseData}
              onDelete={(id) =>{
                setOpenDeleteAlert({show: true, data: id});
              }}
              onDownload={handleDownloadExpense}
              />
        </div>
        <Modal 
        isOpen={openAddExpenseModal}
        onClose={()=> setOpenAddExpenseModal(false)}
        title="Add Expense">

          <AddExpenseForm onAddExpense={handleAddExpense} />
          <div className="">Add Expense Form</div>
        </Modal>

        <Modal
        isOpen={openDeleteAlert.show}
        onClose={()=> setOpenDeleteAlert({show : false, data: null})}
        title="Delete Expense"
        >
          <DeleteAlert
          content="Are you sure you want to delete?"
          onDelete={()=> deleteExpense(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Expense
