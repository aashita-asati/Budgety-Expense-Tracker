import React, { useEffect, useState } from 'react'
import IncomeOverview from '../../components/income/IncomeOverview'
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPaths';
import Modal from '../../components/Modal';
import DashboardLayout from '../../components/Layouts/DashboardLayout';
import AddIncomeForm from '../../components/income/AddIncomeForm';
import toast from 'react-hot-toast';
import IncomeList from '../../components/income/IncomeList';
import DeleteAlert from '../../components/DeleteAlert';
import { userUserAuth } from '../../hooks/useUserAuth';

const Income = () => {
  userUserAuth();
  

  const [incomeData, setIncomeData] =useState([]);
  const [loading, setLoading] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false)

  //get income details
  const fetchIncomeDetails = async ()=>{
    if (loading) return;

    setLoading(true);
    try{
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      );
      if(response.data){
        setIncomeData(response.data)
      };
    } catch(error){
      console.error("something went wrong, try again later", error)
    } finally{
      setLoading(false);
    }
  };

  //handle add income 
  const handleAddIncome = async(income) =>{
    const {source, amount, date, icon} = income;

    //validation

    if(!source.trim()){
      toast.error("Source is required.");
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
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon,
      });

      setOpenAddIncomeModal(false)
      toast.success("Income Added")
      fetchIncomeDetails();
    }catch(error){
      console.error("Something went wrong please try again later", error)
    }
  };

  //Delete incoome
  const deleteIncome = async (id) => {
    try{
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id))
      setOpenDeleteAlert({show:false, data:null });
      toast.success("Income Deleted");
      fetchIncomeDetails();
    }catch(error){
      console.error(
        "Error deleting income",
        error.response?.data?.message || error.message 
      )
    }
  };
  
  //handle download income details 
  const handleDownloadIncome=async() => {
    try{
      const response = await axiosInstance.get(
        API_PATHS.INCOME.DOWNLOAD_INCOME,{
          responseType:"blob",
        }
      );
      //create url for blob
      const url =window.URL.createObjectURL(new Blob ([response.data]))
      const link = document.createElement("a")
      link.href = url;
      link.setAttribute("download", "income_details.xlsx")
      document.body.appendChild(link);
      link.click()
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url);
    } catch(error) {
      console.error("Error downloading the income", error)
      toast.error("failed to download")
    }
  };

  useEffect (() =>{
    fetchIncomeDetails();

    return () => {};
  },[])
  return (
   <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className='grid grid-cols-1 gap-6'>
          <div className="">
            <IncomeOverview
            transactions ={incomeData}
            onAddIncome={()=> setOpenAddIncomeModal(true)}
            />
          </div>

            <IncomeList
              transactions={incomeData}
              onDelete={(id) =>{
                setOpenDeleteAlert({show: true, data: id});
              }}
              onDownload={handleDownloadIncome}
              />
        </div>
      
        <Modal 
        isOpen={openAddIncomeModal}
        onClose={()=> setOpenAddIncomeModal(false)}
        title="Add Income"
        >

        <AddIncomeForm onAddIncome={handleAddIncome} />
        
        </Modal>
       

        <Modal
        isOpen={openDeleteAlert.show}
        onClose={()=> setOpenDeleteAlert({show : false, data: null})}
        title="Delete Income"
        >
          <DeleteAlert 
          content="Are you sure you want to delete?"
          onDelete={()=> deleteIncome(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Income
