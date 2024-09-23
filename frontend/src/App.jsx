import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Suspense, lazy, useEffect, useState } from "react";
import Loader from "./components/Loader";
import Transaction from "./Transaction";
import SendMoney from "./SendMOney";

const SignInPage = lazy(()=> import('./components/signin'))
const SignUpPage = lazy(()=> import('./components/signup'))
const Dashboard = lazy(()=> import('./components/dashboard'))
const Money = lazy(()=> import('./components/SendMoney'))

export let isAuth;
export default function App(){


  return<>
  <RecoilRoot>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Redirect />} />
        <Route path="/loader" element={<Loader/>} />
        <Route path="/sign-in" element={<Suspense fallback={<Loader/>}> <SignInPage/> </Suspense>}/>
        <Route path="/sign-up" element={<Suspense fallback={<Loader/>}> <SignUpPage/> </Suspense>}/>
        <Route path="/dashboard" element={<Suspense fallback={<Loader/>}> <Dashboard/> </Suspense>}/>
        <Route path="/user" element={<Suspense fallback={<Loader/>}> <SendMoney/> </Suspense>}/>
        <Route path="/sendMoney" element={<Suspense fallback={<Loader/>}> <Money/> </Suspense>}/>
        <Route path="/transaction" element={<Suspense fallback={<Loader/>}> <Transaction/> </Suspense>}/>
      </Routes>
    </BrowserRouter>
  </RecoilRoot>
  </>
}


function Redirect() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isAuth = localStorage.length > 0;

    const timer = setTimeout(() => {
      setLoading(false);
      isAuth ? navigate('/dashboard') : navigate('/sign-in');
    }, 2000); 

    return () => clearTimeout(timer);
  }, [navigate]);

  return loading ? <Loader /> : null; 
}