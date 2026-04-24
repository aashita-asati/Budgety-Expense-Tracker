import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/Layouts/DashboardLayout'
import SideMenu from '../../components/Layouts/SideMenu';
import { userUserAuth } from '../../hooks/useUserAuth';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPaths';
import { IoMdCard } from 'react-icons/io';
import InfoCard from '../../components/Cards/InfoCard';
import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu';
import { addThousandSeparator } from '../../utils/helper';
import RecentTransactions from '../../components/Layouts/Dashboard/RecentTransactions';
import FinanceOverview from '../../components/Layouts/Dashboard/FinanceOverview';
import ExpenseTransactions from '../../components/Layouts/Dashboard/ExpenseTransactions';
import RecentIncomeChart from '../../components/Layouts/Dashboard/RecentIncomeChart';
import RecentIncome from '../../components/Layouts/Dashboard/RecentIncome';
import Last30DaysExpenses from '../../components/Layouts/Dashboard/Last30DaysExpenses';

const Home = () => {
  userUserAuth();

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [ loading, setLoading] = useState(false);

  const fetchDashboardData = async() =>{
    if(loading) return;

    setLoading(true);

    try{
      const response = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`);

      if(response.data) {
        setDashboardData(response.data);
      }
    } catch (error){
      console.error("Something went wrong, please try again later", error)
    } finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    return () => {

    }
  }, []);

  
  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <InfoCard
            icon={<IoMdCard/>}
            label="Total Balance"
            value={addThousandSeparator(dashboardData?.totalBalance || 0)}
            color="bg-primary"
            />

             <InfoCard
            icon={<LuWalletMinimal/>}
            label="Total Income"
            value={addThousandSeparator(dashboardData?.totalIncome || 0)}
            color="bg-orange-500"
            />

             <InfoCard
            icon={<LuHandCoins/>}
            label="Total Expense"
            value={addThousandSeparator(dashboardData?.totalExpense || 0)}
            color="bg-red-500"
            />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 ">
           <RecentTransactions 
          transactions={dashboardData?.recentTransactions}
          onSeeMore={() => navigate("/expense")}
          />
          <FinanceOverview
          totalBalance={dashboardData?. totalBalance || 0}
          totalIncome= {dashboardData?. totalIncome || 0}
          totalExpense={dashboardData?. totalExpense || 0}
          /> 
          
           <ExpenseTransactions
          transactions={dashboardData?. last30DaysExpenses?.transaction || []} 
          onSeeMore={()=> navigate("/expense")}
          />

          <Last30DaysExpenses
          data={dashboardData?.last30DaysExpenses?.transaction || []}
          
          /> 

          <RecentIncomeChart
          data={dashboardData?.last60DaysIncome?.transaction?.slice(0,5) || [] }
          totalIncome={dashboardData?.totalIncome || 0}
          />
          
          
          <RecentIncome
          transactions={dashboardData?.last60DaysIncome?.transaction || []}
          onSeeMore={()=> navigate("/income")} />

        </div>

      </div>
      
    </DashboardLayout>
    
  );
};

export default Home;

